"use strict";

//    Signup Form Script
//    This script will load the state select list and validate the form before submission

function onReady() {
    //selecting the state drop down from the html 
    var statesSelect = document.getElementsByName("state");
    var ids = 0;
    for (ids = 0; ids < usStates.length; ids++) {
        var opt = document.createElement("option");
        opt.setAttribute("text", usStates[ids].name);
        opt.setAttribute("value", usStates[ids].code);

        //create text node
        var node = document.createTextNode(usStates[ids].name);
        opt.appendChild(node);
        //adding the newly created option to the State Select element 
        statesSelect[0].appendChild(opt);
    }
    var otherVariable = document.getElementById("occupation");
    otherVariable.addEventListener("change", selectOther);

    signup.addEventListener('submit', onSubmit);

    var noThanks = document.getElementById("cancelButton");
    noThanks.addEventListener("click", clickingButton);
}

//If the user selects the other button, another option will show
function selectOther(occupation) {

    //if user selects other option 
    if (this.value == "other") {
        document.getElementsByName("occupationOther")[0].style.display = "inline";
    } else {
        document.getElementsByName("occupationOther")[0].style.display = "none";
    }
}

//Checks if the really user wants to leave the page
function clickingButton(cancelButton) {
    if (window.confirm("Are you sure? I worked really hard on this website and you just want to leave.")) {
        window.location = "http://www.google.com";
    }
}

//Validates the form before it is submitted to the server and stop the submission if it is invalid
function onSubmit(evt) {
    var valid = validateForm(this);
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
        document.getElementsByName("occupationOther")[0].style.display = "none";
    }

    evt.returnValue = valid;
    return valid;
}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var valid = true;
    for (idx = 0; idx < requiredFields.length; idx++) {
        valid &= validateRequiredField(requiredFields[idx], form);
    }
    return valid;
}

//If the user is above 13 years old 
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//checks whether the field is valid or not and if the field is valid it will return true; otherwise false; 
function validateRequiredField(field, form) {
    var formName = document.forms["signup"];
    var formVariable = formName[field];

    //checks whether the user is old enough
    if (0 == formName[field].value.trim().length) {
        formName[field].className = 'invalid-field form-control';
        return false;
    } else if (field == "birthdate") {
        var newAge = getAge(formName[field].value);
        if (newAge < 13) {
            document.getElementById("birthdateMessage").innerHTML = "13 years old too young do not want";
            formName[field].className = 'invalid-field form-control';
            return false;
        } else {
            document.getElementById("birthdateMessage").innerHTML = "";
            formName[field].className = 'form-control';
            return true;
        }
    }

    //checks if the zip code has 5 digits
    if (field == "zip") {
        var zipRegExp = new RegExp('^\\d{5}$');
        var regResult = zipRegExp.test(formName[field].value);
        if (regResult == false) {
            formName[field].className = 'invalid-field form-control';
            return false;
        } else {
            formName[field].className = 'form-control';
            return true;
        }
    }

    //checks a user input something
    if (field == "city") {
        formName[field].className = 'form-control';
        return true;
    }

    //checks a user input something
    if (field == "firstName") {
        formName[field].className = 'form-control';
        return true;
    }

    //checks a user input something
    if (field == "lastName") {
        formName[field].className = 'form-control';
        return true;
    }

    //checks a user input something
    if (field == "address1") {
        formName[field].className = 'form-control';
        return true;
    }

    //checks a user input something
    if (field == "state") {
        formName[field].className = 'form-control';
        return true;
    }
}


document.addEventListener('DOMContentLoaded', onReady);