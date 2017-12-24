process.env.GOOGLE_APPLICATION_CREDENTIALS = "./trivia-testing-7bb31e4ccfb0.json";

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs text detection on the image file
client
  .textDetection('./resources/hq-photo.png') //photo is replaced by automator with the newest screenshots
  .then(results => {
    var textParser = require("./visionTextJSONParser.js");
    var QuestionAnswers = textParser.parse(results);

    var GoogleSearch = require('./search/GoogleSearchCount');
    GoogleSearch.search(QuestionAnswers);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
