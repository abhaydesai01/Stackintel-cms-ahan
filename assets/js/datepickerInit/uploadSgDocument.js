var now = new Date();

//	Sg expiry date
var tomorrowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
$('input[name="expiryDateSg"]').datepicker({
	format: 'yyyy-mm-dd',
	startDate: tomorrowDate,
	todayHighlight: false
});

//Passport expiry date
var tomorrowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
$('input[name="passportExpiry"]').datepicker({
	format: 'yyyy-mm-dd',
	startDate: tomorrowDate,
	todayHighlight: false
});

//Govt. letter issuance date
var todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
$('input[name="govtLetterIssuanceDate"]').datepicker({
	format: 'yyyy-mm-dd',
	endDate: todayDate,
	todayHighlight: true
});

//Bank statement gen. date
var todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
$('input[name="bankStmntGenerationDate"]').datepicker({
	format: 'yyyy-mm-dd',
	endDate: todayDate,
	todayHighlight: true
});

//Utility bill gen. date
var todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
$('input[name="utilityBillGeneratedDate"]').datepicker({
	format: 'yyyy-mm-dd',
	endDate: todayDate,
	todayHighlight: true
});