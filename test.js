$(document).ready(function() {
	$.ajaxSetup({ cache: true });
	$.getScript('//connect.facebook.net/en_US/sdk.js', function(){
		FB.init({
			appId: '1725085547782495',
			version: 'v2.7' // or v2.1, v2.2, v2.3, ...
		});

		var pageAccessToken = '1725085547782495|WqVV4TPMJ_43akU69-r82PXB9g0';

		FB.api('/UCSDgradwic/events?fields=cover,id,start_time,name,description,place', {
		access_token: pageAccessToken
		//other parameters can go here aswell

	}, function(response) {
		console.log(response);



		///
		var item = response.data;
		var monthList = [ "Jan", "Feb", "Mar", "Apr","May","June","July", "Aug", "Sept", "Oct", "Nov", "Dec"];

		var output="";
		var linkToEvent = "";

		 for (var i in item) {
			 output+="<li>";
				 //output+="<li>Time : " + item[i].start_time + "<br/>Cover Link : " + item[i].cover.source + "</li>";

				 var timeStr = item[i].start_time;

				 console.log(timeStr);
				 var date = new Date(dateFromISO8601(timeStr));
				 var day = date.getDate();
				 var year = date.getFullYear();
				 var month = date.getMonth()+1;
				 var dateStr = month+"-"+day+"-"+year;

				 output+= "<time datetime="+dateStr+"\">"+
				 					"<span class=\"day\">"+ day + "</span>"+
									"<span class=\"month\">"+monthList[date.getMonth()]+"</span>"+
									"<span class=\"year\">"+year+"</span>"+
									"</time>"

				//output+= "<img src=\" "+ item[i].cover.source + "\""+ "/>"

				//				output+= "<a href=\"" +"http://www.facebook.com/events/"+ item[i].id +"\">"+"<div class=\"info\">" + "<h2 class=\"title\">" + item[i].name + "</h2>"

				output+= "<div class=\"info\">" + "<h2 class=\"title\">" + item[i].name + "</h2>"
				output+= "<p class=\"desc\">"+item[i].place.name+"<br>"+"Time: "+timeStr.slice(11, 16)+"</p>"+"</div>"

				output+="</li>";
		 }


	 //console.log(output);



		 document.getElementById("placeholder").innerHTML=output;
		///

///

///


	});
		//



	});
});

// parse ISO8601 date format in any browser
function dateFromISO8601(isoDateString) {
  var parts = isoDateString.match(/\d+/g);
  var isoTime = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
  var isoDate = new Date(isoTime);

  return isoDate;
}
