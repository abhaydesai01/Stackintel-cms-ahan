function generateTrulioAccordionData(slNo, eachObject, trulioServiceId, trulioStatus, trulioReferenceNumber) {
	let trulioAccordionData = "";
	
	trulioAccordionData += '<h3 class="accordian trulioo" onclick="toggle_Trulio(\'truliooTbody_' + slNo + '\', this, \'' + eachObject.complianceId + '\', \'' + trulioServiceId + '\',\'' + trulioReferenceNumber + '\')">';
	trulioAccordionData += '<span>Trulioo<i class="fas fa-chevron-circle-up accordian-arrow"></i></span>';
	trulioAccordionData += '</h3><br />';
	trulioAccordionData += '<div class="content" style="display:none">';
	trulioAccordionData += '<div class="trulio_wrapper">';
	trulioAccordionData += '<table class="table compl">';
	trulioAccordionData += '<thead>';
	trulioAccordionData += '<tr>';
	trulioAccordionData += '<th><h4>Field</h4></th>';
	trulioAccordionData += '<th><h4>Value</h4></th>';
	
	if (trulioStatus != null && trulioStatus !== "" && trulioStatus !== undefined && (trulioStatus.toLowerCase()) === "action_required") {
		trulioAccordionData += '<th><button class="btn btn-danger btn-sm px-5" onclick="openStatusUpdateModal(\'' + eachObject.complianceId + '\', \'' + trulioServiceId + '\',\'' + trulioReferenceNumber + '\', \'trulioo\');">Update Status</button></th>';
	}
	trulioAccordionData += '</tr>';
	trulioAccordionData += '</thead>';
	trulioAccordionData += '<tbody id=\'truliooTbody_' + slNo + '\'></tbody></div>';
	trulioAccordionData += '</table></div></div>';
	return trulioAccordionData;
}

function toggle_Trulio(resultantElementId, element, complianceId, serviceId, referenceNumber) {
	$(element).nextAll(".content:first").slideToggle("fast");
	$(element).find(".accordian-arrow").toggleClass("less");
	if ($(element).find(".accordian-arrow").hasClass("less") && $(element).hasClass("trulioo")) {
		getTrulioData(resultantElementId, complianceId, serviceId, referenceNumber);
	}
}

function generateTrulioComplianceStatusDropDown() {
	let output = "";
	output += "<option value = ''>Select a status</option>";
	
	for (let i = 0; i < (allComplianceStatus.body).length; i++) {
		let eachStatusValue = (allComplianceStatus.body)[i];
		let valueToDisplay = (eachStatusValue.split("_")).join(" ");
		if ("reject" === eachStatusValue.trim().toLowerCase() || "completed" === eachStatusValue.trim().toLowerCase()) {
			output += "<option value = \"" + sanitize(unSanitize(eachStatusValue)) + "\">" + sanitize(unSanitize(valueToDisplay)) + "</option>";
		}
	}
	return output;
}

