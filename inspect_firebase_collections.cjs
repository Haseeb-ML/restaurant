const FIRESTORE_API_KEY = 'AIzaSyClV6nJvgoFdS6il18CJj3wWuysPdehRww';
const FIRESTORE_BASE = 'https://firestore.googleapis.com/v1/projects/dastarkhwanerp/databases/(default)/documents';

async function checkCollections() {
  for (const col of ['orders', 'menu', 'customers', 'suppliers', 'expenses', 'users', 'staff', 'restaurant']) {
    try {
      const colUrl = `${FIRESTORE_BASE}/${col}?key=${FIRESTORE_API_KEY}&pageSize=5`;
      const colRes = await fetch(colUrl);
      if (colRes.ok) {
        const colData = await colRes.json();
        console.log(`Collection [${col}]: ${colData.documents ? colData.documents.length : 0} documents found`);
        if (colData.documents && colData.documents.length > 0) {
          console.log(`  Sample:`, colData.documents[0].name.split('/').pop());
        }
      } else {
        console.log(`Collection [${col}]: HTTP ${colRes.status}`);
      }
    } catch (e) {
      console.log(`Collection [${col}] error:`, e.message);
    }
  }
}

checkCollections().catch(console.error);
