//This function will only allow alphanumeric characters along with space.
//To invoke this function "this" keyword has to be passed to this function as an argument.
function IsAlphanumericWithSpace(element) {
	var value = element.value + "";
	var finalResult = "";
	for (var i = 0; i < value.length; i++) {
		var eachCharacter = value.charAt(i);
		var eachCharacterCode = value.charCodeAt(i);
		if ((eachCharacterCode >= 48 && eachCharacterCode <= 57) || (eachCharacterCode >= 65 && eachCharacterCode <= 90) || (eachCharacterCode >= 97 && eachCharacterCode <= 122) || eachCharacterCode == 32) {
			
			finalResult += eachCharacter;
		} else {
			finalResult += '';
		}
	}
	$("#" + element.id).val(finalResult);
}

//This function will only allow alphanumeric characters. No spaces allowed
//To invoke this function "this" keyword has to be passed to this function as an argument.
function IsAlphanumericWithoutSpace(element) {
	var value = element.value + "";
	var finalResult = "";
	for (var i = 0; i < value.length; i++) {
		var eachCharacter = value.charAt(i);
		var eachCharacterCode = value.charCodeAt(i);
		if ((eachCharacterCode >= 48 && eachCharacterCode <= 57) || (eachCharacterCode >= 65 && eachCharacterCode <= 90) || (eachCharacterCode >= 97 && eachCharacterCode <= 122)) {
			
			finalResult += eachCharacter;
		} else {
			finalResult += '';
		}
	}
	$("#" + element.id).val(finalResult);
}

//This function will only allow alphabets and space.
//To invoke this function "this" keyword has to be passed to this function as an argument.
function isAlphabetWihSpace(element) {
	var value = element.value + "";
	var finalResult = "";
	for (var i = 0; i < value.length; i++) {
		var eachCharacter = value.charAt(i);
		var eachCharacterCode = value.charCodeAt(i);
		if ((eachCharacterCode >= 65 && eachCharacterCode <= 90) || (eachCharacterCode >= 97 && eachCharacterCode <= 122) || eachCharacterCode === 32) {
			
			finalResult += eachCharacter;
		} else {
			finalResult += '';
		}
	}
	$("#" + element.id).val(finalResult);
}

//This function will validate the type of Image file uploaded.
//Requires "this" keyword, the id of the div in which error msg. will come, id of the submit button as the argument.
function isValidImageType(element, errorDivId, submitButtonId) {
	var value = $("#" + element.id).val() + "";
	if (value != null && value !== '' && value !== "null" && value !== "undefined" && value !== undefined) {
		var extensionArray = value.split("\.");
		var extension = extensionArray[extensionArray.length - 1];
		var eligibleExtensions = [
			"jpg",
			"jpeg",
			"png"
		];
		for (var i = 0; i < eligibleExtensions.length; i++) {
			if (extension.toLowerCase() !== eligibleExtensions[i]) {
				$("#" + errorDivId).html("Only " + eligibleExtensions + " are allowed!");
				/*$("#" + errorDivId).find("h6").css({"color": "red"});*/
				$("#" + submitButtonId).attr("disabled", true);
				$("#" + errorDivId).css({"display": ""});
			} else {
				$("#" + errorDivId).css({"display": "none"});
				$("#" + submitButtonId).attr("disabled", false);
				break;
			}
		}
	} else {
		$("#" + errorDivId).css({"display": "none"});
		$("#" + submitButtonId).attr("disabled", false);
	}
}

//This function will validate xlsx.
//Requires "this" keyword, the id of the div in which error msg. will come, id of the submit button as the argument.
function isValidXlsxFile(element, errorDivId, submitButtonId) {
	var value = $("#" + element.id).val() + "";
	var extensionArray = value.split("\.");
	var extension = extensionArray[extensionArray.length - 1];
	var eligibleExtensions = ["xlsx"];
	for (var i = 0; i < eligibleExtensions.length; i++) {
		if (extension.toLowerCase() !== eligibleExtensions[i]) {
			$("#" + errorDivId).html("Only " + eligibleExtensions + " is allowed!");
			/*$("#" + errorDivId).find("h6").css({"color": "red"});*/
			$("#" + submitButtonId).attr("disabled", true);
			$("#" + errorDivId).css({"display": ""});
		} else {
			$("#" + errorDivId).css({"display": "none"});
			$("#" + submitButtonId).attr("disabled", false);
			break;
		}
	}
}

