import { getCaptionsForMeme, getDistractorCaptions } from '../dao/captionDao.mjs';

// Test the getCaptionsForMeme function
async function testGetCaptionsForMeme() {
  try {
    console.log('Testing getCaptionsForMeme with memeId = 1...');
    const captions = await getCaptionsForMeme(1);
    console.log('Captions for Meme:', captions);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Test the getDistractorCaptions function
async function testGetDistractorCaptions() {
  try {
    console.log('Testing getDistractorCaptions with memeId = 1 and limit = 4...');
    const distractorCaptions = await getDistractorCaptions(1, 4);
    console.log('Distractor Captions:', distractorCaptions);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the tests
(async () => {
  await testGetCaptionsForMeme();
  await testGetDistractorCaptions();
})();
