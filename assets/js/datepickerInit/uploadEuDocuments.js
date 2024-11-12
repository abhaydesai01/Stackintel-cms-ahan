var now = new Date();

//	EU expiry dates
var tomorrowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
$('input[name="euPassportExpiryDate"]').datepicker({
	format: 'yyyy-mm-dd',
	startDate: tomorrowDate,
	todayHighlight: false
});

$('input[name="nationalIdExpiryDate"]').datepicker({
	format: 'yyyy-mm-dd',
	startDate: tomorrowDate,
	todayHighlight: false
});

//	Bill generation dates
var genStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 90);
var genEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
$('input[name="euStatementGeneratedOn"]').datepicker({
	format: 'yyyy-mm-dd',
	startDate: genStartDate,
	endDate: genEndDate,
	todayHighlight: true
});

$('input[name="euUtilityBillGeneratedOn"]').datepicker({
	format: 'yyyy-mm-dd',
	startDate: genStartDate,
	endDate: genEndDate,
	todayHighlight: true
});