//This function will validate text files.
//Requires "this" keyword, the id of the div in which error msg. will come, id of the submit button as the argument.
function isValidTextFile(element, errorDivId, submitButtonId) {
	var value = $("#" + element.id).val() + "";
	var extensionArray = value.split("\.");
	var extension = extensionArray[extensionArray.length - 1];
	var eligibleExtensions = ["txt"];
	for (var i = 0; i < eligibleExtensions.length; i++) {
		if (extension.toLowerCase() !== eligibleExtensions[i]) {
			$("#" + errorDivId).html("Only " + eligibleExtensions + " is allowed!");
			/*$("#" + errorDivId).find("h6").css({"color": "red"});*/
			$("#" + submitButtonId).attr("disabled", true);
			$("#" + errorDivId).css({"display": ""});
		} else {
			$("#" + errorDivId).css({"display": "none"});
			$("#" + submitButtonId).attr("disabled", false);
			break;
		}
	}
}

//This function will validate rpt files.
//Requires "this" keyword, the id of the div in which error msg. will come, id of the submit button as the argument.
function isValidRptFile(element, errorDivId, submitButtonId) {
	var value = $("#" + element.id).val() + "";
	var extensionArray = value.split("\.");
	var extension = extensionArray[extensionArray.length - 1];
	var eligibleExtensions = ["rpt"];
	for (var i = 0; i < eligibleExtensions.length; i++) {
		if (extension.toLowerCase() !== eligibleExtensions[i]) {
			$("#" + errorDivId).html("Only " + eligibleExtensions + " is allowed!");
			/*$("#" + errorDivId).find("h6").css({"color": "red"});*/
			$("#" + submitButtonId).attr("disabled", true);
			$("#" + errorDivId).css({"display": ""});
		} else {
			$("#" + errorDivId).css({"display": "none"});
			$("#" + submitButtonId).attr("disabled", false);
			break;
		}
	}
}

//This function will only allow numbers. No spaces allowed
//To invoke this function "this" keyword has to be passed to this function as an argument.
function isNumber(element) {
	var value = element.value + "";
	var finalResult = "";
	for (var i = 0; i < value.length; i++) {
		var eachCharacter = value.charAt(i);
		var eachCharacterCode = value.charCodeAt(i);
		if (eachCharacterCode >= 48 && eachCharacterCode <= 57) {
			finalResult += eachCharacter;
		} else {
			finalResult += '';
		}
	}
	$("#" + element.id).val(finalResult);
}

//This function will only allow numbers with decimals. No spaces allowed
//To invoke this function "this" keyword has to be passed to this function as an argument.
function isValidDecimalNumber(element) {
	var value = element.value + "";
	var finalResult = "";
	var count = 0;
	for (var i = 0; i < value.length; i++) {
		var eachCharacter = value.charAt(i);
		var eachCharacterCode = value.charCodeAt(i);
		if ((eachCharacterCode >= 48 && eachCharacterCode <= 57) || eachCharacterCode === 46) {
			if (eachCharacterCode === 46 && count === 0) {
				count++;
				finalResult += eachCharacter;
			} else if (eachCharacterCode === 46 && count !== 0) {
				finalResult += '';
			} else if (eachCharacterCode !== 46) {
				finalResult += eachCharacter;
			}
		} else {
			finalResult += '';
		}
	}
	$("#" + element.id).val(finalResult);
}

//This function will only allow numbers with decimals and percentage sign. No spaces allowed
//To invoke this function "this" keyword has to be passed to this function as an argument.
function isValidDecimalNumberWithPercentage(element) {
	var value = element.value + "";
	var finalResult = "";
	var count = 0;
	for (var i = 0; i < value.length; i++) {
		var eachCharacter = value.charAt(i);
		var eachCharacterCode = value.charCodeAt(i);
		if ((eachCharacterCode >= 48 && eachCharacterCode <= 57) || eachCharacterCode === 46) {
			if (eachCharacterCode === 46 && count === 0) {
				count++;
				finalResult += eachCharacter;
			} else if (eachCharacterCode === 46 && count !== 0) {
				finalResult += '';
			} else if (eachCharacterCode !== 46) {
				finalResult += eachCharacter;
			}
		} else {
			finalResult += '';
		}
	}
	$("#" + element.id).val(finalResult);
}

