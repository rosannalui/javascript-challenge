"use strict"; 

//    Signup Form Script
//    This script will load the state select list and validate the form before submission



function onReady() {

	//selecting the state drop down from the html 
	var statesSelect = document.getElementsByName("state");
	var ids = 0; 
		for(ids = 0; ids < usStates.length; ids++) {
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

		var noThanks = document.getElementById("cancelButton"); 
		noThanks.addEventListener("click", clickingButton);  
}

//If the user selects the other button, another option will show
function selectOther (occupation) {

	//if user selects other option 
	if(this.value == "other") {
		document.getElementsByName("occupationOther")[0].style.display = "inline";  
	} else {
		document.getElementsByName("occupationOther")[0].style.display = "none"; 
	}
}

//Checks if the really user wants to leave the page
function clickingButton (cancelButton) {
	if(window.confirm("Are you sure? I worked really hard on this website and you just want to leave.")){
				window.location="http://www.google.com";
		} 
}

//Validates the form before it is submitted to the server and stop the submission if it is invalid
function onSubmit(evt) {
	var valid = validateForm(this); 
	console.log("submit work"); 

	   if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }

    evt.returnValue = valid;
    return valid;
}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city','state', 'zip','birthdate'];
    var idx;
    var valid = true; 

    for(idx = 0; idx < requiredFields.length; idx++) {
    	valid &= validateRequiredField(requiredFields[idx],form); 
    } 


    return valid; 

} 
//Lastly, you need to write the code to validate the form before it is submitted to the server, 
//and stop the submission if the form is invalid. You also need to provide adequate feedback 
//to the user about what is invalid so the user can fix the problems.

//The following validation rules should be enforced:

//The following fields are required and must have a value: firstName, lastName, address1, 
//city, state, zip, birthdate. Although the HTML5 required attribute can do some of this checking for you, 
//it does not detect an empty string (all spaces) and does not work in Safari and IE 9 or earlier. 
//Empty strings are not considered valid values, and we really should support these other browsers, 
//so you need to write script to enforce these required fields.

//If the occupation select's value is 'other', the occupationOther field must have a value. 
//Just as with the required fields, empty strings are not considered valid.
//The zip field must be a valid zip code. To keep things simple, we will define a valid zip code as consisting of

// 5 digits (no letters, no symbols, no zip + 4). Real zip codes can get more complicated than this, and they
// should be verified against a web service, but that is for a later challenge!

//The user must be 13 years or older to submit the form, based on the value entered in the birthdate field. 
//You can use the JavaScript Date object to parse the value in that field into a date, and get the respective month,
// day, and year. You can also get the current date by creating a new Date();

//If any of the fields do not contain valid values (including the occupationOther when the value of occupation is set to 
//'other'), you should indicate that these are required by adding a 1 pixel solid red (#FF0000 in hex) border to 
//each missing field. This shows the user which fields are invalid, and the placeholder text should help them 
//realize these fields are required. You can alter the field's borders via your code by either adding a new style 
//class to the className property (and defining a new rule for that class in the css/main.css file), or by altering the
// border styling via the field's style property. Regardless of which option you choose, you should clear the red border 
//on fields that now have a valid value the next time your validation code executes.

function validateRequiredField(field, form) {
    if(0 == this[field].value.trim().length) {
            this[field].className = 'invalid-field form-control'.style.display="inline" ;
            return false; 
    } else {
        this[field].className = 'form-control'; 
        return true; 
        }
    } //validateRequiredField()



document.addEventListener('DOMContentLoaded', onReady);


