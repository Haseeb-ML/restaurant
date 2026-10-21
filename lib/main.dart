import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Color(0xFF164B3B),
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: Color(0xFF0F1E19),
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );
  runApp(const DastarkhwanPosApp());
}

class DastarkhwanPosApp extends StatelessWidget {
  const DastarkhwanPosApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Shah Brothers POS',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFF0F1E19),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF164B3B),
          brightness: Brightness.dark,
        ),
      ),
      home: const PosHomeScreen(),
    );
  }
}

class PosHomeScreen extends StatefulWidget {
  const PosHomeScreen({super.key});

  @override
  State<PosHomeScreen> createState() => _PosHomeScreenState();
}

class _PosHomeScreenState extends State<PosHomeScreen> {
  HttpServer? _localServer;
  int _port = 8085;
  WebViewController? _controller;
  bool _isLoading = true;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _startLocalServerAndLoad();
  }

  @override
  void dispose() {
    _localServer?.close(force: true);
    super.dispose();
  }

  Future<void> _startLocalServerAndLoad() async {
    try {
      // 1. Bind to loopback IPv4
      for (int p in [8085, 8086, 8087, 8088, 8089, 0]) {
        try {
          _localServer = await HttpServer.bind(InternetAddress.loopbackIPv4, p);
          _port = _localServer!.port;
          break;
        } catch (_) {}
      }

      if (_localServer == null) {
        throw Exception("Could not bind local embedded HTTP server");
      }

      // 2. Listen to HTTP requests and serve local Flutter assets
      _localServer!.listen((HttpRequest request) async {
        try {
          String path = request.uri.path;
          if (path.isEmpty || path == '/') {
            path = '/index.html';
          }

          // Strip query parameters
          String assetPath = 'assets/dist$path';

          ByteData data;
          try {
            data = await rootBundle.load(assetPath);
          } catch (_) {
            // SPA fallback: return index.html for client-side routing
            data = await rootBundle.load('assets/dist/index.html');
            path = '/index.html';
          }

          final Uint8List bytes = data.buffer.asUint8List();

          // Set Content-Type
          final ContentType contentType = _getContentType(path);
          request.response.headers.contentType = contentType;
          request.response.headers.add('Access-Control-Allow-Origin', '*');
          request.response.headers.add('Cache-Control', 'no-cache');
          request.response.statusCode = HttpStatus.ok;
          request.response.add(bytes);
          await request.response.close();
        } catch (e) {
          request.response.statusCode = HttpStatus.notFound;
          await request.response.close();
        }
      });

      // 3. Initialize WebViewController
      final controller = WebViewController()
        ..setJavaScriptMode(JavaScriptMode.unrestricted)
        ..setBackgroundColor(const Color(0xFF0F1E19))
        ..setNavigationDelegate(
          NavigationDelegate(
            onPageStarted: (String url) {
              setState(() => _isLoading = true);
            },
            onPageFinished: (String url) {
              setState(() => _isLoading = false);
            },
            onWebResourceError: (WebResourceError error) {
              if (error.errorCode != -1) { // Ignore minor sub-resource aborts
                debugPrint('WebView Error: ${error.description}');
              }
            },
            onNavigationRequest: (NavigationRequest request) async {
              final url = request.url;
              if (url.startsWith('whatsapp:') ||
                  url.startsWith('tel:') ||
                  url.startsWith('mailto:') ||
                  url.contains('api.whatsapp.com') ||
                  url.contains('wa.me')) {
                try {
                  final uri = Uri.parse(url);
                  await launchUrl(uri, mode: LaunchMode.externalApplication);
                } catch (e) {
                  debugPrint('Error launching url: $e');
                }
                return NavigationDecision.prevent;
              }
              return NavigationDecision.navigate;
            },
          ),
        )
        ..addJavaScriptChannel(
          'FlutterApp',
          onMessageReceived: (JavaScriptMessage msg) async {
            try {
              final Map<String, dynamic> data = jsonDecode(msg.message);
              final action = data['action']?.toString() ?? '';
              final rawText = data['text']?.toString() ?? '';
              if (action == 'pdf') {
                await _handlePdf(
                  data['fileName']?.toString() ?? 'invoice.pdf',
                  data['base64']?.toString() ?? '',
                  rawText,
                );
                return;
              }
              await _handleShareOrWhatsApp(action, rawText);
            } catch (e) {
              debugPrint('FlutterApp Channel Error: $e');
            }
          },
        );

      final initialUrl = 'http://127.0.0.1:$_port/';
      await controller.loadRequest(Uri.parse(initialUrl));

      setState(() {
        _controller = controller;
      });
    } catch (e) {
      setState(() {
        _errorMessage = e.toString();
        _isLoading = false;
      });
    }
  }

  ContentType _getContentType(String path) {
    final lower = path.toLowerCase();
    if (lower.endsWith('.html')) return ContentType.html;
    if (lower.endsWith('.js') || lower.endsWith('.mjs')) {
      return ContentType('application', 'javascript', charset: 'utf-8');
    }
    if (lower.endsWith('.css')) {
      return ContentType('text', 'css', charset: 'utf-8');
    }
    if (lower.endsWith('.svg')) return ContentType('image', 'svg+xml');
    if (lower.endsWith('.png')) return ContentType('image', 'png');
    if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return ContentType('image', 'jpeg');
    if (lower.endsWith('.webp')) return ContentType('image', 'webp');
    if (lower.endsWith('.ico')) return ContentType('image', 'x-icon');
    if (lower.endsWith('.woff2')) return ContentType('font', 'woff2');
    if (lower.endsWith('.woff')) return ContentType('font', 'woff');
    if (lower.endsWith('.ttf')) return ContentType('font', 'ttf');
    if (lower.endsWith('.json')) return ContentType.json;
    return ContentType.binary;
  }

  Future<void> _handlePdf(String fileName, String base64Data, String text) async {
    if (base64Data.isEmpty) return;
    try {
      final safeName = fileName.replaceAll(RegExp(r'[^\w\-. ]'), '_');
      final file = File('${Directory.systemTemp.path}/$safeName');
      await file.writeAsBytes(base64Decode(base64Data), flush: true);
      await SharePlus.instance.share(
        ShareParams(
          files: [XFile(file.path, mimeType: 'application/pdf')],
          subject: safeName,
          text: text.isEmpty ? null : text,
        ),
      );
    } catch (e) {
      debugPrint('PDF share error: $e');
    }
  }

  Future<void> _handleShareOrWhatsApp(String action, String rawText) async {
    if (rawText.trim().isEmpty) return;

    if (action == 'whatsapp') {
      // 1. Direct whatsapp:// URI
      try {
        final waUri = Uri(
          scheme: 'whatsapp',
          host: 'send',
          queryParameters: {'text': rawText},
        );
        final success = await launchUrl(waUri, mode: LaunchMode.externalApplication);
        if (success) return;
      } catch (e) {
        debugPrint('whatsapp:// scheme launch error: $e');
      }

      // 2. Direct wa.me link
      try {
        final waMeUri = Uri.https('wa.me', '', {'text': rawText});
        final success = await launchUrl(waMeUri, mode: LaunchMode.externalApplication);
        if (success) return;
      } catch (e) {
        debugPrint('wa.me launch error: $e');
      }

      // 3. Fallback: Android native share sheet (displays WhatsApp, WhatsApp Business, etc.)
      try {
        await SharePlus.instance.share(ShareParams(text: rawText, subject: 'Dastarkhwan Report'));
        return;
      } catch (e) {
        debugPrint('Native share fallback error: $e');
      }

      // 4. Fallback: web API
      try {
        final apiWaUri = Uri.https('api.whatsapp.com', '/send', {'text': rawText});
        await launchUrl(apiWaUri, mode: LaunchMode.externalApplication);
      } catch (e) {
        debugPrint('api.whatsapp.com fallback error: $e');
      }
    } else {
      // Native Share Sheet
      try {
        await SharePlus.instance.share(ShareParams(text: rawText, subject: 'Dastarkhwan Report'));
      } catch (_) {
        final waUri = Uri(
          scheme: 'whatsapp',
          host: 'send',
          queryParameters: {'text': rawText},
        );
        await launchUrl(waUri, mode: LaunchMode.externalApplication);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;
        if (_controller != null && await _controller!.canGoBack()) {
          await _controller!.goBack();
          return;
        }

        if (!context.mounted) return;
        final shouldExit = await showDialog<bool>(
          context: context,
          builder: (ctx) => AlertDialog(
            backgroundColor: const Color(0xFF162520),
            title: const Text(
              'ایپ بند کریں؟ (Exit App?)',
              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
              textDirection: TextDirection.rtl,
            ),
            content: const Text(
              'کیا آپ واقعی دسترخوان POS ایپ بند کرنا چاہتے ہیں؟',
              style: TextStyle(color: Color(0xFFCBD5E1)),
              textDirection: TextDirection.rtl,
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(ctx).pop(false),
                child: const Text('نہیں (Cancel)', style: TextStyle(color: Color(0xFF94A3B8))),
              ),
              FilledButton(
                style: FilledButton.styleFrom(backgroundColor: const Color(0xFFC0392B)),
                onPressed: () => Navigator.of(ctx).pop(true),
                child: const Text('ہاں بند کریں (Exit)'),
              ),
            ],
          ),
        );

        if (shouldExit == true) {
          SystemNavigator.pop();
        }
      },
      child: Scaffold(
        body: SafeArea(
          child: Stack(
            children: [
              if (_controller != null)
                WebViewWidget(controller: _controller!),

              if (_errorMessage != null)
                Center(
                  child: Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.error_outline, size: 64, color: Color(0xFFE74C3C)),
                        const SizedBox(height: 16),
                        Text(
                          'خرابی: $_errorMessage',
                          style: const TextStyle(color: Colors.white, fontSize: 16),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 16),
                        FilledButton.icon(
                          onPressed: _startLocalServerAndLoad,
                          icon: const Icon(Icons.refresh),
                          label: const Text('دوبارہ کوشش کریں (Retry)'),
                        ),
                      ],
                    ),
                  ),
                ),

              // Loading Splash Screen
              if (_isLoading)
                Container(
                  color: const Color(0xFF0F1E19),
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 120,
                          height: 120,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(24),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.4),
                                blurRadius: 24,
                                spreadRadius: 4,
                                offset: const Offset(0, 8),
                              ),
                            ],
                          ),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(24),
                            child: Image.asset(
                              'assets/dist/media/restaurant-logo.jpg',
                              width: 120,
                              height: 120,
                              fit: BoxFit.contain,
                              errorBuilder: (context, error, stackTrace) => const Center(
                                child: Icon(Icons.restaurant, size: 54, color: Color(0xFF164B3B)),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 22),
                        const Text(
                          'Shah Brothers Restaurant',
                          style: TextStyle(
                            color: Color(0xFFF1F5F9),
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.5,
                          ),
                        ),
                        const SizedBox(height: 6),
                        const Text(
                          'شاہ برادرز ریسٹورانٹ · POS & ERP',
                          style: TextStyle(
                            color: Color(0xFFD56A2D),
                            fontSize: 14,
                            letterSpacing: 1.0,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 28),
                        const SizedBox(
                          width: 32,
                          height: 32,
                          child: CircularProgressIndicator(
                            strokeWidth: 3,
                            valueColor: AlwaysStoppedAnimation<Color>(Color(0xFFD56A2D)),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
