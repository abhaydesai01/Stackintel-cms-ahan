function generateRiskServiceAccordianData(slNo, eachObject, riskServiceId, riskStatus, riskRefNo) {
	let riskAccordianData = "";
	
	riskAccordianData += '<h3 class="accordian risk" onclick="toggleRisk(\'riskTbody_' + slNo + '\', this, \'' + eachObject.complianceId + '\', \'' + eachObject.customerHashId + '\', \'' + riskServiceId + '\', \'' + riskRefNo + '\')">';
	riskAccordianData += '<span>Risk Service<i class="fas fa-chevron-circle-up accordian-arrow"></i></span>';
	riskAccordianData += '</h3><br />';
	riskAccordianData += '<div class="content" style="display:none">';
	riskAccordianData += '<div class="trulio_wrapper">';
	riskAccordianData += '<table class="table compl">';
	riskAccordianData += '<thead>';
	riskAccordianData += '<tr>';
	riskAccordianData += '<th><h4>Field</h4></th>';
	riskAccordianData += '<th><h4>Value</h4></th>';
	
	if (riskStatus != null && riskStatus !== "" && riskStatus !== undefined && (riskStatus.toLowerCase()) === "action_required") {
		riskAccordianData += '<th><button class="btn btn-danger btn-sm px-5" onclick="openStatusUpdateModal(\'' + eachObject.complianceId + '\', \'' + riskServiceId + '\',\'' + riskRefNo + '\', \'risk\');">Update Status</button></th>';
	}
	
	/** TODO: (ReInitiate and History Screen not required for this Sprint) Uncomment when its needed
	let reInitiateScreeningBtn = "";
	
    if (riskStatus != null && riskStatus !== "" && riskStatus !== undefined && (riskStatus.toLowerCase()) !== "closed") {
	reInitiateScreeningBtn += '<button id = "reinitiateRiskBtn" class="btn btn-success btn-sm px-5 ripple"';
	reInitiateScreeningBtn += ' onclick = "reInitiateScreening(\'' + eachObject.clientCode + '\', \'' + eachObject.customerHashId + '\', \'' + eachObject.complianceId + '\', \'' + riskServiceId + '\', \'' + riskRefNo + '\', \'reinitiateRiskBtn\', \'Reinitiate Risk\', \'Risk reinitiated successfully!\');" >';
	reInitiateScreeningBtn += 'Reinitiate Risk';
		reInitiateScreeningBtn += '</button>';
	}
	
	riskAccordianData += '<th>' + reInitiateScreeningBtn + '</th>';
	
	let viewHistoryBtn = '<button id = "viewRiskHistoryBtn" class="btn btn-success btn-sm px-5 ripple"';
	viewHistoryBtn += ' onclick = "openViewHistoryModal(event, \'' + eachObject.clientCode + '\', \'' + eachObject.customerHashId + '\', \'' + riskServiceId + '\',\'Risk History\');" >';
	viewHistoryBtn += 'View History';
	viewHistoryBtn += '</button>';
	
	riskAccordianData += '<th>' + viewHistoryBtn + '</th>';
	 **/
	
	riskAccordianData += '</tr>';
	riskAccordianData += '</thead>';
	riskAccordianData += '<tbody id=\'riskTbody_' + slNo + '\'></tbody></div>';
	riskAccordianData += '</table></div></div>';
	
	return riskAccordianData;
}

function toggleRisk(resultantElementId, element, complianceId, customerHashId, serviceId, referenceNumber) {
	$(element).nextAll(".content:first").slideToggle("fast");
	$(element).find(".accordian-arrow").toggleClass("less");
	
	if ($(element).find(".accordian-arrow").hasClass("less") && $(element).hasClass("risk")) {
		return getRiskData(resultantElementId, complianceId, customerHashId, serviceId, referenceNumber);
	}
}