//This function will only allow numbers, '+' and '-' . No spaces allowed
//To invoke this function "this" keyword has to be passed to this function as an argument.
function isContactNumber(element) {
	var value = element.value + "";
	var finalResult = "";
	for (var i = 0; i < value.length; i++) {
		var eachCharacter = value.charAt(i);
		var eachCharacterCode = value.charCodeAt(i);
		if ((eachCharacterCode >= 48 && eachCharacterCode <= 57) || (eachCharacterCode === 45 || eachCharacterCode === 43)) {
			finalResult += eachCharacter;
		} else {
			finalResult += '';
		}
	}
	$("#" + element.id).val(finalResult);
}

//This function will allow only numbers upto 2 digit places after decimal !
function validateUpto2DecimalPlaces(element) {
	var finalResult = element.value;
	element.value = (finalResult.indexOf(".") >= 0) ? (finalResult.substr(0, finalResult.indexOf(".")) + finalResult.substr(finalResult.indexOf("."), 3)) : finalResult;
}

//This function will validate the type of Image file uploaded.
//Requires "this" keyword, the id of the div in which error msg. will come, id of the submit button as the argument.
function isValidPdfOrImage(element, errorDivId, submitButtonId) {
	var value = $("#" + element.id).val() + "";
	if (value != null && value !== '' && value !== "null" && value !== "undefined" && value !== undefined) {
		var extensionArray = value.split("\.");
		var extension = extensionArray[extensionArray.length - 1];
		var eligibleExtensions = [
			"jpg",
			"jpeg",
			"png",
			"pdf"
		];
		for (var i = 0; i < eligibleExtensions.length; i++) {
			if (extension.toLowerCase() !== eligibleExtensions[i]) {
				$("#" + errorDivId).html("Only " + eligibleExtensions + " are allowed!");
//				$("#" + errorDivId).find("h6").css({"color": "red"});
				$("#" + submitButtonId).attr("disabled", true);
				$("#" + errorDivId).css({"display": ""});
			} else {
				$("#" + errorDivId).css({"display": "none"});
				$("#" + submitButtonId).attr("disabled", false);
				break;
			}
		}
	} else {
		$("#" + errorDivId).css({"display": "none"});
		$("#" + submitButtonId).attr("disabled", false);
	}
}

//Generates a random UUID.
function generateRandomUuid() {
	return uuidv4();
}

//Will return AES encrypted data(Symmetric Encryption)
function getAesEncryptedData(inputTextToEncrypt, encryptionKey) {
	return (CryptoJS.AES.encrypt(inputTextToEncrypt, encryptionKey)).toString();
}

