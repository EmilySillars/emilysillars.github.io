/*
* Author: Emily Sillars
* Assignment: PLT Brainstorming
* Description:
*   This is an example of an interactive story to be programmed with
*   a probability-based domain speficic language instead of java script.
*
*****/

let desc = "A little kitten sits on the sidewalk all alone, meowing loudly";
let choices = ["Give the kitten a saucer of milk.",
 "Gently stroke the kitten's silky fur.", "Give the kitten a carrot."];
const $title = $('#title');
const $choices = $('#choices');
const $text = $('#text');
const $prompt = $('#prompt');
const $pic = $("#illustration")

function myClick(num){
  switch(num) {
  case -1:
    location.reload();
    break;
  case 0:
    // code block
    desc = "The kitty daintily laps up the milk."
    break;
  case 1:
    // code block
    desc = "The kitty hisses and bites your finger."
    break;
  default:
    let x = Math.floor(Math.random()*100) //random integer between 0 and 100.
    if(x > 50){
      desc = "It hops forward and chomps on the carrot... OMG! That's not a kitten at all, that's a rabbit!"
      $pic.attr("src","https://media.istockphoto.com/photos/nature-wild-rabbit-eats-a-carrot-picture-id1130779607?s=612x612")
    }
    else{
      desc = "The kitty sniffs the carrot, then bats it away disdainfully."
    }
  }
  $choices.html("");
  $text.text(desc);
  $prompt.text("The End :)");
}

$(document).ready(function(){
  //console.log("helooooo world!");
  //STORY CODE
  let input = "";
  for(let i = 0; i < choices.length; i++){
    input += " <li class = \"choice\"" + " onclick=\"myClick(" + i + ")\">" + choices[i] + "</li>"
  }
  $choices.html(input);
  $text.text(desc)

});//once the document is ready(loaded,) run all this code!
