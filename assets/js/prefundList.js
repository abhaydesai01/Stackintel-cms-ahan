$(document).ready(function () {
	fetchMe(0);
});

function fetchMe(value) {
	var client_code = "";
	var client_details = $("#client_details").val();
	var clientDetailsArray = JSON.parse(window.atob(client_details));
	$(clientDetailsArray).each(function (i, item) {
		client_code = clientDetailsArray[i].clientCode;
	});
	var paging = value;
	var size = '20';
	var order = "DESC";
	var url = $("#prefundListClientUrl").val()+client_code+"/prefundList?order=DESC&page="+paging+"&size=10";
	try {
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: url,
			dataType: 'json',
			timeout: 600000,
			async: false,
			beforeSend: function (xhr) {
				setAuthTokenInReqHeader(xhr);
				setCsrfTokenInRequestHeader(xhr);
			},
			success: function (result, status, xhr) {
				var contextPath = "${pageContext.request.contextPath}";
				setAndReturnNewAuthToken(xhr, contextPath);
				setAndReturnNewCsrfToken(xhr, contextPath);
				sanitize(unSanitize(result));
				
				var trHTML = '';
				if (trHTML === '') {
					var slno = (paging * 10);
					var startno = (paging * 10) + 1;
					$("#datatable-buttons").empty();
					var itemVal = result.prefundList;
					if (itemVal != null && itemVal !== '' && itemVal !== "[]" && itemVal.length > 0) {
						$(itemVal).each(function (i, item) {
							slno = slno + 1;
							trHTML += '<tr class="testingg"><td>' + (slno) + '</td>' + '<td style=\"white-space: nowrap\">' + ((itemVal[i].dateOfTransfer == null) ? "NA" :
								itemVal[i].dateOfTransfer) + '</td>' + '<td style=\"white-space: nowrap\">' + ((itemVal[i].dateOfCreation == null) ? "NA" :
								itemVal[i].dateOfCreation) + '</td>' + '<td style=\"white-space: nowrap\">' + ((itemVal[i].amount == null) ? "NA" :
								itemVal[i].amount) + '</td>' + '<td style=\"white-space: nowrap\">' + ((itemVal[i].clientName == null) ? "NA" :
								itemVal[i].clientName) + '</td>' + '<td style=\"white-space: nowrap\">' + ((itemVal[i].clientCode == null) ? "NA" :
								itemVal[i].clientCode) + '</td>' + '<td style=\"white-space: nowrap\">' + ((itemVal[i].bankReferenceNumber == null) ? "NA" :
								itemVal[i].bankReferenceNumber) + '</td>' + '<td style=\"white-space: nowrap\">' + ((itemVal[i].clientAccountNumber == null) ? "NA" :
								itemVal[i].clientAccountNumber) + '</td>' + '<td style=\"white-space: nowrap\">' + ((itemVal[i].niumAccountNumber == null) ? "NA" :
								itemVal[i].niumAccountNumber) + '</td>' + '<td style=\"white-space: nowrap\">' + ((itemVal[i].comments == null) ? "NA" :
								itemVal[i].comments) + '</td>' + '<td style=\"white-space: nowrap\">' + ((itemVal[i].currencyCode == null) ? "NA" :
								itemVal[i].currencyCode) + '</td>' + '<td style=\"white-space: nowrap\">' + ((itemVal[i].systemReferenceNumber == null) ? "NA" :
								itemVal[i].systemReferenceNumber) + '</td>';
							if (itemVal[i].status === "Approved") {
								trHTML += '<td>' + '<span class="label label-success tstatus">' + itemVal[i].status + '</span>' + '</td>';
							} else if (itemVal[i].status === "Pending") {
								trHTML += '<td>' + '<span class="label label-default tstatus">' + itemVal[i].status + '</span>' + '</td>';
							} else {
								trHTML += '<td>' + ((itemVal[i].status == null) ? "NA" : '<span class="label label-warning tstatus">' + itemVal[i].status + '</span>') + '</td>';
							}
							trHTML += '</tr>';
						});
					} else {
						$("#datatable-buttons").empty();
						trHTML += '<tr class="odd testingg"><td class="dataTables_empty" colspan="15" valign="top">No Transaction Available in table</td></tr>';
					}
					
					$('#datatable-buttons').html(trHTML);
				}
				paginationForPrefundList(result.pagination.totalPages, 1);
				$("#paging_info").html("Showing " + startno + " to " + slno + " of " + result.pagination.totalElements + " entries");
			},
			complete: function (xhr, status) {
				var contextPath = "${pageContext.request.contextPath}";
				setAndReturnNewAuthToken(xhr, contextPath);
				setAndReturnNewCsrfToken(xhr, contextPath);
			}
		});
	} catch (e) {
		e.description;
		$(".se-pre-con").hide();
	}
}

function paginationForPrefundList(totalPages, val) {
	if (val === '0') {
		$('#paginationn').twbsPagination('destroy');
	}
	if (totalPages === 0) {
		totalPages = 1;
	}
	$('#paginationn').twbsPagination({
		totalPages: totalPages,
		visiblePages: 10,
		initiateStartPageClick: false,
		onPageClick: function (event, page) {
			fetchMe(page - 1);
		}
	});
}

 