//Will return RSA encrypted data(Asymmetric Encryption)
function getRsaEncryptedData(inputTextToEncrypt) {
	const encryptionEngine = new JSEncrypt();
	encryptionEngine.setPublicKey("MIIFIjANBgkqhkiG9w0BAQEFAAOCBQ8AMIIFCgKCBQEA0CmZp9kzU1vJ7NnaEiQqcnIKlAmB7mLjn22f5dfbHPzRrT9PPECkyYESwzUfcCWGH6NcTZrPE9r0I8TmgU1NHvACVEQEoSbVx2nrdbpyJ+C/RXoJUv4jDrnB1UsL9lYnFFakapJMr06CzbcDqpjVkReQffV8Sa1xRRbZmbHxS62MPxLFNzKPlL3LjHhA32LzQsl5QqcgDlItuAbURIAlDA6UgzvgGLLyM2sgvnnlFKhGFGfdT/eldnxB35zISt4vpPAaHUOi9CxhkggxpHpzixvhe7XNZJSsL+/1+r7WxmLNCpQEDZ6+bXI0jYwxW6fKV6+sPHtiU8jru8hQBrIwMnGYotGkgRJ4E/mSr+XSiiRhDY2EWF2XqxqeCp01+lDkHJjAPFU4vwG6ANfJQQUEYRi9dkP/iqMx9UnITVFxZaZEF2KVBf8rIVy0catLj+4fgr4wWYhDv7qFnE99sQJgtFPAT4YqDjseG3keJiz5WUMTwhlt0ERXRwVsAI/jmoG1+B5cGgMT3lS8B33ekjw/xT7TfzWMgoMrS8YfAIFlFHvJwaSz8ewFSx2YpX/+oFitoiHtEPq61EKwDH977nUiRfkQvjerkIma/DeErwBLTssIrwdvUsfUF7CSRc0bvfK/Jl7/BGqCOfput9r3IzNpNZwSQA/SZ3xvWGTscV0a3w8UTivSUbkJQdABMRRVuKYCZl6l1/MMeGAfFsqbUHCKT/upkEzdns44WryhTXF4sImH8BHISRk7NE/erZ7sFTcjKeAh0TajGQrbGo6hy0ilRYId2eTt12EPvMiTY3cywHOH6binv37PEr1U6se18kjkjddODbb2zPAoaXrNIqtuB52/dja3lzp3r0Z+iww4wuP4F9HbIZkXax2zzm8uJ6Qw/RDC/6SaeXWtkwPJq1enpCV5/A8qLYp4bRi9LpNzlqeKcRCoqK1aEADr9foNinDHLYS5tvAuN35JZ5das5HM9GAdYe3PIuLygpQDgSpVOWvPDd3g2jhiVBmxYdRT8G3bXBsI1bCsgc7Onor5Zyk3VielDYPtgutedJj0tnYQ43ODJ0B+cDcpgS+vnUwQ+SBj6CQsF4hNwYQI+74d1I4FUeTmOaFYkOB7HHd6XTzVYnMC9oo831bsr4+c/jvOEABqwiG7cwLxc2u66MN7xkj2iOq1k2EXoWh5rPqH+K8Q4X7ssdVmsNUuXvut6fx9CdHxIFfeK84RtPzf06gaiZQStrjQTK5/lyKHws3H891JIzmBNYX4RBWYiAL6zQT66HHrK855mpsYBDD8XY/4A3KdbTXtyHTkOD41I83x8q/eEhkdBlqdaSuYfdQ8h1vplOFlBSwmHvY238s/eduhXp27hEgUDKFV03zpVSZrM5DO8riCKJhlLTShO7DddFv3FiY/EDAhRMMxH2HDXDQ1L6Exn3Bwc3P5UWZEsgtG6ZEHy6PZ+eZ5DVCRmXXUTSau6y0SIUC7b+p66JQ3zNGINsTqP/G/pt9CxYOH1LKmhvRCHzFfRa67ogIwH95DRlhQHdCcZkQuo3en+te2t58EY83fPsW2gfcQXxSyez8B/CrY6hOq3EiLk5eS91/IC8VR49DlQ94CfZEFtjUqTdKVRuRCEkWCRWn72YmKUehZs2i3uKArKTaPyDbdq3UnpvySBi6w0H5rZ1ogHRb4ncrHEBX49BPy83rIMLT/pcdOjFAWCN0CAwEAAQ==");
	return encryptionEngine.encrypt(inputTextToEncrypt);
}

function setCsrfTokenInRequestHeader(xhr) {
	const csrfToken = window.localStorage.getItem('csrf_token');
	xhr.setRequestHeader("csrf_token", csrfToken);
}

function setAndReturnNewCsrfToken(xhr, contextPath) {
	const newCsrfToken = xhr.getResponseHeader("csrf_token");
	if (newCsrfToken != null && newCsrfToken !== "") {
		window.localStorage.setItem('csrf_token', newCsrfToken);
	}
	return newCsrfToken;
}

function setAuthTokenInReqHeader(xhr) {
	const authorizationToken = window.localStorage.getItem('authorization');
	xhr.setRequestHeader("Authorization", authorizationToken);
	xhr.setRequestHeader("X_CLIENT_ID", "Cards-UI");
}

function setAndReturnNewAuthToken(xhr, contextPath) {
	const newAuthorizationToken = xhr.getResponseHeader("Authorization");
	if (newAuthorizationToken != null && newAuthorizationToken !== "") {
		window.localStorage.setItem('authorization', newAuthorizationToken);
	}
	return newAuthorizationToken;
}

