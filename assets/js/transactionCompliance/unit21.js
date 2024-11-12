function generateUnit21AccordianData(slNo, eachObject, unit21ServiceId, unit21Status, unit21RefNo) {
	let unit21AccordianData = "";
	
	unit21AccordianData += '<h3 class="accordian unit21" onclick="toggleUnit21(\'unit21Tbody_' + slNo + '\', this, \'' + eachObject.complianceId + '\', \'' + eachObject.customerHashId + '\', \'' + unit21ServiceId + '\', \'' + unit21RefNo + '\')">';
	unit21AccordianData += '<span>Unit21 Service<i class="fas fa-chevron-circle-up accordian-arrow"></i></span>';
	unit21AccordianData += '</h3><br />';
	unit21AccordianData += '<div class="content" style="display:none">';
	unit21AccordianData += '<div class="trulio_wrapper">';
	unit21AccordianData += '<table class="table compl">';
	unit21AccordianData += '<thead>';
	unit21AccordianData += '<tr>';
	unit21AccordianData += '<th><h4>Field</h4></th>';
	unit21AccordianData += '<th><h4>Value</h4></th>';
	
	if (unit21Status != null && unit21Status !== "" && unit21Status !== undefined && (unit21Status.toLowerCase()) === "action_required") {
		unit21AccordianData += '<th><button class="btn btn-danger btn-sm px-5" onclick="openStatusUpdateModal(\'' + eachObject.complianceId + '\', \'' + unit21ServiceId + '\',\'' + unit21RefNo + '\', \'unit21\');">Update Status</button></th>';
	}
	
	// let reInitiateScreeningBtn = "";
	
	// if (unit21Status != null && unit21Status !== "" && unit21Status !== undefined && (unit21Status.toLowerCase()) !== "closed") {
	// 	reInitiateScreeningBtn += '<button id = "reinitiateUnit21Btn" class="btn btn-success btn-sm px-5 ripple"';
	// 	reInitiateScreeningBtn += ' onclick = "reInitiateScreening(\'' + eachObject.clientCode + '\', \'' + eachObject.customerHashId + '\', \'' + eachObject.complianceId + '\', \'' + unit21ServiceId + '\', \'' + unit21RefNo + '\', \'reinitiateUnit21Btn\', \'Reinitiate Unit21\', \'Unit21 reinitiated successfully!\');" >';
	// 	reInitiateScreeningBtn += 'Reinitiate Unit21';
	// 	reInitiateScreeningBtn += '</button>';
	// }
	
	// unit21AccordianData += '<th>' + reInitiateScreeningBtn + '</th>';
	
	// let viewHistoryBtn = '<button id = "viewUnit21HistoryBtn" class="btn btn-success btn-sm px-5 ripple"';
	// viewHistoryBtn += ' onclick = "openViewHistoryModal(event, \'' + eachObject.clientCode + '\', \'' + eachObject.customerHashId + '\', \'' + unit21ServiceId + '\',\'Unit21 History\');" >';
	// viewHistoryBtn += 'View History';
	// viewHistoryBtn += '</button>';
	
	// unit21AccordianData += '<th>' + viewHistoryBtn + '</th>';
	
	unit21AccordianData += '</tr>';
	unit21AccordianData += '</thead>';
	unit21AccordianData += '<tbody id=\'unit21Tbody_' + slNo + '\'></tbody></div>';
	unit21AccordianData += '</table></div></div>';
	
	return unit21AccordianData;
}

function toggleUnit21(resultantElementId, element, complianceId, customerHashId, serviceId, referenceNumber) {
	$(element).nextAll(".content:first").slideToggle("fast");
	$(element).find(".accordian-arrow").toggleClass("less");
	
	if ($(element).find(".accordian-arrow").hasClass("less") && $(element).hasClass("unit21")) {
		getUnit21Data(resultantElementId, complianceId, customerHashId, serviceId, referenceNumber);
	}
}

function getUnit21Data(resultantElementId, complianceId, customerHashId, serviceId, referenceNumber) {
	var contextPath = $("#contextPath").val();
	const url = $("#unit21ResultsUrl").val() + complianceId + "/" + serviceId + "/" + referenceNumber + "/unit21";
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
			
			const keysArray = Object.keys(result);
			let bodyData = "";
			let hyperLink = "";
			let nonHyperLink = "";
			for (let i = 0; i < keysArray.length; i++) {
				const eachKey = keysArray[i];
				const splittedKey = eachKey.split("\.");
				const keyToDisplay = splittedKey[splittedKey.length - 1];
				let eachValue = result[eachKey];
				if (eachValue == null || eachValue === "null" || eachValue === undefined || eachValue === "") {
					eachValue = "-";
				}
				if ((keyToDisplay.toLowerCase().includes("href") || keyToDisplay.toLowerCase().includes("uri") || keyToDisplay.toLowerCase().includes("url")) && eachValue !== "-") {
					nonHyperLink += "<tr>";
					nonHyperLink += "<td><strong>" + keyToDisplay + "</strong></td>";
					nonHyperLink += "<td><a href='#' onclick='window.open(\"" + eachValue + "\");'>" + eachValue + "</a></td>";
					// nonHyperLink += "<td><a target='_blank' href='" + eachValue + "'>" + eachValue + "</a></td>";
					nonHyperLink += "</tr>";
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

function generateUnit21StatusDropDown() {
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