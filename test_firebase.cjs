const FIRESTORE_API_KEY = 'AIzaSyClV6nJvgoFdS6il18CJj3wWuysPdehRww';
const FIRESTORE_BASE = 'https://firestore.googleapis.com/v1/projects/dastarkhwanerp/databases/(default)/documents';

async function testFirestore() {
  const url = `${FIRESTORE_BASE}/restaurant/state?key=${FIRESTORE_API_KEY}`;
  const res = await fetch(url);
  console.log('Firestore HTTP status:', res.status, res.statusText);
  if (res.ok) {
    const json = await res.json();
    console.log('Last updated time in Firebase:', json.fields?.updated?.stringValue);
    console.log('Total Orders in Firebase:', json.fields?.orderCount?.integerValue);
    console.log('Total Menu dishes in Firebase:', json.fields?.menuCount?.integerValue);
    console.log('Total Customers in Firebase:', json.fields?.customerCount?.integerValue);
  } else {
    const errText = await res.text();
    console.error('Firestore Error:', errText);
  }
}
testFirestore().catch(console.error);
