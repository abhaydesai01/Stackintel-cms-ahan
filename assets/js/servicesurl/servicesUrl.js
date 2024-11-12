var customermicroserviceContext = "http://192.168.0.100:8020";
var customerlist = "/api/v1/customer/add";
var countrylist = "/api/v1/customer/countryList";
var customerlistUrl = customermicroserviceContext+customerlist;
var countrylistUrl = customermicroserviceContext+countrylist;


function make_base_auth(user, password) {
	  var tok = "root" + ':' + "123456";
	  var hash = btoa(tok);
	  alert(hash)
	  return "Bearer " + hash;
	}

$(document).ready(function() {
         	alert("readt")
         	});
         	
	// Calling Api for set the exiting ServiceType	
	$.ajax({
	type : "GET",
     url : countrylistUrl,
     headers: {
         'Access-Control-Allow-Origin' : '*'
     },
    success : function(response) {
    	alert(2);
    	console.log(response);
    seljobs = response;
        var i = 0; 
        var html;
        
        response.forEach(function (i) {                           
        	html += '<option value="' + i.code + '">' + i.name + '</option>';
            i++;
        });
        console.log("Option add");
        $('#countryCode').append(html);
   		 },
   		error : function(xhr, status, error) {
   	    alert(1);
   	   		 }
	});