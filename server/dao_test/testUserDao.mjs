import { getUser, createUser } from '../dao/userDao.mjs';
import crypto from 'crypto';

// Test the getUser function
async function testGetUser() {
  try {
    const username = 'testuser2';
    const password = 'testpassword';
    const user = await getUser(username, password);
    console.log('getUser success:', user);
  } catch (error) {
    console.error('getUser error:', error);
  }
}

// Test the createUser function
async function testCreateUser() {
  try {
    const email = 'testuser2@example.com';
    const password = 'testpassword';
    const username = 'testuser2';

    const userId = await createUser(email, password, username);
    console.log('createUser success, user ID:', userId);
  } catch (error) {
    console.error('createUser error:', error);
  }
}

// Run the tests
(async () => {
  console.log('Testing createUser...');
  await testCreateUser();

  console.log('Testing getUser...');
  await testGetUser();
})();
