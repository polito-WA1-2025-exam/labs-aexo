import { addMemeCaptionAssociation } from '../dao/memeCaptionDao.mjs';

// Test the addMemeCaptionAssociation function
async function testAddMemeCaptionAssociation() {
  try {
    console.log('Testing addMemeCaptionAssociation with memeId = 1, captionId = 2, points = 10...');
    const lastID = await addMemeCaptionAssociation(1, 2, 2);
    console.log('Meme-Caption Association added with ID:', lastID);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the test
(async () => {
  await testAddMemeCaptionAssociation();
})();