function getTrulioData(resultantElementId, complianceId, ServiceId, referenceNumber) {
	let contextPath = $("#contextPath").val();
	let url = $("#trulioUrl").val() + complianceId + "/" + ServiceId + "/" + referenceNumber + "/trulioServiceDetails";
	let loadingIcon = "<tr><td colspan=100 style='text-align:center;'><img style='max-width:50px;'src='" + contextPath + "/static/img/loading.gif'></img></td></tr>";
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
			
			if (!isValidNonEmptyObject(result)) {
				generateTrulioErrorTable(resultantElementId);
				return;
			}
			
			let resultKeys = String(Object.keys(result));
			if (!resultKeys.includes("creditorHitsArray") && !resultKeys.includes("debtorHitsArray") && !resultKeys.includes("links") && !resultKeys.includes("totalNoOfHits") && !resultKeys.includes("hitStatus")) {
				generateTrulioErrorTable(resultantElementId);
				return;
			}
			
			let totalNoOfHits = 0;
			if (resultKeys.includes("totalNoOfHits")) {
				totalNoOfHits = result.totalNoOfHits;
			}
			
			let links = "";
			if (resultKeys.includes("links")) {
				links = createAnchorTagsForTrulio(result.links);
			}
			
			let debtorHitStatus = "";
			if (resultKeys.includes("debtorStatus")) {
				debtorHitStatus = createHitStatusForTrulio(result.debtorStatus);
			}
			
			let creditorHitStatus = "";
			if (resultKeys.includes("creditorStatus")) {
				creditorHitStatus = createHitStatusForTrulio(result.creditorStatus);
			}
			
			let bodyData = "";
			let totalNoOfHitsTr = "";
			let linksTr = "";
			let debtorHitStatusTr = "";
			let creditorHitStatusTr = "";
			let hitsHeaderTr = "";
			let basicHitDetailsTr = "";
			let additionalHitDetailsTr = "";
			
			totalNoOfHitsTr += "<tr>";
			totalNoOfHitsTr += "<td><span class='text-info' style='font-size:22px; margin-bottom: 0.6em'>Total No. Of Hits</span></td>";
			if (totalNoOfHits === 0) {
				totalNoOfHitsTr += "<td><span class='text-info' style='font-size:22px; margin-bottom: 0.6em'>" + totalNoOfHits + "</span></td>";
			} else {
				totalNoOfHitsTr += "<td><span class='text-danger' style='font-size:22px; margin-bottom: 0.6em'>" + totalNoOfHits + "</span></td>";
			}
			totalNoOfHitsTr += "</tr>";
			bodyData += totalNoOfHitsTr;
			
			debtorHitStatusTr += "<tr>";
			debtorHitStatusTr += "<td><span class='text-info' style='font-size:22px; margin-bottom: 0.6em'>Debtor Hit Status</span></td>";
			if (debtorHitStatus.toLowerCase().includes("hit")) {
				debtorHitStatusTr += "<td><span class = 'text-danger' style='font-size:22px; margin-bottom: 0.6em'>" + debtorHitStatus + "</span></h2></td>";
			} else if (debtorHitStatus.toLowerCase().includes("clear")) {
				debtorHitStatusTr += "<td><span class = 'text-success' style='font-size:22px; margin-bottom: 0.6em'>" + debtorHitStatus + "</span></td>";
			} else {
				debtorHitStatusTr += "<td><span class = 'text-info' style='font-size:22px; margin-bottom: 0.6em'>" + debtorHitStatus + "</span></td>";
			}
			debtorHitStatusTr += "</tr>";
			bodyData += debtorHitStatusTr;
			
			creditorHitStatusTr += "<tr>";
			creditorHitStatusTr += "<td><span class='text-info' style='font-size:22px; margin-bottom: 0.6em'>Creditor Hit Status</span></td>";
			if (creditorHitStatus.toLowerCase().includes("hit")) {
				creditorHitStatusTr += "<td><span class = 'text-danger' style='font-size:22px; margin-bottom: 0.6em'>" + creditorHitStatus + "</span></td>";
			} else if (creditorHitStatus.toLowerCase().includes("clear")) {
				creditorHitStatusTr += "<td><span class = 'text-success' style='font-size:22px; margin-bottom: 0.6em'>" + creditorHitStatus + "</span></td>";
			} else {
				creditorHitStatusTr += "<td><span class = 'text-info' style='font-size:22px; margin-bottom: 0.6em'>" + creditorHitStatus + "</span></td>";
			}
			creditorHitStatusTr += "</tr>";
			bodyData += creditorHitStatusTr;
			
			linksTr += "<tr>";
			linksTr += "<td><span class='text-info' style='font-size:22px;' title = 'Click to toggle links' onclick = 'toggleTrulioLinks();'>Links</span></td>";
			linksTr += "<td>" + links + "</td>";
			linksTr += "</tr>";
			bodyData += linksTr;
			
			let creditorHitsArray = [];
			let debtorHitsArray = [];
			if (resultKeys.includes("creditorHitsArray")) {
				creditorHitsArray = result.creditorHitsArray;
			}
			if (resultKeys.includes("debtorHitsArray")) {
				debtorHitsArray = result.debtorHitsArray;
			}
			
			if (!isValidNonEmptyArray(creditorHitsArray) && !isValidNonEmptyArray(debtorHitsArray)) {
				$("#" + resultantElementId).html(bodyData);
				return;
			}
			
			if (creditorHitsArray.length > 0) {
				bodyData += "<tr>";
				bodyData += "<td><h3 class='text-info' style='font-size:22px;'>Creditor Hits</h3></td>";
				bodyData += "</tr>";
				bodyData += process(creditorHitsArray, hitsHeaderTr, basicHitDetailsTr, additionalHitDetailsTr);
			}
			hitsHeaderTr = "";
			basicHitDetailsTr = "";
			additionalHitDetailsTr = "";
			if (debtorHitsArray.length > 0) {
				bodyData += "<tr>";
				bodyData += "<td><h3 class='text-info' style='font-size:25px;'>Debtor Hits</h3></td>";
				bodyData += "</tr>";
				bodyData += process(debtorHitsArray, hitsHeaderTr, basicHitDetailsTr, additionalHitDetailsTr);
			}
			
			$("#" + resultantElementId).html(bodyData);
		},
		error: function (xhr) {
			let bodyData = "<tr>";
			bodyData += "<td colspan='2345'><h2>No Data Found</h2></td>";
			bodyData += "</tr>";
			$("#" + resultantElementId).html(bodyData);
		},
		complete: function (xhr, status) {
			setAndReturnNewAuthToken(xhr, contextPath);
			setAndReturnNewCsrfToken(xhr, contextPath);
		}
	});
}

