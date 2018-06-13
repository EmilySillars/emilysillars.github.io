/*
* Author: Emily Sillars
* Assignment: Javascript and JQuery
* Description: This is my JQuery file. It implements the same rain button from my pureJS file,
*   this time using a combination of javascsript and JQuery commands. It also adds functionality
*   for my angry tomato ad button, replacing the entire ad block with a very angry tomato when clicked.
*****/
$(document).ready(function(){
  //RAIN DATA FIELDS
  let rain = false; //a flag that indicates when the rain button is ON. Rain is OFF, (false), by default.
  let rainfall = false; //a flag that indicates when rain should be FALLING. Rainfall is OFF, (false), by default.
  var speeds = [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9]; //an initialized array of speeds for the twenty rain drops.
    //^ when the raindrops are created, these speeds will be set to random values; (these initial values will never be used).
  const $slider = $('#rainSlider');
  const $rainDrops = $('#rainDrops');
  //TOMATO DATAFIELDS
  const $tomatoButton = $('#tomatoImage');
  const $tomato = $('#angryAngryTomato');
  const $tomatoImg = $("#angryAngryTomato");
  const $ad1 = $('#ad1');
  const $ad2 = $('#ad2');
  const $ad3 = $('#ad3');
  const $text = $('#broccoliLinkText');

  /*TOMATO Functions ****************************************************************************************************/
  function tomatoAppears(){
    $ad1.hide();
    $ad2.hide();
    $ad3.hide();
    $text.hide();
    $tomatoImg.attr("src", "png_images/angryAngryTomato72.png");
    $tomatoImg.attr("srcset", "png_images/angryAngryTomato144.png 2x");
    $tomatoImg.attr("alt", "A very angry tomato.");
    $tomato.show();
  }
  function tomatoDisappears(){
    //$("#my_image").attr("src","second.jpg");
    $ad1.show();
    $ad2.show();
    $ad3.show();
    $text.show();
    $tomato.hide();
  }
/*RAIN Functions *********************************************************************************************************/
  /*
  * Name: slide()
  * Description: This function moves the handle of the rain button left or right,
  *  depending on whether it is being turned ON or OFF. It also stops/starts the rain accordingly.
  * Parameters: none.
  * Return: none.
  */
  function slide(){
    rain = !rain; //if rain is ON, turn OFF. If rain is OFF, turn ON.
    if(rain){ //if rain is now ON, slide handel right.
    $slider.addClass("slidRight");
    $slider.removeClass("slidLeft");
    startRaining();
    }
    else{ //if rain is now OFF, slide handel left.
      $slider.addClass("slidLeft");
      $slider.removeClass("slidRight");
      stopRaining();
    }
  }

  /*
  * Name: isNum()
  * Description: This is a helper function for percenToInt which determines if the input strng
  * is a string representation of a number, with minimal error checking.
  * Parameters:
  * -strng - one elt from  an array of strings returned from a string.split("%",1) function call,
  *  where the string is split according to a separator of "%", and only allowed to be split once.
  * Return: true if strng is not "" or "%", which hopefully implies it is of the form "#". false otherwise.
  */
  function isNum(strng){
    if(strng == "" | strng == "%")
    {
      return false;
    }
    return true;
  }

  /*
  * Name: percenToInt()
  * Description: This function takes an input string of the form "#%" and parses its integer value.
  * Parameters:
  * -strng - one elt from a return of a string.split("%",1) function call,where the string is split according
  *   to a separator of "%", and only allowed to be split once. This means strng should either be a "#" or "%".
  * Return: the parsed integer if successful, false if unsuccessful.
  */
  function percenToInt(percen){
    var percenArray = percen.split("%",1);
    var strng = percenArray.find(isNum);
    let num = parseInt(strng);
    return num;
  }

  /*
  * Name: startRaining()
  * Description: This function creates 20 raindrops and sets up their random positions and speeds,
  *   preparing them to start falling. Once finished, it prompts the drops to fall.
  * Parameters: none
  * Return: none
  */
  function startRaining(){
    //create 20 rain drops.
      $rainDrops.html(
      "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
      "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
      "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
      "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
      "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
      "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
      "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
      "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
      "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />"+
      "<img class = 'drop fall' src='png_images/drop72.png' srcset='png_images/drop144.png 2x' alt='a rain drop.' />");
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
    var $fall = $(".fall");
    for(let i = 0; i< $fall.length/2; i++){
      let y = Math.floor(Math.random()*10); //random integer between 0 and 10.
      if(y != 0){ //if y-pos is not the exact top of window,
        y *= (-1); //make y-pos negative so it is ABOVE the window.
      }
      let x = Math.floor(Math.random()*100) //random integer between 0 and 100.
        $fall[i].style.top = y+"%";
        $fall[i].style.left = x+"%";
    }
    //set positions for the second wave of 10 drops, higher above the first wave.
    for(let i = $fall.length/2; i< $fall.length; i++){
      let y = (Math.floor(Math.random()*10)+20);//random integer between 20 and 30.
      if(y != 0){ //if y-pos is not the exact top of window,
        y *= (-1); //make y-pos negative so it is ABOVE the window.
      }
      let x = Math.floor(Math.random()*100) //random integer between 0 and 100.
        $fall[i].style.top = y+"%";
        $fall[i].style.left = x+"%";
    }
    rainfall = true; //rain drops should be falling now.
  }

  /*
  * Name: stopRaining()
  * Description: This function removes the 20 raindrops.
  *  Once finished, it sets the rainfall flag to FALSE.
  * Parameters: none
  * Return: none
  */
  function stopRaining(){
    //replace the twenty rain drops with a single, unmoving rain drop off screen.
    $rainDrops.html("<p class = 'drop fall'></p>"); //replace with a single drop.
    var $oneDrop = $(".drop");
    $oneDrop.removeClass("fall"); //stop this rain drop from falling.
    rainfall = false; //rain should not be falling now.
    }

    /*
    * Name: moveDrop()
    * Description: This function moves each raindrop between 1 and 2.99999%
    *   downward according to its speed. If the drop reaches the bottom of the window,
    *   it places it back above the window with a new random speed and position.
    * Parameters: none
    * Return: none
    */
  function moveDrop(){
    var $fall = $(".fall");
    //for each drop, move it according to its speed.
    for(let j =0; j< $fall.length; j++){
      let ypos = percenToInt($fall[j].style.top);
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
        $($fall[j]).css("top", ((-1)*(Math.floor(Math.random()*10)+20)+"%"));
        $($fall[j]).css("left",(Math.floor(Math.random()*100)+"%"));
      }
      else{
        $($fall[j]).css("top",ypos+"%" );
      }
    }
  } //end of MOVE DROP function!

  /*
  * Name: weather()
  * Description: This function function "checks the weather" by checking if the rainfall flag is true.
  *   If it is, it moves the raindrops a tiny bit, acting like a frame of an animation.
  * Parameters: none
  * Return: none
  */
  function weather(){
    if(rainfall){
        setTimeout(console.log("timer went off."), 20); //wait 20 seconds to create a pause between animation "frames".
        moveDrop();
            }
  }

  tomatoDisappears(); //make sure you hide the tomato.
  //if the user clicks on the handle/slider, turn rain ON/OFF accordingly.
  $slider.on('click', slide);
  //if the user clicks on the angry tomato, display the tomato.
  $tomatoButton.on('click',tomatoAppears);
  //update weather.
  setInterval(weather, 25); //call the weather function every 25 milliseconds to simulate changing frames of an animation.
});//once the document is ready(loaded,) run all this code!
