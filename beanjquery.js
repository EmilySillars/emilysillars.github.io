/*
* HAIL.
*/
window.onload = function(){ //make sure the page is loaded before performing javascript actions!
//constant values
const alpha = "abcdefghijklmnopqrstuvwxyz";
//input fields
const keyword = document.querySelector('#keywordField');
const number = document.querySelector('#numberField');
const input = document.querySelector('#inputTextField');
const output = document.querySelector('#outputTextField');
//submit info buttons
const encryptSubmit = document.querySelector('.dataSubmit1');
const decryptSubmit = document.querySelector('.dataSubmit2');
//globals
var encrypt = false; //flag for either decrypting or encrypting

function translate(){
   let kw = String(keyword.value);
   let num = (number.value);
   let message = String(input.value);
   if( kw == "" || message == ""){
     result = "No empty fields allowed!";
     return;
   }
   else{
     result = "";
   }
   resultText.textContent = result;
  //since input is valid, continue with encryption...
  let refAlpha = referenceAlphabet(kw.toLowerCase());
  let numAlpha = shiftBy(refAlpha,num)+""; //caesar shift
   //print output
  output.value = generateMessage(message.toLowerCase(),numAlpha,encrypt)+"";
 }

function generateMessage(str,alpha, encrypt){
  console.log("the message is "+str)
  let message = "";
  for(i = 0; i < str.length; i++){
    var n = str.charCodeAt(i);
    console.log("n is"+n);
    if((n -97) < 0 ||(n-97) >122){
      message += (str[i]+"");
    }
    else if (encrypt){
      message += (alpha[n-97]+"");
    }
    else{
        message += String.fromCharCode(alpha.indexOf(str[i]) + 97);
    }
  }
  return message;
}

function containsChar(str,char){
  for (i = 0; i < str.length; i++){
    if(str[i] == char){
      return true;
    }
  }
  return false;
}

//https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
// source for this funtion above ^

function shiftBy(str, amount){
  if(amount == 0){
    return str;
  }
  num = amount % 26;
  beginning = str.substr(0,num);
  end = str.substr(num,str.length);
  str = str.replaceAt(0,end);
  str = str.replaceAt(str.length-num,beginning);
  return str;
}

function referenceAlphabet(key){
  console.log("hello ");
  console.log(containsChar(key,"e")+"");
  var first = alpha;
  var cursor = 0;
  for(j = 0; j < 26; j++){
    if(containsChar(key,alpha[j]+"") == false){
      first = first.replaceAt(cursor,alpha[j]);
      cursor++
    }
  }
  first = first.replaceAt(first.length-key.length,key);
  console.log(first);
  return first;
}

function choseEncrypt(){
encrypt = true;
translate();
}

function choseDecrypt(){
encrypt = false;
translate();
}

 //wait for the user to press a button.
 encryptSubmit.addEventListener('click', choseEncrypt);
 decryptSubmit.addEventListener('click', choseDecrypt);



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


* Name: stopRaining()
* Description: This function removes the 20 raindrops.
*  Once finished, it sets the rainfall flag to FALSE.
* Parameters: none
* Return: none

function stopRaining(){
  //replace the twenty rain drops with a single, unmoving rain drop off screen.
  document.querySelector("#rainDrops").innerHTML = "<p class = 'drop fall'></p>"; //replace with a single drop.
  document.querySelector(".drop").classList.remove("fall"); //stop this rain drop from falling.
  rainfall = false; //rain should not be falling now.
  }
  * Name: moveDrop()
  * Description: This function moves each raindrop between 1 and 2.99999%
  *   downward according to its speed. If the drop reaches the bottom of the window,
  *   it places it back above the window with a new random speed and position.
  * Parameters: none
  * Return: none

function moveDrop(){
  var fall = document.querySelectorAll(".fall"); //select all the rain drops.
  //for each drop, move it according to its speed.
  for(let j =0; j< fall.length; j++){
    let ypos = percenToInt(fall[j].style.top);
    ypos += speeds[j];
    if(ypos >= 98){ //if the drop has reached the bottom of the window,
      //give the drop a new random speed.
      let sped = (Math.random()*3);
      if(sped <= 1){
        speeds[j] = 1;
      }
      else{
        speeds[j] = sped;
      }
      //give the drop a new random position above the window.
      fall[j].style.top = (-1)*(Math.floor(Math.random()*10)+20)+"%";
      fall[j].style.left = Math.floor(Math.random()*100)+"%";
    }
    else{
      fall[j].style.top = ypos+"%";
    }
  }
} //end of MOVE DROP function!


* Name: weather()
* Description: This function function "checks the weather" by checking if the rainfall flag is true.
*   If it is, it moves the raindrops a tiny bit, acting like a frame of an animation.
* Parameters: none
* Return: none

function weather(){
  if(rainfall){
      setTimeout(console.log("timer went off."), 20); //wait 20 seconds to create a pause between animation "frames".
      moveDrop();
          }
}

var slider = document.querySelector('#rainSlider');
//if the user clicks on the handle/slider, turn rain ON/OFF accordingly.
slider.addEventListener('click', slide);
//update weather.
setInterval(weather, 25); //call the weather function every 25 milliseconds to simulate changing frames of an animation.
*/

}; //once the page has loaded, run everything inside the brackets!