function process(hitsArr, hitsHeaderTr, basicHitDetailsTr, additionalHitDetailsTr) {
	let bodyData = "";
	for (let i = 0; i < hitsArr.length; i++) {
		let eachHitObject = hitsArr[i];
		if (!isValidNonEmptyObject(eachHitObject)) {
			continue;
		}
		
		let eachHitObjectKeys = String(Object.keys(eachHitObject));
		if (!eachHitObjectKeys.includes("basicHitDetails") && !eachHitObjectKeys.includes("additionalHitDetails")) {
			continue;
		}
		
		let hitUuidClass = "hit_" + generateRandomUuid();
		
		hitsHeaderTr += generateTrulioHeader((i + 1), hitUuidClass);
		
		if (!eachHitObjectKeys.includes("basicHitDetails")) {
			basicHitDetailsTr += generateBasicHitDetailsForTrulio("-", "-", "-", "-", hitUuidClass);
		} else {
			var basicHitDetailsObj = eachHitObject.basicHitDetails;
			
			if (!isValidNonEmptyObject(basicHitDetailsObj)) {
				basicHitDetailsTr += generateBasicHitDetailsForTrulio("-", "-", "-", "-", hitUuidClass);
			} else {
				basicHitDetailsTr += generateBasicHitDetailsForTrulio(basicHitDetailsObj.name, basicHitDetailsObj.types, basicHitDetailsObj.sources, basicHitDetailsObj.media, hitUuidClass);
			}
		}
		if (eachHitObjectKeys.includes("additionalHitDetails")) {
			let additionalHitDetailsArr = eachHitObject.additionalHitDetails;
			
			if (isValidNonEmptyArray(additionalHitDetailsArr)) {
				additionalHitDetailsTr += generateAdditionalHitDetailsForTrulio(additionalHitDetailsArr, hitUuidClass);
			}
		}
		bodyData += (hitsHeaderTr + basicHitDetailsTr + additionalHitDetailsTr);
		hitsHeaderTr = "";
		basicHitDetailsTr = "";
		additionalHitDetailsTr = "";
	}
	return bodyData;
}

