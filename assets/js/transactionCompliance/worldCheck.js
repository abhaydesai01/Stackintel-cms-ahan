function generateWorldCheckAccordianData(slNo, eachObject, worldCheckServiceId, worldCheckStatus, worldCheckReferenceNumber) {
	
	var worldCheckAccordianData = "";
	worldCheckAccordianData += '<h3 class="accordian blacklist" onclick="toggleWorldChecklist(\'worldCheckData_' + slNo + '\', this, \'' + eachObject.complianceId + '\', \'' + eachObject.customerHashId + '\', \'' + worldCheckServiceId + '\', \'' + worldCheckReferenceNumber + '\')">';
	worldCheckAccordianData += '<span>WorldCheck<i class="fas fa-chevron-circle-up accordian-arrow"></i></span>';
	worldCheckAccordianData += '</h3><br />';
	worldCheckAccordianData += '<div class="content" style="display:none">';
	worldCheckAccordianData += '<div class="trulio_wrapper">';
	worldCheckAccordianData += '<table class="table compl">';
	worldCheckAccordianData += '<thead>';
	worldCheckAccordianData += '<tr>';
	worldCheckAccordianData += '<th><h4>Field</h4></th>';
	worldCheckAccordianData += '<th><h4>Value</h4></th>';
	
	if (worldCheckStatus != null && worldCheckStatus !== "" && worldCheckStatus !== undefined && ((worldCheckStatus.toLowerCase()) === "action_required")) {
		worldCheckAccordianData += '<th><button class="btn btn-danger btn-sm px-5" onclick="openStatusUpdateModal(\'' + eachObject.complianceId + '\', \'' + worldCheckServiceId + '\',\'' + worldCheckReferenceNumber + '\', \'worldCheck\');">Update Status</button></th>';
	}
	
	//var reInitiateScreeningBtn = "";
	
	//if (worldCheckStatus != null && worldCheckStatus !== "" && worldCheckStatus !== undefined && (worldCheckStatus.toLowerCase()) !== "closed") {
	
	//	reInitiateScreeningBtn += '<button id = "reinitiateBlacklistBtn" class="btn btn-success btn-sm px-5 ripple"';
	//	reInitiateScreeningBtn += ' onclick = "reInitiateScreening(\'' + eachObject.clientCode + '\', \'' + eachObject.customerHashId + '\', \'' + eachObject.complianceId + '\', \'' + worldCheckServiceId + '\', \'' + worldCheckReferenceNumber + '\', \'reinitiateBlacklistBtn\', \'Reinitiate BlackList\', \'Blacklist reinitiated successfully!\');" >';
	//	reInitiateScreeningBtn += 'Reinitiate Blacklist';
	//	reInitiateScreeningBtn += '</button>';
	//}
	
	//worldCheckAccordianData += '<th>' + reInitiateScreeningBtn + '</th>';
	
	//var viewHistoryBtn = '<button id = "viewBlackListHistoryBtn" class="btn btn-success btn-sm px-5 ripple"';
	//viewHistoryBtn += ' onclick = "openViewHistoryModal(event, \'' + eachObject.clientCode + '\', \'' + eachObject.customerHashId + '\', \'' + worldCheckServiceId + '\',\'Blacklist History\');" >';
	//viewHistoryBtn += 'View History';
	//viewHistoryBtn += '</button>';
	
	//worldCheckAccordianData += '<th>' + viewHistoryBtn + '</th>';
	
	worldCheckAccordianData += '</tr>';
	worldCheckAccordianData += '</thead>';
	worldCheckAccordianData += '<tbody id=\'worldCheckData_' + slNo + '\'></tbody></div>';
	worldCheckAccordianData += '</table></div></div>';
	
	return worldCheckAccordianData;
}

function toggleWorldChecklist(resultantElementId, element, complianceId, customerHashId, serviceId, referenceNumber) {
	
	
	$(element).nextAll(".content:first").slideToggle("fast");
	$(element).find(".accordian-arrow").toggleClass("less");
	if ($(element).find(".accordian-arrow").hasClass("less") && $(element).hasClass("blacklist")) {
		getWorldCheckData(resultantElementId, complianceId, serviceId, referenceNumber);
	}
}

