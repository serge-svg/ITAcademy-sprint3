let error = false;

// Exercise 6
function validate(event) {
	event.preventDefault();
	_resetValidations();

	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");
	var fAddress = document.getElementById("fAddress");
	var fLastN = document.getElementById("fLastN");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");
	var errorAddress = document.getElementById("errorAddress");
	var errorLastN = document.getElementById("errorLastN");
	var errorPassword = document.getElementById("errorPassword");
	var errorPhone = document.getElementById("errorPhone");

	_validateEmptyAndMinimumOf3length();
	_validateNameAndLastName();
	_validatePhoneNumber();
	_validatePassword();
	_validateEmail();
	
	if (!error) {
		alert("Data Saved");
		location.reload(); 		
	}
}

function _resetValidations() {
	let formInputs = document.querySelectorAll("form input");
	formInputs.forEach(input => {
		input.classList.remove("is-invalid");
		input.nextElementSibling.innerHTML = "This field is required and must have, at least, 3 characters";
	});
}

function _validateEmptyAndMinimumOf3length(){	
	let formInputs = document.querySelectorAll("form input");
	formInputs.forEach(input => {
		if (input.value === "" || input.value.length < 3) {
			input.classList.add("is-invalid");
			error = true;
		}
	});
}

function _validateNameAndLastName(){	
	if (!fName.classList.contains('is-invalid') && !_hasOnlyLetters(fName.value)) {
		errorName.innerHTML ='Only letter are allowed'
		fName.classList.add("is-invalid");
		error = true;		
	}

	if (!fLastN.classList.contains('is-invalid') && !_hasOnlyLetters(fLastN.value)) {
		errorLastN.innerHTML ='Only letter are allowed'
		fLastN.classList.add("is-invalid");
		error = true;		
	}	
}

function _validatePhoneNumber(){	
	if (!fPhone.classList.contains('is-invalid') && !_hasOnlyNumbers(fPhone.value)) {
		errorPhone.innerHTML ='Only numbers are allowed'
		fPhone.classList.add("is-invalid");
		error = true;		
	}
}

function _validatePassword(){	
	if (!fPassword.classList.contains('is-invalid') && !_hasNumbersAndLetters(fPassword.value)) {
		errorPassword.innerHTML ='It should contain letters and numbers'
		fPassword.classList.add("is-invalid");
		error = true;		
	}
}

function _validateEmail(){	
	if (!fEmail.classList.contains('is-invalid') && !_isValidEmail(fEmail.value)) {
		errorEmail.innerHTML ='It is not a valid format email'
		fEmail.classList.add("is-invalid");
		error = true;		
	}
}

function _hasOnlyLetters(value){
	return /^[A-Za-z\s]*$/.test(value);;
}

function _hasOnlyNumbers(value){
	return /^[\d]*$/.test(value);;
}

function _hasNumbersAndLetters(value){
	return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value);
}

function _isValidEmail(value){
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
}
