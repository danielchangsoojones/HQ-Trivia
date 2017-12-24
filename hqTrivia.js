process.env.GOOGLE_APPLICATION_CREDENTIALS = "./trivia-testing-7bb31e4ccfb0.json";

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs text detection on the image file
client
  .textDetection('./resources/hq-photo.png') //photo is replaced by automator with the newest screenshots
  .then(results => {
    //a block is each block of text
    // var blocks = results[0].fullTextAnnotation.pages[0].blocks[5];

    // // console.log(blocks);
    // var paragraph = blocks.paragraphs[0];
    // var words = paragraph.words;
    // console.log(words[0].symbols[0]);

    console.log("heyyy");

    // var bensThing = results[0].textAnnotations[0].description;

    // console.log("Ben's thing: ");
    // console.log(bensThing);

    var textParser = require("./visionTextJSONParser.js");
    textParser.parse(results);

    var question;
    var answer1;
    var answer2;
    var answer3;
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
