/*code modifed from w3schools example for including html*/
function includeHTML() {
  var list, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  list = document.getElementsByTagName("*"); //get all children elements of the document
  for (i = 0; i <list.length; i++) {
    elmnt = list[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() { //this function is called when state changes(signal received)
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("include-html");
          includeHTML(); //recurse on list with one less elt tagged as include-html
        }
      }
      xhttp.open("GET", file, true); //extract the html
      xhttp.send(); //change state of waiting XMLHttpRequest by sending the html as the responseText
      //^this function prmpts onreadystatechange to be executed again!
      /* Exit the function: */
      return;
    }
  }
}
