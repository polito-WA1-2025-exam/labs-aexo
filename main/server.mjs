// server.js
import express from 'express';
import {
  getAllItems,
  getMemesByCondition,
  storeNewMeme,
  updateMemeImageUrl,
  deleteMemeById
} from './memeobjects.mjs';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies from incoming requests.
app.use(express.json());

/**
 * GET /api/memes
 * - If a query parameter "minId" is provided, returns memes with id > minId.
 * - Otherwise, returns all memes.
 */
app.get('/api/memes', async (req, res) => {
  try {
    if (req.query.minId) {
      const minId = parseInt(req.query.minId, 10);
    //   this 10 is the base of the number system, so it will convert the string to a number in base 10.
      if (isNaN(minId)) {
        return res.status(400).json({ error: 'minId must be a valid integer' });
      }
      const memes = await getMemesByCondition(minId);
      return res.json(memes);
    } else {
      const memes = await getAllItems('Meme');
      return res.json(memes);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/memes/:id
 * Retrieves a specific meme by its unique id.
 */
app.get('/api/memes/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a valid integer' });
  }
  try {
    // Using getAllItems and filtering manually for simplicity.
    const memes = await getAllItems('Meme');
    const meme = memes.find(m => m.id === id);

    // !meme is a shorthand for meme === undefined or meme === null.
    if (!meme) {
      return res.status(404).json({ error: 'Meme not found' });
    }
    return res.json(meme);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/memes
 * Creates a new meme record. The request body must include the imageUrl.
 * The database automatically assigns a unique id.
 */
app.post('/api/memes', async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing imageUrl in request body' });
  }
  try {
    const newMemeId = await storeNewMeme(imageUrl);
    res.status(201).json({ id: newMemeId, imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /api/memes/:id
 * Fully updates an existing meme record.
 * The request body must provide all properties (except the id).
 */
app.put('/api/memes/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a valid integer' });
  }
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing imageUrl in request body' });
  }
  try {
    const updated = await updateMemeImageUrl(id, imageUrl);
    if (!updated) {
      return res.status(404).json({ error: 'Meme not found' });
    }
    res.json({ message: 'Meme updated successfully', id, imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * PATCH /api/memes/:id
 * Partially updates one or more attributes of a meme.
 * In this example, we assume only the imageUrl field can be updated.
 */
app.patch('/api/memes/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a valid integer' });
  }
  // For a partial update, ensure at least one field is provided.
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing fields to update' });
  }
  try {
    const updated = await updateMemeImageUrl(id, imageUrl);
    if (!updated) {
      return res.status(404).json({ error: 'Meme not found' });
    }
    res.json({ message: 'Meme updated successfully', id, imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /api/memes/:id
 * Deletes a meme using its unique identifier.
 */
app.delete('/api/memes/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a valid integer' });
  }
  try {
    const deleted = await deleteMemeById(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Meme not found' });
    }
    res.json({ message: 'Meme deleted successfully', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Start the Express server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