function getAuthToken() {
	return window.localStorage.getItem('authorization');
}

function isValidNonEmptyJsArray(input) {
	if (isEmptyInput(input)) {
		return false;
	}
	if (Array.isArray(input) && input.length > 0) {
		return true;
	}
	return false;
}

function isValidNonEmptyJsObject(input) {
	if (isEmptyInput(input)) {
		return false;
	}
	if (Array.isArray(input)) {
		return false;
	}
	if ((typeof input).toLowerCase() === "object") {
		const keysArray = Object.keys(input);
		if (keysArray.length > 0) {
			return true;
		}
	}
	return false;
}

function generateAllClientDD(url, isMultiple, elementId, valueToBeSelected) {
	var optionTag = "<option value = ''></option>";
	
	var placeholder = "";
	
	if (isMultiple) {
		placeholder += "Select one or multiple clients";
	} else {
		placeholder += "Select a client";
	}
	
	$.ajax({
		url: url,
		type: "GET",
		async: false,
		beforeSend: function (xhr) {
			setAuthTokenInReqHeader(xhr);
			setCsrfTokenInRequestHeader(xhr);
		},
		success: function (result, status, xhr) {
			var contextPath = "${pageContext.request.contextPath}";
			setAndReturnNewAuthToken(xhr, contextPath);
			setAndReturnNewCsrfToken(xhr, contextPath);
			result = sanitize(unSanitize(result));
			
			if (result === undefined || result == null || result === '' || isValidNonEmptyJsArray(result) === false) {
				return;
			}
			var hasToBeSelected = false;
			for (var i = 0; i < (result.length); i++) {
				var eachOption = result[i];
				
				if (valueToBeSelected !== undefined && valueToBeSelected != null && valueToBeSelected !== "") {
					var SplittedvalueToBeSelected = (window.atob(valueToBeSelected)).split(",");
					
					if (SplittedvalueToBeSelected !== undefined && SplittedvalueToBeSelected != null && SplittedvalueToBeSelected !== "" && isValidNonEmptyJsArray(SplittedvalueToBeSelected)) {
						for (var j = 0; j < SplittedvalueToBeSelected.length; j++) {
							if (SplittedvalueToBeSelected[j] === eachOption.clientCode) {
								hasToBeSelected = true;
								break;
							}
						}
						if (hasToBeSelected) {
							optionTag += "<option value = " + eachOption.clientCode + " selected>" + eachOption.name + " (" + eachOption.clientCode + ")" + "</option>";
							hasToBeSelected = false;
						} else {
							optionTag += "<option value = " + eachOption.clientCode + ">" + eachOption.name + " (" + eachOption.clientCode + ")" + "</option>";
						}
					} else {
						optionTag += "<option value = " + eachOption.clientCode + ">" + eachOption.name + " (" + eachOption.clientCode + ")" + "</option>";
					}
				} else {
					optionTag += "<option value = " + eachOption.clientCode + ">" + eachOption.name + " (" + eachOption.clientCode + ")" + "</option>";
				}
			}
		},
		error: function (xhr, status) {
			placeholder = "Error occurred while fetching client";
		},
		complete: function (xhr, status) {
			var contextPath = "${pageContext.request.contextPath}";
			setAndReturnNewAuthToken(xhr, contextPath);
			setAndReturnNewCsrfToken(xhr, contextPath);
			
			$("#" + elementId).html(optionTag);
			
			$("#" + elementId).select2({
				placeholder: placeholder,
				allowClear: false,
				dropdownAutoWidth: false,
				width: '100%',
				dropdownCss: {'width': 'inherit'}
			});
		}
	});
}

