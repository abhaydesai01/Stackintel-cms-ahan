function generateBeamAccordianData(slNo, eachObject, beamServiceId, beamStatus, beamRefNo) {
	let beamAccordianData = "";

	beamAccordianData += '<h3 class="accordian beam" onclick="toggleBeam(\'beamTbody_' + slNo + '\', this, \'' + eachObject.complianceId + '\', \'' + eachObject.customerHashId + '\', \'' + beamServiceId + '\', \'' + beamRefNo + '\')">';
	beamAccordianData += '<span>BEAM Service<i class="fas fa-chevron-circle-up accordian-arrow"></i></span>';
	beamAccordianData += '</h3><br />';
	beamAccordianData += '<div class="content" style="display:none">';
	beamAccordianData += '<div class="trulio_wrapper">';
	beamAccordianData += '<table class="table compl">';
	beamAccordianData += '<thead>';
	beamAccordianData += '<tr>';
	beamAccordianData += '<th><h4>Field</h4></th>';
	beamAccordianData += '<th><h4>Value</h4></th>';

	if (beamStatus != null && beamStatus !== "" && beamStatus !== undefined && (beamStatus.toLowerCase()) === "action_required") {
		beamAccordianData += '<th><button class="btn btn-danger btn-sm px-5" onclick="openStatusUpdateModal(\'' + eachObject.complianceId + '\', \'' + beamServiceId + '\',\'' + beamRefNo + '\', \'beam\');">Update Status</button></th>';
	}

	// let reInitiateScreeningBtn = "";

	// if (beamStatus != null && beamStatus !== "" && beamStatus !== undefined && (beamStatus.toLowerCase()) !== "closed") {
	// 	reInitiateScreeningBtn += '<button id = "reinitiateBeamBtn" class="btn btn-success btn-sm px-5 ripple"';
	// 	reInitiateScreeningBtn += ' onclick = "reInitiateScreening(\'' + eachObject.clientCode + '\', \'' + eachObject.customerHashId + '\', \'' + eachObject.complianceId + '\', \'' + beamServiceId + '\', \'' + beamRefNo + '\', \'reinitiateBeamBtn\', \'Reinitiate BEAM\', \'BEAM reinitiated successfully!\');" >';
	// 	reInitiateScreeningBtn += 'Reinitiate BEAM';
	// 	reInitiateScreeningBtn += '</button>';
	// }

	// beamAccordianData += '<th>' + reInitiateScreeningBtn + '</th>';

	// let viewHistoryBtn = '<button id = "viewBeamHistoryBtn" class="btn btn-success btn-sm px-5 ripple"';
	// viewHistoryBtn += ' onclick = "openViewHistoryModal(event, \'' + eachObject.clientCode + '\', \'' + eachObject.customerHashId + '\', \'' + beamServiceId + '\',\'BEAM History\');" >';
	// viewHistoryBtn += 'View History';
	// viewHistoryBtn += '</button>';

	// beamAccordianData += '<th>' + viewHistoryBtn + '</th>';

	beamAccordianData += '</tr>';
	beamAccordianData += '</thead>';
	beamAccordianData += '<tbody id=\'beamTbody_' + slNo + '\'></tbody></div>';
	beamAccordianData += '</table></div></div>';

	return beamAccordianData;
}

function toggleBeam(resultantElementId, element, complianceId, customerHashId, serviceId, referenceNumber) {
	$(element).nextAll(".content:first").slideToggle("fast");
	$(element).find(".accordian-arrow").toggleClass("less");

	if ($(element).find(".accordian-arrow").hasClass("less") && $(element).hasClass("beam")) {
		getBeamData(resultantElementId, complianceId, customerHashId, serviceId, referenceNumber);
	}
}

function getBeamData(resultantElementId, complianceId, customerHashId, serviceId, referenceNumber) {
	var contextPath = $("#contextPath").val();
	const url = $("#beamResultsUrl").val() + complianceId + "/" + serviceId + "/" + referenceNumber + "/beam";
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
			let arrayObjIndex = 0;

			for (let i = 0; i < keysArray.length; i++) {

				const eachKey = keysArray[i];
				const splittedKey = eachKey.split("\.");
				const currentObjIndex = eachKey.split("\.",1)[0].replace('[','').replace(']','');

				if(currentObjIndex == arrayObjIndex.toString()){
					nonHyperLink += "<tr>";
					nonHyperLink += "<td><h3>Alert Set "+(arrayObjIndex+1) +"</h3></td>";
					nonHyperLink += "<td> </td>";
					nonHyperLink += "</tr>";
					arrayObjIndex++;
				}

				const keyToDisplay = eachKey.substring(eachKey.indexOf("\.")+1);
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
				}else if(/^alerts\[\d+\].name$/g.test(keyToDisplay)){
					nonHyperLink += "<tr>";
					nonHyperLink += "<td><strong><u>" + keyToDisplay + "</u></strong></td>";
					nonHyperLink += "<td><strong><u>" + eachValue + "</u></strong></td>";
					nonHyperLink += "</tr>";
				}else{
					nonHyperLink += "<tr>";
					nonHyperLink += "<td>" + keyToDisplay + "</td>";
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

function generateBeamStatusDropDown() {
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