/*
* Hack Dibner Project: Find My Book Webpage
* Team: Dewey Decimals
* Date: 10/19/18*
* Authors: Emily Sillars
 */
window.onload = function(){ //make sure the page is loaded before performing javascript actions!

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

   };

   imageObj.src = "png_images/myBurger2.png";

}

 function getBurgerInfo(){
   result = "";
   nameInput = String(nameField.value);
   ageInput = String(ageField.value);
   if(nameInput == ""){
     nameInput = "Capt. Blue Bayou"
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
     //draw the burger
     createBurger();
   }
   resultText.textContent = result;
 }

 //wait for the user to input a call number.
 infoSubmit.addEventListener('click', getBurgerInfo);



}; //once the page has loaded, run everything inside the brackets!