function generateRestrictedClientDD(clientDetails, isMultiple, elementId, valueToBeSelected) {
	var optionTag = "";
	var placeholder = "";
	
	if (isMultiple) {
		placeholder += "Select one or multiple clients";
	} else {
		placeholder += "Select a client";
	}
	
	var clientDetailsArray = sanitize(unSanitize(JSON.parse(window.atob(clientDetails))));
	var hasToBeSelected = false;
	
	for (var i = 0; i < clientDetailsArray.length; i++) {
		var eachClientDetailObject = clientDetailsArray[i];
		
		if (valueToBeSelected !== undefined && valueToBeSelected != null && valueToBeSelected !== "") {
			var SplittedvalueToBeSelected = (window.atob(valueToBeSelected)).split(",");
			
			if (SplittedvalueToBeSelected !== undefined && SplittedvalueToBeSelected != null && SplittedvalueToBeSelected !== "" && isValidNonEmptyJsArray(SplittedvalueToBeSelected)) {
				for (var j = 0; j < SplittedvalueToBeSelected.length; j++) {
					if (SplittedvalueToBeSelected[j] === eachClientDetailObject.clientCode) {
						hasToBeSelected = true;
						break;
					}
				}
				if (hasToBeSelected) {
					optionTag += "<option value = " + eachClientDetailObject.clientCode + " selected>" + eachClientDetailObject.clientName + " (" + eachClientDetailObject.clientCode + ")" + "</option>";
					hasToBeSelected = false;
				} else {
					optionTag += "<option value = " + eachClientDetailObject.clientCode + ">" + eachClientDetailObject.clientName + " (" + eachClientDetailObject.clientCode + ")" + "</option>";
				}
			} else {
				optionTag += "<option value = " + eachClientDetailObject.clientCode + ">" + eachClientDetailObject.clientName + " (" + eachClientDetailObject.clientCode + ")" + "</option>";
			}
		} else {
			optionTag += "<option value = " + eachClientDetailObject.clientCode + ">" + eachClientDetailObject.clientName + " (" + eachClientDetailObject.clientCode + ")" + "</option>";
		}
	}
	
	$("#" + elementId).html(optionTag);
	
	$("#" + elementId).select2({
		placeholder: placeholder,
		allowClear: false,
		dropdownAutoWidth: false,
		width: '100%',
		dropdownCss: {'width': 'inherit'}
	});
}

function generateClientDropdown(url, isMultiple, elementId, valueToBeSelected) {
	url = $("#clientDropDownUrl").val();
	var clientDetails = $("#clientDetails").val();
	var decodedClientDetails = window.atob(clientDetails);
	if (decodedClientDetails === undefined || decodedClientDetails == null || decodedClientDetails === "" || decodedClientDetails === "[]") {
		generateAllClientDD(url, isMultiple, elementId, valueToBeSelected);
	} else {
		generateRestrictedClientDD(clientDetails, isMultiple, elementId, valueToBeSelected);
	}
}

function isBlankInput(input) {
	return input === undefined || input == null || ((String(input)).trim()) === "";
}

function isEmptyInput(input) {
	return input === undefined || input === null || input === "";
}

// For this f(n). to work correctly, the input must be either String or a valid javascript object or an array.
function sanitize(unsanitizedInput) {
	if (isEmptyInput(unsanitizedInput)) {
		return "";
	}
	
	if ((typeof unsanitizedInput).toLowerCase() === "string") {
		return sanitizeStringInput(unsanitizedInput);
	}
	
	if (Array.isArray(unsanitizedInput)) {
		return sanitizeArrayInput(unsanitizedInput);
	}
	
	if ((typeof unsanitizedInput).toLowerCase() === "object" && Array.isArray(unsanitizedInput) === false) {
		return sanitizeObjectInput(unsanitizedInput);
	}
	
	return unsanitizedInput;
}

function sanitizeStringInput(inputStr) {
	return escapeContent(inputStr);
}

function sanitizeArrayInput(inputArr) {
	if (inputArr.length <= 0) {
		return [];
	}
	
	for (let i = 0; i < inputArr.length; i++) {
		let eachArrElement = inputArr[i];
		
		if (isEmptyInput(eachArrElement)) {
			inputArr[i] = "";
			continue;
		}
		
		if ((typeof eachArrElement).toLowerCase() === "string") {
			inputArr[i] = sanitizeStringInput(eachArrElement);
			continue;
		}
		
		if (Array.isArray(eachArrElement)) {
			inputArr[i] = sanitizeArrayInput(eachArrElement);
			continue;
		}
		
		if ((typeof eachArrElement).toLowerCase() === "object" && Array.isArray(eachArrElement) === false) {
			inputArr[i] = sanitizeObjectInput(eachArrElement);
		}
	}
	return inputArr;
}

