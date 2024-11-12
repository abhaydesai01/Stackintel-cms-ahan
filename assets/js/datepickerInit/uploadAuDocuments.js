var now = new Date();

//	Au licence expiry date
var tomorrowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
$('input[name="auLicenceExpiryDate"]').datepicker({
	format: 'yyyy-mm-dd',
	startDate: tomorrowDate,
	todayHighlight: false
});

//	Passport expiry date
var expStartDate = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate() + 1);
$('input[name="auPassportExpiryDate"]').datepicker({
	format: 'yyyy-mm-dd',
	startDate: expStartDate,
	todayHighlight: false
});

//	Bank statement gen. date
var genStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 90);
var genEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
$('input[name="auStatementGeneratedOn"]').datepicker({
	format: 'yyyy-mm-dd',
	startDate: genStartDate,
	endDate: genEndDate,
	todayHighlight: true
});

//	Utility bill gen. date
var genStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 90);
var genEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
$('input[name="auUtilityBillGeneratedOn"]').datepicker({
	format: 'yyyy-mm-dd',
	startDate: genStartDate,
	endDate: genEndDate,
	todayHighlight: true
});