function isValidNonEmptyObject(input) {
	if (isEmptyInput(input)) {
		return false;
	}
	if (Array.isArray(input)) {
		return false;
	}
	if ((typeof input).toLowerCase() === "object") {
		let keysArray = Object.keys(input);
		if (keysArray.length > 0) {
			return true;
		}
	}
	return false;
}

function isValidNonEmptyArray(input) {
	if (isEmptyInput(input)) {
		return false;
	}
	if (Array.isArray(input) && input.length > 0) {
		return true;
	}
	return false;
}

function generateTrulioErrorTable(resultantElementId) {
	let bodyData = "<tr>";
	bodyData += "<td colspan='2345'><h2>No Data Found</h2></td>";
	bodyData += "</tr>";
	$("#" + resultantElementId).html(bodyData);
}

function generateTrulioHeader(hitCount, hitUuidClass) {
	let hitsHeaderTr = "";
	
	hitsHeaderTr += "<tr>";
	hitsHeaderTr += "<td><hr /></td>";
	hitsHeaderTr += "<td><hr /></td>";
	hitsHeaderTr += "</tr>";
	
	hitsHeaderTr += "<tr>";
	hitsHeaderTr += '<td><span style="color:#00a9df;font-size: 30px;font-weight: 500;"><i>Hit</i></span><span style="color:#00a9df;"><i class="fa fa-users fa-lg" onclick = "toggleHits(\'' + hitUuidClass + '\');"></i></span></td>';
	hitsHeaderTr += '<td><span style="color:#00a9df;font-size: 30px;font-weight: 500;"><i>' + hitCount + '.</i></span></td>';
	hitsHeaderTr += "</tr>";
	
	return hitsHeaderTr;
}

function generateBasicHitDetailsForTrulio(name, types, sources, media, hitUuidClass) {
	name = isBlankInput(name) ? "-" : name;
	types = isBlankInput(types) ? "-" : types;
	sources = isBlankInput(sources) ? "-" : sources;
	
	let basicHitDetailsTr = "";
	
	basicHitDetailsTr += "<tr class = '" + hitUuidClass + "'>";
	basicHitDetailsTr += "<td><b>Name</b></td>";
	basicHitDetailsTr += "<td>" + name + "</td>";
	basicHitDetailsTr += "</tr>";
	
	basicHitDetailsTr += "<tr class = '" + hitUuidClass + "'>";
	basicHitDetailsTr += "<td><b>Types</b></td>";
	basicHitDetailsTr += "<td>" + types + "</td>";
	basicHitDetailsTr += "</tr>";
	
	basicHitDetailsTr += "<tr class = '" + hitUuidClass + "'>";
	basicHitDetailsTr += "<td><b>Sources</b></td>";
	basicHitDetailsTr += "<td>" + sources + "</td>";
	basicHitDetailsTr += "</tr>";
	
	if (!isValidNonEmptyArray(media)) {
		basicHitDetailsTr += "<tr class = '" + hitUuidClass + "'>";
		basicHitDetailsTr += "<td><b>Media</b></td>";
		basicHitDetailsTr += "<td>-</td>";
		basicHitDetailsTr += "</tr>";
	} else {
		let uuid = generateRandomUuid();
		let accordianId = "truliooMediaAccordian_" + uuid;
		
		basicHitDetailsTr += "<tr class = '" + hitUuidClass + "'>";
		basicHitDetailsTr += "<td><b>Media</b></td>";
		
		let mediaToggleBtn = "<button style='border-radius:20px; margin-bottom:2px; padding:5px;' type='button' class='btn btn-info' data-toggle='collapse' data-target='#" + accordianId + "'>View Details <i class='fa fa-info-circle'></i></button>";
		let truliooAccordianData = "";
		
		for (let i = 0; i < media.length; i++) {
			let eachMediaObject = media[i];
			if (!isValidNonEmptyObject(eachMediaObject)) {
				continue;
			}
			truliooAccordianData += generateMediaAccordionForTrulio(accordianId, eachMediaObject.date, eachMediaObject.snippet, eachMediaObject.title, eachMediaObject.url);
		}
		basicHitDetailsTr += "<td>" + (mediaToggleBtn + truliooAccordianData) + "</td>";
		basicHitDetailsTr += "</tr>";
	}
	return basicHitDetailsTr;
}