function getRiskData(resultantElementId, complianceId, customerHashId, serviceId, referenceNumber) {
	var contextPath = $("#contextPath").val();
	var url = $("#transactionComplianceRiskServiceDetailUrl").val() + complianceId + "/" + serviceId + "/" + referenceNumber + "/riskServiceDetails";
	var loadingIcon = "<tr><td colspan=100 style='text-align:center;'><img style='max-width:50px;'src='" + contextPath + "/static/img/loading.gif'></img></td></tr>";
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
			setAndReturnNewAuthToken(xhr, contextPath);
			setAndReturnNewCsrfToken(xhr, contextPath);
			sanitize(unSanitize(result));
			
			var keysArray = Object.keys(result);
			var bodyData = "";
			var hyperLink = "";
			var nonHyperLink = "";
			for (var i = 0; i < keysArray.length; i++) {
				var eachKey = keysArray[i];
				var splittedKey = eachKey.split("\.");
				var keyToDisplay = splittedKey[splittedKey.length - 1];
				var eachValue = result[eachKey];
				if (eachValue == null || eachValue === "null" || eachValue === undefined || eachValue === "") {
					eachValue = "-";
				}
				if ((keyToDisplay.toLowerCase().includes("href") || keyToDisplay.toLowerCase().includes("uri") || keyToDisplay.toLowerCase().includes("url")) && eachValue !== "-") {
					if (eachValue.includes("/profile")) {
						const url = $("#contextPath").val() + '/individualProfileDetails?url=' + eachValue;
						var viewProfileDetailsLink = "<a href='#' onclick='window.open(\"" + url + "\");'>" + "View Profile" + "</a>";
						// var viewProfileDetailsLink = "<a target='_blank' href='"+ contextPath + "/individualProfileDetails?url=" + eachValue + "'>View Profile</a>";
						nonHyperLink += "<tr>";
						nonHyperLink += "<td><strong>" + keyToDisplay + "</strong></td>";
						nonHyperLink += "<td>" + viewProfileDetailsLink + "</td>";
						nonHyperLink += "</tr>";
					} else {
						nonHyperLink += "<tr>";
						nonHyperLink += "<td><strong>" + keyToDisplay + "</strong></td>";
						nonHyperLink += "<td><a href='#' onclick='window.open(\"" + eachValue + "\");'>" + eachValue + "</a></td>";
						// nonHyperLink += "<td><a target='_blank' href='" + eachValue + "'>" + eachValue + "</a></td>";
						nonHyperLink += "</tr>";
					}
				} else {
					nonHyperLink += "<tr>";
					nonHyperLink += "<td><strong>" + keyToDisplay + "</strong></td>";
					nonHyperLink += "<td>" + eachValue + "</td>";
					nonHyperLink += "</tr>";
				}
			}
			bodyData += (hyperLink + nonHyperLink);
			$("#" + resultantElementId).html(bodyData);
		},
		error: function (xhr) {
			var bodyData = "<tr>";
			bodyData += "<td colspan='2345'><h2>No Data Found!</h2></td>";
			bodyData += "</tr>";
			$("#" + resultantElementId).html(bodyData);
		},
		complete: function (xhr, status) {
			setAndReturnNewAuthToken(xhr, contextPath);
			setAndReturnNewCsrfToken(xhr, contextPath);
		}
	});
}

function generateRiskStatusDropDown() {
	let output = "";
	output += "<option value = ''>Select a status</option>";
	
	for (let i = 0; i < (allComplianceStatus.body).length; i++) {
		const eachStatusValue = (allComplianceStatus.body)[i];
		const valueToDisplay = (eachStatusValue.split("_")).join(" ");
		if ("reject" === eachStatusValue.trim().toLowerCase() || "completed" === eachStatusValue.trim().toLowerCase()) {
			output += "<option value = \"" + sanitize(unSanitize(eachStatusValue)) + "\">" + sanitize(unSanitize(valueToDisplay)) + "</option>";
		}
	}
	return output;
}