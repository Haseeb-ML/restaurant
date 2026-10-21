const FIRESTORE_API_KEY = 'AIzaSyClV6nJvgoFdS6il18CJj3wWuysPdehRww';
const FIRESTORE_BASE = 'https://firestore.googleapis.com/v1/projects/dastarkhwanerp/databases/(default)/documents';

function toFirestoreFields(obj) {
  const fields = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined) continue;
    if (typeof v === 'string') fields[k] = { stringValue: v };
    else if (typeof v === 'number')
      fields[k] = Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
    else if (typeof v === 'boolean') fields[k] = { booleanValue: v };
    else fields[k] = { stringValue: JSON.stringify(v) };
  }
  return fields;
}

const staffAccounts = [
  {
    id: 1,
    docId: 'user_owner',
    username: 'owner',
    name: 'Ali Khan (Owner)',
    role: 'Owner',
    password: 'owner',
    pin: '123456',
    active: 1,
    notes: 'Administrator / Owner with full permissions',
    updated: new Date().toISOString()
  },
  {
    id: 2,
    docId: 'user_cashier',
    username: 'cashier',
    name: 'Hamza (Cashier)',
    role: 'Cashier',
    password: '123456',
    pin: '123456',
    active: 1,
    notes: 'Cashier with New Order, Orders, Tables & Customers permissions',
    updated: new Date().toISOString()
  },
  {
    id: 3,
    docId: 'user_kitchen',
    username: 'kitchen',
    name: 'Ustad Rasheed (Kitchen)',
    role: 'Kitchen',
    password: '123456',
    pin: '123456',
    active: 1,
    notes: 'Kitchen staff with Orders & Kitchen display permissions',
    updated: new Date().toISOString()
  }
];

async function syncUsersToFirestore() {
  console.log('Syncing all users and passwords to Firebase Cloud Firestore collections [users] and [staff]...');

  for (const user of staffAccounts) {
    const payload = { fields: toFirestoreFields(user) };

    // 1. Sync to `users` collection
    const usersUrl = `${FIRESTORE_BASE}/users/${user.docId}?key=${FIRESTORE_API_KEY}`;
    const userRes = await fetch(usersUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log(`[users/${user.docId}] Status:`, userRes.status, userRes.statusText);

    // 2. Also sync to `staff` collection
    const staffUrl = `${FIRESTORE_BASE}/staff/${user.docId}?key=${FIRESTORE_API_KEY}`;
    const staffRes = await fetch(staffUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log(`[staff/${user.docId}] Status:`, staffRes.status, staffRes.statusText);
  }

  console.log('All login credentials and passwords successfully published to Firebase!');
}

syncUsersToFirestore().catch(console.error);
