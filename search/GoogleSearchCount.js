/**
 * The goal is to search the HQ question, then parse through the search results to see
 * the number of times that one of the answers was given. Whichever was given the most
 * should be the correct answer (theoritically).
 */

var request = require('request');

exports.search = function findGoogleSearchCount(hqData) {
    request.get({
        url: "https://www.googleapis.com/customsearch/v1",
        qs: {
            key : 'AIzaSyCfBdbnT24Gy-_yBupr9nc4s7lklzwAwAw',
            cx : '000678387829034089016:pfmft8eezi0',
            q : hqData.question
            }
        },
        function (error, response, body) {
            setScores(hqData, body);
        }
    );
}

//Purpose: give each answer a score for the number of times it was mentioned in the search results
function setScores(answers, body) {
    var snippets = extractSearchSnippets(body);
    var scores = findAnswerInSearchResults(snippets, answers);
    console.log(scores);
}

function findAnswerInSearchResults(searchResults, answers) {
    var answer0Count = getSearchCount(searchResults, answers.answer0);
    var answer1Count = getSearchCount(searchResults, answers.answer1);
    var answer2Count = getSearchCount(searchResults, answers.answer2);

    var scores = {
        answer0Count : answer0Count,
        answer1Count: answer1Count,
        answer2Count: answer2Count
    };

    return scores;
}

function getSearchCount(searchResults, answer) {
    //TODO: this matching just matches any letters so it would consider taliban to be an occurenc of "ban". I hope to find a better regex for this, but this is just a hack around for now.
    var regExp = new RegExp(answer, "gi");
    var count = (searchResults.match(regExp) || []).length;
    return count;
}

function extractSearchSnippets(body) {
    var json = JSON.parse(body);
    var searchResults = json.items;
    var snippets = "";
    for (var i = 0; i < searchResults.length; i++) {
        var result = searchResults[i];
        snippets += result.snippet;
    }

    return snippets;
}

