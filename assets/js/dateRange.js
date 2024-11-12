$(function () {
	
	$('input[name="dateRange"]')
		.daterangepicker({
			autoUpdateInput: false,
			locale: {
				cancelLabel: 'Clear'
			},
			ranges: {
				'Today': [
					moment(),
					moment()
				],
				'Yesterday': [
					moment().subtract(1, 'days'),
					moment().subtract(1, 'days')
				],
				'Last 7 Days': [
					moment().subtract(6, 'days'),
					moment()
				],
				'Last 30 Days': [
					moment().subtract(29, 'days'),
					moment()
				],
				'This Month': [
					moment().startOf('month'),
					moment().endOf('month')
				],
				'Last Month': [
					moment().subtract(1, 'month').startOf('month'),
					moment().subtract(1, 'month')
						.endOf('month')
				]
			}
		});
	
	$('input[name="dateRange"]').on('apply.daterangepicker', function (ev, picker) {
		$(this).val(picker.startDate.format('MMMM D, YYYY') + ' - ' + picker.endDate.format('MMMM D, YYYY'));
	});
	
	$('input[name="dateRange"]').on('cancel.daterangepicker', function (ev, picker) {
		$(this).val('');
	});
});