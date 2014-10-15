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
    //we're going to populate the "year in school" dropdown menu with the contents of this array so that if we want to change the dropdown later we only need to change the values here in the array
    var standings = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Super Senior!'];
    var personForm = document.getElementById('person-form'); //this gets the elemnt that is the whole form

    //this gets the HTML tag withint the <form> section we grabbed that has the name "standing" which in our current case is the dropdown menu
    var standingsSelect = personForm.elements['standing'];

    var i; //loop counter
    var option; //this will become a new HTML tag we will use in the loop

    for(i = 0; i < standings.length; ++i) {
        option = document.createElement('option');
        option.innerHTML = standings[i];
        option.value = i + 1; //we added 1 because we want values to start at 1 not 0
        standingsSelect.appendChild(option);
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

    //by default the HTML is going to POST to the server, this script here is going to catch that and stop it if the form is not filled with information that we approve of

    //This thing is trying 3 different ways to stop the browser from submitting because not all the browsers work the same
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
        //visually changes bad fields for the user by changing the CSS class of the field
        field.className = 'form-control invalid-field';
    }
    return valid;
} //validateRequiredField()

document.addEventListener('DOMContentLoaded', onReady);