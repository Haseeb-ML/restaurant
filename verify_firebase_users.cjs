const FIRESTORE_API_KEY = 'AIzaSyClV6nJvgoFdS6il18CJj3wWuysPdehRww';
const FIRESTORE_BASE = 'https://firestore.googleapis.com/v1/projects/dastarkhwanerp/databases/(default)/documents';

async function verify() {
  const usersRes = await fetch(`${FIRESTORE_BASE}/users?key=${FIRESTORE_API_KEY}`);
  const data = await usersRes.json();
  console.log('Firebase [users] collection documents:');
  (data.documents || []).forEach(d => {
    const f = d.fields;
    console.log(` - Document: ${d.name.split('/').pop()} | Name: ${f.name?.stringValue} | Role: ${f.role?.stringValue} | Username: ${f.username?.stringValue} | Password: ${f.password?.stringValue}`);
  });
}
verify().catch(console.error);
