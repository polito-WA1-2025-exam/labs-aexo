import { addRound, getRoundsForGame } from '../dao/roundDao.mjs';

// Test the addRound function
async function testAddRound() {
  try {
    console.log('Testing addRound with gameId = 1, roundNumber = 1, memeId = 2, selectedCaptionId = 3, pointsAwarded = 10...');
    const roundId = await addRound(1, 3, 1, 3, 10);
    console.log('Round added with ID:', roundId);
  } catch (error) {
    console.error('Error in addRound:', error);
  }
}

// Test the getRoundsForGame function
async function testGetRoundsForGame() {
  try {
    console.log('Testing getRoundsForGame with gameId = 1...');
    const rounds = await getRoundsForGame(1);
    console.log('Rounds for Game:', rounds);
  } catch (error) {
    console.error('Error in getRoundsForGame:', error);
  }
}

// Run the tests
(async () => {
  await testAddRound();
  await testGetRoundsForGame();
})();
