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
	var url = $("#refundListClientUrl").val() + client_code + "/refunds?order=DESC&page="+paging+"&size=20";
	/*console.log("url for refund" + url);*/
	try {
		$.ajax({
			type: "GET",
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
					var slno = (paging * 20);
					var startno = (paging * 20) + 1;
					$("#datatable-buttons").empty();
					var itemVal = result.refundList;
					if (itemVal != null && itemVal !== '' && itemVal !== "[]" && itemVal.length > 0) {
						$(itemVal).each(function (i, item) {
							slno = slno + 1;
							trHTML += '<tr class="testingg"><td>' + (slno) + '</td>' + '<td style=\"white-space: nowrap\">' + ((itemVal[i].dateOfCreation == null) ? "NA" :
								itemVal[i].dateOfCreation) + '</td>' 
								+ '<td style=\"white-space: nowrap\">' + ((itemVal[i].currencyCode == null) ? "NA" : itemVal[i].currencyCode) + '</td>' 
								+ '<td style=\"white-space: nowrap\">' + ((itemVal[i].amount == null) ? "NA" : itemVal[i].amount) + '</td>' 
								+ '<td style=\"white-space: nowrap\">' + ((itemVal[i].clientHashId == null) ? "NA" : itemVal[i].clientHashId) + '</td>' 
								+ '<td style=\"white-space: nowrap\">' + ((itemVal[i].clientAccountNumber == null) ? "NA" : itemVal[i].clientAccountNumber) + '</td>'
								+ '<td style=\"white-space: nowrap\">' + ((itemVal[i].clientAccountName == null) ? "NA" : itemVal[i].clientAccountName) + '</td>'
								+ '<td style=\"white-space: nowrap\">' + ((itemVal[i].clientBankName == null) ? "NA" : itemVal[i].clientBankName) + '</td>';
							if (itemVal[i].status === "Approved") {
								trHTML += '<td>' + '<span class="label label-success tstatus">' + itemVal[i].status + '</span>' + '</td>';
							} else if (itemVal[i].status === "Pending") {
								trHTML += '<td>' + '<span class="label label-default tstatus">' + itemVal[i].status + '</span>' + '</td>';
							} else {
								trHTML += '<td>' + ((itemVal[i].status == null) ? "NA" : '<span class="label label-warning tstatus">' + itemVal[i].status + '</span>') + '</td>';
							}
							
							trHTML +='<td style=\"white-space: nowrap\">' + ((itemVal[i].requesterId == null) ? "NA" : itemVal[i].requesterId) + '</td>' 
							+ '<td style=\"white-space: nowrap\">' + ((itemVal[i].approverId == null) ? "NA" : itemVal[i].approverId) + '</td>' 
							+ '<td style=\"white-space: nowrap\">' + ((itemVal[i].comments == null) ? "NA" : itemVal[i].comments) + '</td>';
							
							trHTML += '</tr>';
						});
					} else {
						$("#datatable-buttons").empty();
						trHTML += '<tr class="odd testingg"><td class="dataTables_empty" colspan="15" valign="top">No Transaction Available in table</td></tr>';
					}
					
					$('#datatable-buttons').html(trHTML);
				}
				paginationForRefundList(result.pagination.totalPages, 1);
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

function paginationForRefundList(totalPages, val) {
	if (val === '0') {
		$('#paginationn').twbsPagination('destroy');
	}
	if (totalPages === 0) {
		totalPages = 1;
	}
	$('#paginationn').twbsPagination({
		totalPages: totalPages,
		visiblePages: 20,
		initiateStartPageClick: false,
		onPageClick: function (event, page) {
			fetchMe(page - 1);
		}
	});
}

 
