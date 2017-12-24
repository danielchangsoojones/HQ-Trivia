/**
 * The goal is to search the HQ question, then parse through the search results to see
 * the number of times that one of the answers was given. Whichever was given the most
 * should be the correct answer (theoritically).
 */

var request = require('request');

findGoogleSearchCount("hi");
function findGoogleSearchCount(queryText) {
    request.get({
        url: "https://www.googleapis.com/customsearch/v1",
        qs: {
            key : 'AIzaSyCfBdbnT24Gy-_yBupr9nc4s7lklzwAwAw',
            cx : '000678387829034089016:pfmft8eezi0',
            q : queryText
            }
        },
        function (error, response, body) {
            console.log(body);
        }
    );
}