function generateMediaAccordionForTrulio(accordianId, date, snippet, title, url) {
	let accordion = '';
	
	accordion += '<div id="' + accordianId + '" class="collapse">';
	accordion += '<table class="table compl">';
	
	accordion += '<thead>';
	accordion += '<tr>';
	accordion += '<th>Attribute</th>';
	accordion += '<th>Value</th>';
	accordion += '</tr>';
	accordion += '</thead>';
	
	accordion += '<tbody>';
	accordion += '<tr>';
	accordion += '<td>Link</td>';
	
	let processedValue = getBrSeparatedAnchorTagsAndReplacedStringArray(url);
	
	accordion += '<td>' + (processedValue[0] + processedValue[1]) + '</td>';
	accordion += '</tr>';
	
	accordion += '<tr>';
	accordion += '<td>Date</td>';
	accordion += '<td>' + date + '</td>';
	accordion += '</tr>';
	
	accordion += '<tr>';
	accordion += '<td>Title</td>';
	accordion += '<td>' + title + '</td>';
	accordion += '</tr>';
	
	accordion += '<tr>';
	accordion += '<td>Snippet</td>';
	accordion += '<td>' + snippet + '</td>';
	accordion += '</tr>';
	
	accordion += '</tbody>';
	accordion += '</table>';
	accordion += '</div>';
	
	
	return accordion;
}


function isBlankInput(input) {
	if (input === undefined || input == null || ((String(input)).trim()) === "") {
		return true;
	}
	return false;
}

function isEmptyInput(input) {
	if (input === undefined || input == null || input === "") {
		return true;
	}
	return false;
}

function generateAdditionalHitDetailsForTrulio(additionalHitDetailsArr, hitUuidClass) {
	let uuid = generateRandomUuid();
	let accordionId = "truliooAdditionalDetailsAccordian_" + uuid;
	let additionalHitDetailsTr = "";
	
	additionalHitDetailsTr += "<tr class = '" + hitUuidClass + "'>";
	additionalHitDetailsTr += "<td><b>Additional Details</b></td>";
	
	let mediaToggleBtn = "<button style='border-radius:20px; margin-bottom:2px; padding:5px;' type='button' class='btn btn-info' data-toggle='collapse' data-target='#" + accordionId + "'>View Details <i class='fa fa-info-circle'></i></button>";
	let additionalDataHeader = "";
	let additionalDetailsData = "";
	let hyperLinkTr = "";
	let nonHyperLinkTr = "";
	let additionalDataFooter = "";
	
	
	additionalDataHeader += '<div id="' + accordionId + '" class="collapse">';
	additionalDataHeader += '<table class="table compl">';
	additionalDataHeader += '<thead>';
	additionalDataHeader += '<tr>';
	additionalDataHeader += '<th>Attribute</th>';
	additionalDataHeader += '<th>Value</th>';
	additionalDataHeader += '</tr>';
	additionalDataHeader += '</thead>';
	additionalDataHeader += '<tbody>';
	
	additionalDataFooter += '</tbody>';
	additionalDataFooter += '</table>';
	additionalDataFooter += '</div>';
	
	
	for (let i = 0; i < additionalHitDetailsArr.length; i++) {
		let eachAdditionalHitObj = additionalHitDetailsArr[i];
		if (!isValidNonEmptyObject(eachAdditionalHitObj)) {
			continue;
		}
		let additionalDetails = generateAdditionalDetailsAccordionForTrulio(accordionId, eachAdditionalHitObj);
		if (additionalDetails.includes("http") || additionalDetails.includes("https")) {
			hyperLinkTr += additionalDetails;
			continue;
		}
		nonHyperLinkTr += additionalDetails;
	}
	additionalDetailsData += (hyperLinkTr + nonHyperLinkTr);
	if (isBlankInput(additionalDetailsData)) {
		return "";
	}
	additionalHitDetailsTr += "<td>" + (mediaToggleBtn + additionalDataHeader + additionalDetailsData + additionalDataFooter) + "</td>";
	additionalHitDetailsTr += "</tr>";
	return additionalHitDetailsTr;
}

