/**
 * The goal is to search the HQ question, then parse through the search results to see
 * the number of times that one of the answers was given. Whichever was given the most
 * should be the correct answer (theoritically).
 */

var request = require('request');

findGoogleSearchCount("hi");
function findGoogleSearchCount(question, answers) {
    request.get({
        url: "https://www.googleapis.com/customsearch/v1",
        qs: {
            key : 'AIzaSyCfBdbnT24Gy-_yBupr9nc4s7lklzwAwAw',
            cx : '000678387829034089016:pfmft8eezi0',
            q : question
            }
        },
        function (error, response, body) {
            setScores(answers, body);
        }
    );
}

//Purpose: give each answer a score for the number of times it was mentioned in the search results
function setScores(answers, body) {
    var snippets = extractSearchSnippets(body);
    console.log(snippets);
}

function findAnswerInSearchResults(searchResults) {
    
}

function extractSearchSnippets(body) {
    var json = JSON.parse(body);
    var searchResults = json.items;
    var snippets = [];
    for (var i = 0; i < searchResults.length; i++) {
        var result = searchResults[i];
        snippets.push(result.snippet);
    }

    return snippets;
}

