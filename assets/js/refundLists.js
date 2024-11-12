/* Universal Spinner with text for Button */
var spinnerUrl = "<i class='fas fa-spinner fa-spin'></i> Please Wait...";

$(document).ready(function () {
	fetchMe(0);
});

function fetchMe(value) {
	var client_code = "all";
	var paging = value;
	var size = 20;
	var order = "DESC";
	var url = $("#refundListSuperAdminUrl").val() + client_code + "/refunds?order=DESC&page="+paging+"&size=20";
	
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: url,
		dataType: 'json',
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
							
						switch (itemVal[i].status) {
							case 'Approved' :
								trHTML += "<td><span class='badge badge-success'>Approved</span></td>";
								break; 	 	
							case 'Pending' :
								trHTML += "<td><span class='badge badge-warning'>Pending</span></td>";
								break;
							case 'Declined' :
								trHTML += "<td><span class='badge badge-danger'>Declined</span></td>";
								break;
							case 'null' :
								trHTML += "<td><span class='badge badge-info'>NA</span></td>";
								break;
							default:
								trHTML += '<td>' + '<span class="badge badge-info tstatus">' + itemVal[i].status + '</span>' + '</td>';
								break;
						}
						
						var approveButton = '<button class="btn btn-xs btn-success btn-block ripple"  id ="approveList_' + slno + '" onclick="approveRefundList(\'approveList_' + slno + '\',\'' + itemVal[i].clientHashId + '\',\'' + itemVal[i].systemReferenceNumber + '\',\'Approved\')">Approve</button>';
						var rejectButton = '<button class="btn btn-xs btn-danger btn-block ripple" id = "rejectList_' + slno + '" onclick="getDeclineComment(\'rejectList_' + slno + '\',\'' + itemVal[i].clientHashId + '\',\'' + itemVal[i].systemReferenceNumber + '\',\'declined\')">Reject</button>';
						
						switch (itemVal[i].status) {
						
							case 'Approved' :
								trHTML += "<td colspan='2'><span class='badge badge-success'>Approved</span></td>";
								break;
							case 'PENDING' :
								trHTML += "<td>" + approveButton + "</td><td>" + rejectButton + "</td>";
								break;
							case 'Declined' :
								trHTML += "<td colspan='2'><span class='badge badge-danger'>Declined</span></td>";
								break;
							default:
								trHTML += '<td colspan=\'2\'>' + '<span class="badge badge-info tstatus">' + itemVal[i].status + '</span>' + '</td>';
								break;
						}
						trHTML +='<td style=\"white-space: nowrap\">' + ((itemVal[i].requesterId == null) ? "NA" : itemVal[i].requesterId) + '</td>' 
							+ '<td style=\"white-space: nowrap\">' + ((itemVal[i].approverId == null) ? "NA" : itemVal[i].approverId) + '</td>' 
							+ '<td style=\"white-space: nowrap\">' + ((itemVal[i].comments == null) ? "NA" : itemVal[i].comments) + '</td>';
						
						trHTML += '</tr>';
					});
				} else {
					$("#datatable-buttons").empty();
					trHTML += '<tr class="odd testingg"><td class="dataTables_empty" colspan="15" valign="top">No Transaction available in table</td></tr>';
				}
				$("#datatable-buttons").html(trHTML);
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
		visiblePages: 10,
		initiateStartPageClick: false,
		onPageClick: function (event, page) {
			fetchMe(page - 1);
		}
	});
}

function closeModal() {
	window.location.reload(true);
}

function approveRefundList(slNo, clientHashId, systemReferenceNumber, status , userComments) {
	if (status == "approved") {
		$("#" + slNo).attr("disabled", true);
		$("#" + slNo).html(spinnerUrl);
	} else {
		$("#" + slNo).attr("disabled", true);
		$("#" + slNo).html(spinnerUrl);
	}
	var url = $("#approveRefundListUrl").val()  + clientHashId + "/" + "updateRefundRequest";
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		url: url,
		dataType: 'json',
		data: JSON.stringify(unSanitize({
			"systemReferenceNumber": $.trim(systemReferenceNumber),
			"status": $.trim(status),
			"userComments" : $.trim(userComments)
		})),
		timeout: 600000,
		async: false,
		beforeSend: function (xhr) {
			setAuthTokenInReqHeader(xhr);
			setCsrfTokenInRequestHeader(xhr);
		},
		success: function (data, status, xhr) {
			var contextPath = "${pageContext.request.contextPath}";
			setAndReturnNewAuthToken(xhr, contextPath);
			setAndReturnNewCsrfToken(xhr, contextPath);
			sanitize(unSanitize(data));
			
			$("#refundCommentModal").modal("hide");
			$("#success_refundNotification").modal('show');
			$(".refunded_body").html(data.message);
		},
		error: function (data) {
			if (data.status === 500) {
				var responseJSON = JSON.parse(data.responseText);
				$("#refundCommentModal").modal("hide");
				$("#error_refundNotification").modal('show');
				$(".refunded_body").html(responseJSON.message);
			} else if (data.status === 400) {
				$("#refundCommentModal").modal("hide");
				$("#error_refundNotification").modal('show');
				$(".refunded_body").html(data.responseText);
			}
		},
		complete: function (xhr, status) {
			var contextPath = "${pageContext.request.contextPath}";
			setAndReturnNewAuthToken(xhr, contextPath);
			setAndReturnNewCsrfToken(xhr, contextPath);
		}
	});
	
}
function getDeclineComment(slNo, clientHashId, systemReferenceNumber, status){
	$("#slNo").val(slNo);
	$("#clientHashId").val(clientHashId);
	$("#systemReferenceNumber").val(systemReferenceNumber);
	$("#status").val(status);
	$("#refundCommentModal").modal("show");
}

function openCommnetModel(){
	var slNo = $("#slNo").val();
	var clientHashId = $("#clientHashId").val();
	var systemReferenceNumber = $("#systemReferenceNumber").val();
	var status = $("#status").val();
	var userComments = $("#userComments").val();
	console.log("Comment" + userComments);
	valid = true;
	if (userComments == null || userComments == "") {
		valid = false;
		$("#userCommentError").html("Enter reason for Rejection");
	}
	if(valid){
		approveRefundList(slNo, clientHashId, systemReferenceNumber, status , userComments);	
	}
}

function closeWaiveCommentModal() {
	$("#refundCommentModal").modal("hide");
} 