function sanitizeObjectInput(inputObj) {
	var keysArray = Object.keys(inputObj);
	
	if (keysArray.length <= 0) {
		return {};
	}
	
	for (var i = 0; i < keysArray.length; i++) {
		var eachKey = keysArray[i];
		var eachValue = inputObj[eachKey];
		
		if (isEmptyInput(eachValue)) {
			inputObj[eachKey] = "";
			continue;
		}
		
		if ((typeof eachValue).toLowerCase() === "string") {
			inputObj[eachKey] = sanitizeStringInput(eachValue);
			continue;
		}
		
		if (Array.isArray(eachValue)) {
			inputObj[eachKey] = sanitizeArrayInput(eachValue);
			continue;
		}
		
		if ((typeof eachValue).toLowerCase() === "object" && Array.isArray(eachValue) === false) {
			inputObj[eachKey] = sanitizeObjectInput(eachValue);
		}
	}
	return inputObj;
}

//For this f(n). to work correctly, the input must be either String or a valid javascript object or an array.
function unSanitize(sanitizedInput) {
	if (isEmptyInput(sanitizedInput)) {
		return null;
	}
	
	if ((typeof sanitizedInput).toLowerCase() === "string") {
		return unsanitizeStringInput(sanitizedInput);
	}
	
	if (Array.isArray(sanitizedInput)) {
		return unsanitizeArrayInput(sanitizedInput);
	}
	
	if ((typeof sanitizedInput).toLowerCase() === "object" && Array.isArray(sanitizedInput) === false) {
		return unsanitizeObjectInput(sanitizedInput);
	}
	return sanitizedInput;
}

function unsanitizeStringInput(inputStr) {
	if (isEmptyInput(inputStr)) {
		return null;
	}
	return unescapeContent(inputStr);
}

function unsanitizeArrayInput(inputArr) {
	if (inputArr.length <= 0) {
		return [];
	}
	
	for (var i = 0; i < inputArr.length; i++) {
		var eachArrElement = inputArr[i];
		
		if (isEmptyInput(eachArrElement)) {
			inputArr[i] = null;
			continue;
		}
		
		if ((typeof eachArrElement).toLowerCase() === "string") {
			inputArr[i] = unsanitizeStringInput(eachArrElement);
			continue;
		}
		
		if (Array.isArray(eachArrElement)) {
			inputArr[i] = unsanitizeArrayInput(eachArrElement);
			continue;
		}
		
		if ((typeof eachArrElement).toLowerCase() === "object" && Array.isArray(eachArrElement) === false) {
			inputArr[i] = unsanitizeObjectInput(eachArrElement);
		}
	}
	return inputArr;
}

function unsanitizeObjectInput(inputObj) {
	let keysArray = Object.keys(inputObj);
	
	if (keysArray.length <= 0) {
		return {};
	}
	for (var i = 0; i < keysArray.length; i++) {
		var eachKey = keysArray[i];
		var eachValue = inputObj[eachKey];
		
		if (isEmptyInput(eachValue)) {
			inputObj[eachKey] = null;
			continue;
		}
		if ((typeof eachValue).toLowerCase() === "string") {
			inputObj[eachKey] = unsanitizeStringInput(eachValue);
			continue;
		}
		if (Array.isArray(eachValue)) {
			inputObj[eachKey] = unsanitizeArrayInput(eachValue);
			continue;
		}
		if ((typeof eachValue).toLowerCase() === "object" && Array.isArray(eachValue) === false) {
			inputObj[eachKey] = unsanitizeObjectInput(eachValue);
		}
	}
	return inputObj;
}

//sanitizes the input to prevent XSS attack. Here the encoding is done using he.js(html encoder)file.
function escapeContent(unsafeInput) {
	if (isEmptyInput(unsafeInput)) {
		return "";
	}
	return he.encode(String(unsafeInput));
}

//Here the decoding is done using he.js(html encoder)file.
function unescapeContent(escapedInput) {
	if (isEmptyInput(escapedInput)) {
		return "";
	}
	return he.decode(String(escapedInput));
}