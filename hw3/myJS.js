/*
* Excercise 1
*
*/



/*
* Then write a function that changes the text and the color inside the div
*
*/
const box=document.getElementById('color-block');
const colorName=document.getElementById('color-name')

function changeColor(){
    //Write a condition determine what color it should be changed to
    if(box.getAttribute('class')=='red'){
        
        
        //change the background color using JS
        box.setAttribute('style','background-color:#FFFF00 ')
        //Change the text of the color using the span id color-name
        box.setAttribute('class','yellow')
        colorName.textContent='#FFFF00'
    }
    else{
        //change the background color using JS

        //Change the text of the color using the span id color-name
        box.setAttribute('style','background-color:#F08080')
        box.setAttribute('class','red')
        colorName.textContent='#F08080'

    }
};
box.addEventListener('click',changeColor);

/*
* For excercise 2, you need to write an event handler for the button id "convertbtn"
* on mouse click. For best practice use addEventListener.
*
*/


/*
* Then write a function that calculates Fahrenheit to Celsius and display it on the webpage
*
*/
const temp=document.getElementById('f-input');
const button = document.getElementById('convertbtn');
const cel = document.getElementById('c-output');
function convertTemp(){
    //Calculate the temperature here
    let c=(temp.value-32)*5/9;
    c=Math.round(c)
    //Send the calculated temperature to HTML
    cel.textContent = c;
}

button.addEventListener('click', convertTemp);

