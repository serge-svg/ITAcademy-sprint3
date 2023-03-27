
const wrongValues = [];

// Exercise 6
function validate(event) {
	event.preventDefault();
	console.log('validate()');
	var error = 0;
	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");

	// Validate fields entered by the user: name, phone, password, and email
	if (fName.value == "") {
		wrongValues.push(fName);
		error++;
	}

	if (fEmail.value == "") {
		wrongValues.push(fEmail);
		error++;
	}
	/*
	if (error > 0) {
		alert("Error");
	} else {
		alert("OK");
	}
	*/
	_setBackgroundColorWrong(wrongValues);
}

function _setBackgroundColorWrong(elements){
	console.log('->>> _setBackgroundColorWrong()');
	elements.forEach(element => {
		element.style.backgroundColor = '#f28787';
	});
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

function _isCorrectEmail(value){
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
}

