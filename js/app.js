/*
    app.js
    application script for the JavaScript and Forms Demo
*/

"use strict";

/* onReady()
* Called when the DOM is loaded and ready for manipulation.
* We need to populate the class standing select based on the standings array
* and add an event listener for the form's submit event
* */
function onReady() {

    //This is an array of objects
    //Objects are really just hashmaps
    //This would probably be generated in JSON instead of the source code in the real world
    //each set of {} is an object
    var standings = [
        {
            code: 'f', //format of key: value, here the key is code and the value is the string 'f'
            display: 'Freshman'
        },
        {
            code: 's',
            display: 'Sophomore'
        },
        {
            code: 'j',
            display: 'Junior'
        },
        {
            code: 'sn',
            display: 'Senior'
        },
        {
            code: 'ss',
            display: 'Super Senior'
        }];
    var personForm = document.getElementById('person-form'); //this gets the element that is the whole form

    //this gets the HTML element within the <form> we grabbed above that has the id "standing" which is the dropdown menu
    var standingsSelect = personForm.elements['standing'];

    var i; //loop counter
    var option; //this will become a new HTML tag we will use in the loop

    for(i = 0; i < standings.length; ++i) {
        option = document.createElement('option'); //option is now a new html element <option>
        option.innerHTML = standings[i].display; //the innerHTML of our new <option> is now the display property of the object in the array at i
        option.value = standings[i].code; //the value sent to the server is now the code property of the object in the array at i
        standingsSelect.appendChild(option); //our new <option> has now been added to the dropdown we grabbed earlier
    }

    //This will run the function onSubmit (below) when the submit button is pressed
    personForm.addEventListener('submit', onSubmit);

} //onReady()

/* onSubmit()
 * Called when the user attempts to submit the form
 * The browser will pass an event object as the first parameter and we can use this object
 * to stop the form from being submitted if it is invalid.
 * Also the keyword 'this' will refer to the form that is being submitted while inside this function.
 * */
function onSubmit(evt) {
    //This thing is trying 3 different ways to stop the browser from submitting because not all the browsers work the same

    //evt is an arbitrary variable, we could name it whatever we want, it's just the thing getting passed to this function when it is called
    evt.returnValue = validateForm(this);
    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }
    return evt.returnValue;
} //onSubmit()


/* validateForm()
* This function validates the form's information and returns true if the form is valid or false if the form is invalid.
* It will also let the user know which fields are invalid.
* parameters:
*   form    reference to the form that needs to be validated
* */
function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'standing', 'age'];
    var i; //loop counter
    var formValid = true; //This is what we sent to the form submission checker

    for(i = 0; i <requiredFields.length; ++i) {
        //this sets our formValid things to false if the element we're checking returns false (function below this one)
        formValid &= validateRequiredField(form.elements[requiredFields[i]]);
    }

    //sets the alert paragraph text if form validation fails
    if(!formValid) {
        var errMsg = document.getElementById('error-message');
        //adds text
        errMsg.innerHTML = 'Please fill out the required fields';

        //changes the style from what it is currently to 'block' (it was initially invisible, now it is visible)
        errMsg.style.display = 'block';
    }

    return formValid;
} //validateForm()

/* validateRequiredField()
* This function validates a field that is required. If the field does not have a value, or has only spaces,
* it will mark the field as invalid and return false. Otherwise it will return true.
* */
function validateRequiredField(field) {
    var value = field.value.trim(); //cuts off the space in front of or at the end of the string in the field we're checking

    var valid = value.length > 0;
    if(valid) {
        field.className = 'form-control';
    } else {
        //visually changes bad fields for the user by changing the class of the field which has a different CSS red border
        field.className = 'form-control invalid-field';
    }
    return valid;
} //validateRequiredField()

document.addEventListener('DOMContentLoaded', onReady);