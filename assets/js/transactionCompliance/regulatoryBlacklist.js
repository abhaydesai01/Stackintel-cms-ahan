function generateBlacklistAccordianData(slNo, eachObject, blacklistServiceId, blacklistStatus, blacklistReferenceNumber) {
	var blacklistAccordianData = "";
	
	blacklistAccordianData += '<h3 class="accordian blacklist" onclick="toggleBlacklist(\'blacklistTbody_' + slNo + '\', this, \'' + eachObject.complianceId + '\', \'' + eachObject.customerHashId + '\', \'' + blacklistServiceId + '\', \'' + blacklistReferenceNumber + '\')">';
	blacklistAccordianData += '<span>Regulatory Blacklist<i class="fas fa-chevron-circle-up accordian-arrow"></i></span>';
	blacklistAccordianData += '</h3><br />';
	blacklistAccordianData += '<div class="content" style="display:none">';
	blacklistAccordianData += '<div class="trulio_wrapper">';
	blacklistAccordianData += '<table class="table compl">';
	blacklistAccordianData += '<thead>';
	blacklistAccordianData += '<tr>';
	blacklistAccordianData += '<th><h4>Field</h4></th>';
	blacklistAccordianData += '<th><h4>Value</h4></th>';
	
	if (blacklistStatus != null && blacklistStatus !== "" && blacklistStatus !== undefined && ((blacklistStatus.toLowerCase()) === "action_required")) {
		blacklistAccordianData += '<th><button class="btn btn-danger btn-sm px-5" onclick="openStatusUpdateModal(\'' + eachObject.complianceId + '\', \'' + blacklistServiceId + '\',\'' + blacklistReferenceNumber + '\', \'blacklist\');">Update Status</button></th>';
	}
	
	//var reInitiateScreeningBtn = "";
	
	//if (blacklistStatus != null && blacklistStatus !== "" && blacklistStatus !== undefined && (blacklistStatus.toLowerCase()) !== "closed") {
	
	//	reInitiateScreeningBtn += '<button id = "reinitiateBlacklistBtn" class="btn btn-success btn-sm px-5 ripple"';
	//	reInitiateScreeningBtn += ' onclick = "reInitiateScreening(\'' + eachObject.clientCode + '\', \'' + eachObject.customerHashId + '\', \'' + eachObject.complianceId + '\', \'' + blacklistServiceId + '\', \'' + blacklistReferenceNumber + '\', \'reinitiateBlacklistBtn\', \'Reinitiate BlackList\', \'Blacklist reinitiated successfully!\');" >';
	//	reInitiateScreeningBtn += 'Reinitiate Blacklist';
	//	reInitiateScreeningBtn += '</button>';
	//}
	
	//blacklistAccordianData += '<th>' + reInitiateScreeningBtn + '</th>';
	
	//var viewHistoryBtn = '<button id = "viewBlackListHistoryBtn" class="btn btn-success btn-sm px-5 ripple"';
	//viewHistoryBtn += ' onclick = "openViewHistoryModal(event, \'' + eachObject.clientCode + '\', \'' + eachObject.customerHashId + '\', \'' + blacklistServiceId + '\',\'Blacklist History\');" >';
	//viewHistoryBtn += 'View History';
	//viewHistoryBtn += '</button>';
	
	//blacklistAccordianData += '<th>' + viewHistoryBtn + '</th>';
	
	blacklistAccordianData += '</tr>';
	blacklistAccordianData += '</thead>';
	blacklistAccordianData += '<tbody id=\'blacklistTbody_' + slNo + '\'></tbody></div>';
	blacklistAccordianData += '</table></div></div>';
	
	return blacklistAccordianData;
}

function toggleBlacklist(resultantElementId, element, complianceId, customerHashId, serviceId, referenceNumber) {
	$(element).nextAll(".content:first").slideToggle("fast");
	$(element).find(".accordian-arrow").toggleClass("less");
	
	if ($(element).find(".accordian-arrow").hasClass("less") && $(element).hasClass("blacklist")) {
		getBlacklistData(resultantElementId, complianceId, customerHashId, serviceId, referenceNumber);
	}
}

function getBlacklistData(resultantElementId, complianceId, customerHashId, serviceId, referenceNumber) {
	var contextPath = $("#contextPath").val();
	var url = $("#transactionsComplianceblacklistServiceDetailUrl").val() + complianceId + "/" + serviceId + "/" + referenceNumber + "/blacklistServiceDetails";
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
			
			//var bodyObject = result.body;
			
			var keysArray = Object.keys(result);
			
			var bodyData = "";
			var topPositionData = "";
			var hyperLink = "";
			var nonHyperLink = "";
			var patt = /[a-z|A-Z|0-9]*/;
			
			for (var i = 0; i < keysArray.length; i++) {
				var eachKey = keysArray[i];
				var splittedKey = eachKey.split("\.");
				var keyToDisplay = splittedKey[splittedKey.length - 1];
				var keyToHeader = keyToHeader = splittedKey[splittedKey.length - (splittedKey.length - 1)];
				//var eachValue = bodyObject[eachKey];
				var eachValue = result[eachKey];
				
				eachValue = eachValue.toString();
				
				if (eachValue == null || eachValue === "null" || eachValue === undefined || eachValue === "" || eachValue === {} || eachValue === "{}" || eachValue === [] || eachValue === "[]" || eachValue === "[object Object]") {
					eachValue = "-";
				}
				
				if (keyToDisplay.toLowerCase() === "score" || keyToDisplay.toLowerCase() === "hits") {
					
					if (keyToDisplay !== "Score") {
						nonHyperLink += "<tr>";
						nonHyperLink += "<td><hr style = 'border-top: 1px solid #00000045;' /></td>";
						nonHyperLink += "<td><hr style = 'border-top: 1px solid #00000045;' /></td>";
						nonHyperLink += "</tr>";
						nonHyperLink += "<tr>";
						nonHyperLink += "<td><b>";
						nonHyperLink += keyToHeader;
						nonHyperLink += "</b></td>";
						nonHyperLink += "</tr>";
						
					}
					
				}
				
				if (keyToDisplay.toLowerCase().includes("totalhits") || keyToDisplay.toLowerCase().includes("maxscore")) {
					topPositionData += "<tr>";
					topPositionData += "<td><strong>" + keyToDisplay + "</strong></td>";
					topPositionData += "<td>" + eachValue + "</td>";
					topPositionData += "</tr>";
				} else {
					if ((keyToDisplay.toLowerCase().includes("href") || keyToDisplay.toLowerCase().includes("uri") || keyToDisplay.toLowerCase().includes("url")) && eachValue !== "-") {
						nonHyperLink += "<tr>";
						nonHyperLink += "<td><strong>" + keyToDisplay + "</strong></td>";
						nonHyperLink += "<td><a href='#' onclick='window.open(\"" + eachValue + "\");'>" + eachValue + "</a></td>";
						// nonHyperLink += "<td><a target='_blank' href='" + eachValue + "'>" + eachValue + "</a></td>";
						nonHyperLink += "</tr>";
					} else {
						nonHyperLink += "<tr>";
						nonHyperLink += "<td><strong>" + keyToDisplay.match(patt) + "</strong></td>";
						nonHyperLink += "<td>" + eachValue + "</td>";
						nonHyperLink += "</tr>";
					}
				}
			}
			bodyData += (topPositionData + hyperLink + nonHyperLink);
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

function generateBlacklistDropDown() {
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