function getWorldCheckData(resultantElementId, complianceId, ServiceId, referenceNumber) {
	
	var url = $("#transactionComplianceworldCheckUrl").val() + complianceId + "/" + ServiceId + "/" + referenceNumber + "/worldCheckServiceDetails";
	var loadingIcon = "<div style='text-align:center;'><img style='max-width:50px;'src='" + $("#contextPath").val() + "/static/img/loading.gif'></img></div>";
	$("#" + resultantElementId).html(loadingIcon);
	$.ajax({
		url: url,
		type: "GET",
		async: true,
		beforeSend: function (xhr) {
			setAuthTokenInReqHeader(xhr);
			setCsrfTokenInRequestHeader(xhr);
		},
		success: function (result, status, xhr) {
			var contextPath = $("#contextPath").val();
			setAndReturnNewAuthToken(xhr, contextPath);
			setAndReturnNewCsrfToken(xhr, contextPath);
			sanitize(unSanitize(result));
			
			var bodyObject = result.body;
			var keysArr = Object.keys(bodyObject);
			var index = 0;
			var startRecord = 0;
			var count = 0;
			var recordNumberToDisplay = 0;
			var bodyData = "";
			var nonHyperLinks = "";
			
			for (var i = 0; i < keysArr.length; i++) {
				var headerKey = keysArr[i];
				
				if (headerKey.toLowerCase() === "creditorinfo" || headerKey.toLowerCase() === "debitorinfo") {
					nonHyperLinks += "<tr>";
					nonHyperLinks += "<td><hr style = 'border-top: 1px solid #00000045;' /></td>";
					nonHyperLinks += "<td><hr style = 'border-top: 1px solid #00000045;' /></td>";
					nonHyperLinks += "</tr>";
					nonHyperLinks += "<tr>";
					nonHyperLinks += "<td><b style='font-size:large'>";
					nonHyperLinks += headerKey.toUpperCase();
					nonHyperLinks += "</b></td>";
					nonHyperLinks += "</tr>";
				}
				
				for (let [infokey, eachValue] of Object.entries(bodyObject[keysArr[i]])) {
					
					var splittedKey = infokey.split("\.");
					var keyToDisplay = splittedKey[splittedKey.length - 1];
					
					if (eachValue == null || eachValue === "null" || eachValue === undefined || eachValue === "" || eachValue === {} || eachValue === "{}" || eachValue === [] || eachValue === "[]" || eachValue === "[object Object]") {
						eachValue = "-";
					}
					
					if (keyToDisplay.toLowerCase().includes("href")) {
						var profileRequestType = '&WorldChecktype=TransactionProfile';
						nonHyperLinks += "<tr>";
						nonHyperLinks += "<td><strong>" + keyToDisplay + "</strong></td>";
						var viewProfileDetailsLink = "<a target='_blank' href='" + contextPath + "/individualProfileDetails?url=" + eachValue + profileRequestType + "'>View Profile</a>";
						nonHyperLinks += "<td>" + viewProfileDetailsLink + "</td>";
						nonHyperLinks += "</tr>";
					} else {
						
						nonHyperLinks += "<tr>";
						nonHyperLinks += "<td><strong>" + keyToDisplay + "</strong></td>";
						nonHyperLinks += "<td><strong>" + eachValue + "</strong></td>";
						nonHyperLinks += "</tr>";
					}
					
				}
				
			}
			
			
			bodyData += nonHyperLinks;
			$("#" + resultantElementId).html(bodyData);
		},
		error: function (xhr) {
			var tableData = "<table class='table compl' id='worldCheckTable_0'>";
			/* tableData += "<thead>"
				tableData += "<tr>";
				tableData += "<th><hr style='border:1px solid #00000000;'></th>";
				tableData += "<th><hr style='border:1px solid #00000000;'></th>";
				tableData += "</tr>";
				tableData += "</thead>" */
			tableData += "<tbody>";
			tableData += "<tr>";
			tableData += "<td colspan='2345' style='background-color: #efefef'><h3 class='text-center'>No data found!</h3></td>";
			tableData += "</tr>";
			tableData += "</tbody>";
			tableData += "</table>";
			$("#" + resultantElementId).html(tableData);
		},
		complete: function (xhr, status) {
			var contextPath = $("#contextPath").val();
			setAndReturnNewAuthToken(xhr, contextPath);
			setAndReturnNewCsrfToken(xhr, contextPath);
		}
	});
}

function generateWorldCheckComplianceStatusDropDown() {
	var output = "";
	output += "<option value = ''>Select a status</option>";
	
	for (var i = 0; i < (allComplianceStatus.body).length; i++) {
		var eachStatusValue = (allComplianceStatus.body)[i];
		var valueToDisplay = (eachStatusValue.split("_")).join(" ");
		if ("reject" === eachStatusValue.trim().toLowerCase() || "completed" === eachStatusValue.trim().toLowerCase()) {
			output += "<option value = \"" + sanitize(unSanitize(eachStatusValue)) + "\">" + sanitize(unSanitize(valueToDisplay));
			+"</option>";
		}
	}
	return output;
}

