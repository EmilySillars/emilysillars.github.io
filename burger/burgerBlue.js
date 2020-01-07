/*
* Hack Dibner Project: Find My Book Webpage
* Team: Dewey Decimals
* Date: 10/19/18*
* Authors: Emily Sillars
 */
window.onload = function(){ //make sure the page is loaded before performing javascript actions!
 const $title = $('#congrats');
 const $form = $('#inputBox');
 const $downloadLink = $('#downloadLink');
 const nameField = document.querySelector('.nameField');
 const ageField = document.querySelector('.ageField');
 const resultText = document.querySelector('#resultText');
 const infoSubmit = document.querySelector('.infoSubmit');

 let nameInput = String(nameField.value);
 let ageInput = String(ageField.value);
 let result = '';

 let canvas = document.querySelector('#burger');
 canvas.width = 0;
 canvas.height = 0;

 //hide download link at start
 $downloadLink.hide();
 $title.hide();

function createBurger(){

   var context = canvas.getContext("2d");


   let wrapper = document.querySelector("#canvasWrapper");
   var imageObj = new Image();

     canvas.width = 554;
     canvas.height = 769;

   imageObj.onload = function() {

       context.drawImage(imageObj, 0, 0);
       context.font = "30pt typenoksidi";
       context.fillText(nameInput, 90, 545); //21
       context.fillText(ageInput + " years", 250, 610); //13 - 6 = 7
      // $downloadLink.attr("href",String(canvas.toDataURL()));
       link = String(canvas.toDataURL());
   };
   imageObj.src = "png_images/myBurger2.png";

}

 function getBurgerInfo(){
   result = "";
   nameInput = String(nameField.value);
   ageInput = String(ageField.value);
   if(nameInput == ""){
     nameInput = "Dr. Blue Bayou"
   }
   if(ageInput == ""){
     ageInput = "0.01918"
   }
   if(nameInput.length > 21){
     result += " Name can have a max of 21 characters."
   }
   else if(ageInput.length > 7){
     result += " Age can have a max of 7  digits."
   }
   else{
     $title.show();
     //draw the burger
     createBurger();
     $form.hide();
     $downloadLink.show();
   }
   resultText.textContent = result;
 }

 //wait for the user to input a call number.
 infoSubmit.addEventListener('click', getBurgerInfo);

 function printBurger(){
    let $burg = $('#burgerImage');
    $burg.attr("src",link);
    let $canvas = $('#burger');
    $canvas.hide();
    window.print();
 }

 $downloadLink.on('click', printBurger);
/*
//variable visible to all functions,initialized at start of run.
let rain = false; //a flag that indicates when the rain button is ON. Rain is OFF, (false), by default.
let rainfall = false; //a flag that indicates when rain should be FALLING. Rainfall is OFF, (false), by default.
var speeds = [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9]; //an initialized array of speeds for the twenty rain drops.
//^ when the raindrops are created, these speeds will be set to random values; (these initial values will never be used).

function slide(){
  rain = !rain; //if rain is ON, turn OFF. If rain is OFF, turn ON.
  if(rain){ //if rain is now ON, slide handel right.
  document.querySelector('#rainSlider').classList.add("slidRight");
  document.querySelector('#rainSlider').classList.remove("slidLeft");
  startRaining();
  }
  else{ //if rain is now OFF, slide handel left.
    document.querySelector('#rainSlider').classList.add("slidLeft");
    document.querySelector('#rainSlider').classList.remove("slidRight");
    stopRaining();
  }
}

/*
function isNum(strng){
  if(strng == "" | strng == "%")
  {
    return false;
  }
  return true;
}


function percenToInt(percen){
  var percenArray = percen.split("%",1);
  var strng = percenArray.find(isNum);
  let num = parseInt(strng);
  return num;
}
function startRaining(){
  //create 20 rain drops.
    document.querySelector("#rainDrops").innerHTML=
    "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
    "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
    "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
    "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
    "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
    "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
    "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
    "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
    "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
    "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />";
  //initialize random speeds
  for(let k =0; k< speeds.length; k++){
    let spd = (Math.random()*3); //a random number between 0 and 3.
    if(spd <= 1){ //if the speed is a decimal or 0, set it to 1.
      speeds[k] = 1;
    }
    else{
      speeds[k] = spd;
    }
  }
  //set positions for the first wave of 10 drops, at top of window or just above it.
  var fall = document.querySelectorAll(".fall");
  for(let i =0; i< fall.length/2; i++){
    let y = Math.floor(Math.random()*10); //random integer between 0 and 10.
    if(y != 0){ //if y-pos is not the exact top of window,
      y *= (-1); //make y-pos negative so it is ABOVE the window.
    }
    let x = Math.floor(Math.random()*100) //random integer between 0 and 100.
      fall[i].style.top = y+"%";
      fall[i].style.left = x+"%";
  }
  //set positions for the second wave of 10 drops, higher above the first wave.
  for(let i =fall.length/2; i< fall.length; i++){
    let y = (Math.floor(Math.random()*10)+20);//random integer between 20 and 30.
    if(y != 0){ //if y-pos is not the exact top of window,
      y *= (-1); //make y-pos negative so it is ABOVE the window.
    }
    let x = Math.floor(Math.random()*100) //random integer between 0 and 100.
      fall[i].style.top = y+"%";
      fall[i].style.left = x+"%";
  }
  rainfall = true; //rain drops should be falling now.
}


weather, 25); //call the weather function every 25 milliseconds to simulate changing frames of an animation.
*/

}; //once the page has loaded, run everything inside the brackets!
