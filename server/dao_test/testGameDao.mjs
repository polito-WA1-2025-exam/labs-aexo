import { createGame, completeGame, getGamesForUser } from '../dao/gameDao.mjs';

// Test the createGame function
async function testCreateGame() {
  try {
    console.log('Testing createGame with userId = 1...');
    const gameId = await createGame(1);
    console.log('Game created with ID:', gameId);
  } catch (error) {
    console.error('Error in createGame:', error);
  }
}

// Test the completeGame function
async function testCompleteGame() {
  try {
    console.log('Testing completeGame with gameId = 1 and totalScore = 100...');
    const changes = await completeGame(1, 100);
    console.log('Game completed, rows updated:', changes);
  } catch (error) {
    console.error('Error in completeGame:', error);
  }
}

// Test the getGamesForUser function
async function testGetGamesForUser() {
  try {
    console.log('Testing getGamesForUser with userId = 1...');
    const games = await getGamesForUser(1);
    console.log('Games for User:', games);
  } catch (error) {
    console.error('Error in getGamesForUser:', error);
  }
}

// Run the tests
(async () => {
  await testCreateGame();
  await testCompleteGame();
  await testGetGamesForUser();
})();