function generateAdditionalDetailsAccordionForTrulio(accordianId, eachAdditionalHitObj) {
	let additionalObjKeysArr = Object.keys(eachAdditionalHitObj);
	if (!isValidNonEmptyArray(additionalObjKeysArr)) {
		return "";
	}
	let result = '';
	for (let i = 0; i < additionalObjKeysArr.length; i++) {
		let key = additionalObjKeysArr[i];
		let value = isBlankInput(eachAdditionalHitObj[key]) ? "-" : eachAdditionalHitObj[key];
		if (value.includes("http") || value.includes("https")) {
			let processedValue = getBrSeparatedAnchorTagsAndReplacedStringArray(value);
			value = (processedValue[0] + processedValue[1]);
		}
		result += '<tr>';
		result += '<td style="white-space:nowrap">' + key + '</td>';
		result += '<td>' + value + '</td>';
		result += '</tr>';
	}
	
	result += '<tr>';
	result += '<td><hr style = "margin-top:5px; margin-bottom:5px;" /></td>';
	result += '<td><hr style = "margin-top:5px; margin-bottom:5px;" /></td>';
	result += '</tr>';
	
	return result;
}

function getBrSeparatedAnchorTagsAndReplacedStringArray(input) {
	let resultArray = [];
	if (isBlankInput(input)) {
		resultArray.push("");
		resultArray.push("");
		return resultArray;
	}
	let linksArray = linkify.find(input);
	if (!isValidNonEmptyArray(linksArray)) {
		resultArray.push("");
		resultArray.push("");
		return resultArray;
	}
	let result = "";
	for (let i = 0; i < linksArray.length; i++) {
		let eachLinkObject = linksArray[i];
		if (!isValidNonEmptyObject(eachLinkObject)) {
			continue;
		}
		let eachLinkObjectKeys = String(Object.keys(eachLinkObject));
		if (isBlankInput(eachLinkObjectKeys) || !eachLinkObjectKeys.includes("href")) {
			continue;
		}
		
		input = (input.split(eachLinkObject.href)).join("");
		const url = sanitize(unSanitize(eachLinkObject.href));
		result += "<a href='#' onclick='window.open(\"" + url + "\");'>" + url + "</a> <br />";
		// result += "<a href = '" + sanitize(unSanitize(eachLinkObject.href)) + "' target = '_blank'>" + sanitize(unSanitize(eachLinkObject.href)) + "</a> <br />";
	}
	
	resultArray.push(result);
	resultArray.push(input);
	return resultArray;
}

function toggleTrulioLinks() {
	$("#trulioLinks").toggle("slow", "linear");
}

function createAnchorTagsForTrulio(links) {
	if (links === "") {
		return "-";
	}
	let splittedLinks = links.split(" ");
	if (splittedLinks.length === 0) {
		return "-";
	}
	let result = "";
	result += "<div id = 'trulioLinks'>";
	for (let i = 0; i < splittedLinks.length; i++) {
		result += "<a href='#' onclick='window.open(\"" + splittedLinks[i] + "\");'>" + splittedLinks[i] + "</a></br>";
		// result += "<a href = '" + splittedLinks[i] + "' target='_blank'>" + splittedLinks[i] + "</a></br>";
	}
	
	result += "</div>";
	return result;
}

function createHitStatusForTrulio(hitStatus) {
	if (hitStatus === "") {
		return "-";
	}
	return hitStatus;
}