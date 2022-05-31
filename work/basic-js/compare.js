"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY
  let counter = 0;
  let matches = {}
  // comparing character by charatcer and updating the matches object with matching characters
  for(let i=0; i < word.length; i++){
    for(let j=0; j < guess.length; j++){
      if(word.charAt(i).toLowerCase()===guess.charAt(j).toLowerCase()){
        // check for key in matches, increment occurence if found, otherwise assign with 1
        matches[word.charAt(i).toLowerCase()] = matches[word.charAt(i).toLowerCase()] ? matches[word.charAt(i).toLowerCase()]++ : 1;
      }
    }
  }
  // counting the matching charatcers from matches object
  for ( let match in matches ){
    counter++;
  }
  return counter;
}
