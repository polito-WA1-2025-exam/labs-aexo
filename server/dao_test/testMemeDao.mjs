import { getRandomMeme, getAllMemes } from '../dao/memeDao.mjs';

// Test the getRandomMeme function without excludeIds
async function testGetRandomMemeNoParams() {
  try {
    console.log('Testing getRandomMeme with no excludeIds...');
    const meme = await getRandomMeme();
    console.log('Random Meme:', meme);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Test the getRandomMeme function with excludeIds
async function testGetRandomMemeWithParams() {
  try {
    console.log('Testing getRandomMeme with excludeIds [1, 2, 3]...');
    const meme = await getRandomMeme([1, 2, 3]);
    console.log('Random Meme:', meme);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Test the getAllMemes function
async function testGetAllMemes() {
  try {
    console.log('Testing getAllMemes...');
    const memes = await getAllMemes();
    console.log('All Memes:', memes);
  } catch (error) {
    console.error('Error:', error);
  }
}



// Run the tests
(async () => {
  await testGetRandomMemeNoParams();
  await testGetRandomMemeWithParams();
  await testGetAllMemes();
})();
