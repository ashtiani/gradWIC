$(document).ready(function() {
	$.ajaxSetup({ cache: true });
	$.getScript('//connect.facebook.net/en_US/sdk.js', function(){
		FB.init({
			appId: '1725085547782495',
			version: 'v2.7'
		});

		var pageAccessToken = '1725085547782495|WqVV4TPMJ_43akU69-r82PXB9g0';

		FB.api('/ucsdgradwic/events?fields=cover,id,start_time,name,description,place, link', {
			access_token: pageAccessToken
		}, function(response) {
			console.log(response);

			var item = response.data;
			var monthList = [ "Jan", "Feb", "Mar", "Apr","May","June","July", "Aug", "Sept", "Oct", "Nov", "Dec"];

			var output="";


			var linkToEvent = "";
			var eventPlaceName = "";
			var eventTime = "";
			var isPastEvent = true;


			var currentDate = new Date();
			var currday = currentDate.getDate();
			var curryear = currentDate.getFullYear();
			var currmonth = currentDate.getMonth()+1;
			console.log("Current :"+currentDate);




			for (var i in item) {
                console.log(item);
				var timeStr = item[i].start_time;
				console.log(timeStr);
				var date = new Date(dateFromISO8601(timeStr));
				var day = date.getDate();
				var year = date.getFullYear();
				var month = date.getMonth()+1;
				var dateStr = month+"-"+day+"-"+year;

				if (year > (curryear-1)){

					output+="<li>";
					output+= "<time datetime="+dateStr+"\">"+
					"<span class=\"day\">"+ day + "</span>"+
					"<span class=\"month\">"+monthList[date.getMonth()]+"</span>"+
					"<span class=\"year\">"+year+"</span>"+
					"</time>"
					output+= "<div class=\"info\">" + "<h2 class=\"title\">" + item[i].name + "</h2>"

					if(!item[i].place)
					eventPlaceName = "TBD";
					else
					eventPlaceName = item[i].place.name;

					if(!timeStr)
					eventTime = "TBD";
					else
					eventTime = timeStr.slice(11, 16);




					output+= "<p class=\"desc\">"+eventPlaceName+"<br>"+"Time: "+eventTime + "<br><a style=\'color: #A351CC\' target=\'_blank\' href=\'http://facebook.com/" + item[i].id + "\'>RSVP</a></p>"+"</div>"

					output+="</li>";


				}//end for loop
			}
			document.getElementById("placeholder").innerHTML=output;





		});

		var outputgallery="";

		FB.api('/ucsdgradwic/photos?fields=images,link&type=uploaded', {
			access_token: pageAccessToken
		}, function(response) {
			console.log(response);

			var item = response.data;

			var output="";

			//for (var i in item) {
			for (var i=0;i<6;i++) {

				console.log(item[i].link);

				//output+= "<p class=\"desc\">"+eventPlaceName+"<br>"+"Time: "+eventTime+"</p>"+"</div>"

				//output+="<li>";

				//output+="<div data-alt=\"img03\" data-description=\"<h3>Sky high</h3>\" data-max-width=\"1800\" data-max-height=\"1350\">";

				//output+="<div data-src=\""+item[i].images[0].source+"\" data-min-width=\"300\"></div>";

				//output+="</li>";

				outputgallery+="<div class=\"col-lg-6 col-md-6 gallery-set text-center\">";
				outputgallery+="<a href=\""+item[i].link+"\"><img src = \""+item[i].images[4].source+"\" style='width:auto; max-height:300px'  /></a></div>";


				//output+="<img src=\""+item[i].images[0].source+"\" />";





			}//end for loop

			document.getElementById("gallery").innerHTML=outputgallery;

		});



	});
});

// parse ISO8601 date format in any browser
//(date format compatibility with all browsers)
function dateFromISO8601(isoDateString) {
	var parts = isoDateString.match(/\d+/g);
	var isoTime = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
	var isoDate = new Date(isoTime);

	return isoDate;
}
