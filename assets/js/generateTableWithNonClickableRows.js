$(document).ready(function () {
	generateTable();
});

function generateTable() {
	$(".myTable").each(function (index, element) {
		var tableId = element.id;
		var tableParentDivElement = $("#" + tableId).parent();
		var pathVariable = $("#" + tableId).attr("pathVariable");
		var order = $("#" + tableId).attr("order");
		var page = $("#" + tableId).attr("page");
		var property = $("#" + tableId).attr("property");
		var size = $("#" + tableId).attr("size");
		
		if ($("#" + tableId).length > 0) {
			$("#" + tableId).parent().prepend("<div id = 'loadingId_" + index + "' style = 'text-align:center;'><img style='max-width:50px;' src = '/cards-ui/static/img/loading.gif'></img></div>");
			
			//Building URL Starts here
			var URL = $("#" + tableId).attr("href") + "?";
			
			if (pathVariable != null && pathVariable != "null") {
				URL += "pathVariable=" + window.encodeURIComponent(pathVariable);
			} else {
				URL += "pathVariable=";
			}
			if (order != null && order != "null") {
				URL += "&order=" + window.encodeURIComponent(order);
			} else {
				URL += "&order=";
			}
			if (page != null && page != "null") {
				URL += "&page=" + window.encodeURIComponent(page);
			} else {
				URL += "&page=";
			}
			if (property != null && property != "null") {
				URL += "&property=" + window.encodeURIComponent(property);
			} else {
				URL += "&property=";
			}
			if (size != null && size != "null") {
				URL += "&size=" + window.encodeURIComponent(size);
			} else {
				URL += "&size=";
			}
			//Building URL Ends here
			
			$.ajax({
				url: URL,
				type: "get",
				contentType: "application/json",
				beforeSend: function (xhr) {
					setAuthTokenInReqHeader(xhr);
					setCsrfTokenInRequestHeader(xhr);
					xhr.setRequestHeader("clientCode", clientCode);
				},
				success: function (tableData) {
					var contextPath = "${pageContext.request.contextPath}";
					setAndReturnNewAuthToken(xhr, contextPath);
					setAndReturnNewCsrfToken(xhr, contextPath);
					sanitize(unSanitize(tableData));
					
					//Table logic Starts here
					$("#" + tableId).html('');
					$("#loadingId_" + index).empty();
					
					var myTableData = "";
					var hiddenFields = "";
					
					myTableData += "<thead>";
					myTableData += "<tr>";
					
					for (var j = 0; j < tableData.columns.length; j++) {
						var indivisualColumnName = tableData.columns[j];
						if (indivisualColumnName != 'ID' && indivisualColumnName != 'Id' && indivisualColumnName != 'id') {
							if (indivisualColumnName == 'Sr_No.' || indivisualColumnName == 'Sr_No') {
								myTableData += "<th style='width:5px;'>";
							} else {
								myTableData += "<th>";
							}
							if (indivisualColumnName.includes("_")) {
								var resultantColumnName = "";
								var splittedString = indivisualColumnName.split("_");
								for (var k = 0; k < splittedString.length; k++) {
									resultantColumnName += splittedString[k] + " ";
								}
								resultantColumnName = resultantColumnName.trim();
								myTableData += resultantColumnName;
							} else {
								myTableData += indivisualColumnName;
							}
							myTableData += "</th>";
						}
					}
					myTableData += "</tr>";
					myTableData += "</thead>";
					
					myTableData += "<tbody>";
					
					if (tableData.data != null && tableData.data != '' && tableData.data.length > 0) {
						for (var i = 0; i < tableData.data.length; i++) {
							var eachRowData = tableData.data[i];
							
							//logic to create hidden fields starts here
							var keysFromEachRowDataObj = Object.keys(eachRowData);
							
							for (var z = 0; z < keysFromEachRowDataObj.length; z++) {
								if (keysFromEachRowDataObj[z].includes("hidden") || keysFromEachRowDataObj[z].includes("Hidden")) {
									
									var hiddenFieldName = ((keysFromEachRowDataObj[z]).split("_"))[0];
									var hiddenFieldValue = eachRowData[(keysFromEachRowDataObj[z])];
									
									if (hiddenFieldValue != null && hiddenFieldValue != "null" && hiddenFieldValue != "NULL" && hiddenFieldValue != "" && hiddenFieldValue != "[]" && hiddenFieldValue != "{}") {
										hiddenFields += "<input type='hidden' id='" + hiddenFieldName + "_" + eachRowData.ID + "' name='" + hiddenFieldName + "_" + eachRowData.ID + "' value='" + hiddenFieldValue + "' />";
									}
								}
							}
							//For better readablity, uncomment the below <br /> tag but comment it before deploying the code.
//							hiddenFields += "<br />";
							tableParentDivElement.prepend(hiddenFields);
							hiddenFields = "";
							//logic to create hidden fields ends here
							
							myTableData += "<tr id = " + eachRowData.ID + ">";
							for (var l = 0; l < tableData.columns.length; l++) {
								if (eachRowData[tableData.columns[l]] != null && eachRowData[tableData.columns[l]] != 'null' && eachRowData[tableData.columns[l]] != "NULL") {
									if (tableData.columns[l] != "ID" && tableData.columns[l] != "Id" && tableData.columns[l] != "id") {
										myTableData += "<td style=\"white-space: nowrap\">" + eachRowData[tableData.columns[l]] + "</td>";
									}
								} else {
									myTableData += "<td>NA</td>";
								}
							}
							myTableData += "</tr>";
						}
					} else {
						myTableData += "<tr>";
						myTableData += "<td style = 'text-align:center;' colspan = " + tableData.columns.length + ">No Data Found!</td>";
						myTableData += "</tr>";
					}
					myTableData += "</tbody>";
					$("#" + tableId).html(myTableData);
					//Table logic Ends here
					
					//Pagination logic Starts here
					var pageNumber = eval(tableData.paginationData.pageNumber);
					var size = tableData.paginationData.size;
					var startingPage = eval(eval(pageNumber * size) + eval(1));
					var totalElementsInEachPage = eval(eval(tableData.paginationData.numberOfElements) + eval(tableData.paginationData.offset));
					var totalNoOFElements = eval(tableData.paginationData.totalElements);
					
					
					$('#paginationData').html("Displaying " + startingPage + " to " + totalElementsInEachPage + " out of " + totalNoOFElements);
					
					$('#pagination').twbsPagination({
						totalPages: tableData.paginationData.totalPages,
						visiblePages: 7,
						startPage: 1,
						hideOnlyOnePage: false,
						initiateStartPageClick: false,
						first: 'First',
						prev: 'Previous',
						next: 'Next',
						last: 'Last',
						onPageClick: function (event, page) {
							$(".myTable").each(function (index, element) {
								var tblId = element.id;
								$("#" + tblId).attr("page", page - 1);
								generateTable();
							});
						}
						//Pagination logic Ends here
					});
				},
				complete: function (xhr, status) {
					var contextPath = "${pageContext.request.contextPath}";
					setAndReturnNewAuthToken(xhr, contextPath);
					setAndReturnNewCsrfToken(xhr, contextPath);
				}
			});
		}
	});
}