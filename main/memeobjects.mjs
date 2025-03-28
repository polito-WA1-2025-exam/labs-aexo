// Meme object constructor
class Meme {
    constructor(id, imageUrl) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.captions = []; // Stores associated captions
    }


    // if caption is right we have caption + point.
    //  if caption is  wrongwe have caption + 0 points.
    addCaption(caption, points) {
        this.captions.push({ caption, points });
    }
}

// Caption object constructor
// if at some point, we want to know for each caption, which meme it belongs to, we can add a memeId array property to the Caption class.
class Caption {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}

// Player object constructor
class Player {
    constructor(username) {
        this.username = username;
        this.games = []; // Stores past games
    }

    addGame(game) {
        this.games.push(game);
    }
}

// Game object constructor
class Game {
    constructor(player) {
        this.player = player;
        this.rounds = [];
        this.totalScore = 0;
    }

    addRound(round) {
        this.rounds.push(round);
        this.totalScore += round.score;
    }
}

// Round object constructor
class Round {
    constructor(meme, selectedCaption) {
        this.meme = meme;
        this.selectedCaption = selectedCaption;
        this.score = this.calculateScore();
    }

    calculateScore() {
        const matchingCaption = this.meme.captions.find(c => c.caption === this.selectedCaption);
        return matchingCaption ? matchingCaption.points : 0;
    }
}

// MemeCollection to manage memes
class MemeCollection {
    constructor() {
        this.memes = [];
    }

    addMeme(meme) {
        this.memes.push(meme);
    }

    getRandomMeme() {
        return this.memes[Math.floor(Math.random() * this.memes.length)];
    }
}

// Example: Populating with memes and captions
const memeCollection = new MemeCollection();

const meme1 = new Meme(1, "meme1.jpg");
meme1.addCaption("This is hilarious!", 1);
meme1.addCaption("Too funny!", 2);
meme1.addCaption("LOL!", 3);

const meme2 = new Meme(2, "meme2.jpg");
meme2.addCaption("I relate to this.", 1);
meme2.addCaption("So true!", 2);
meme2.addCaption("This is me.", 3);

memeCollection.addMeme(meme1);
memeCollection.addMeme(meme2);

// Example game flow
const player = new Player("JohnDoe");
const game = new Game(player);

for (let i = 0; i < 3; i++) {
    const meme = memeCollection.getRandomMeme();
    const randomCaption = meme.captions[Math.floor(Math.random() * meme.captions.length)].caption;
    const round = new Round(meme, randomCaption);
    game.addRound(round);
}

player.addGame(game);
console.log(player);
