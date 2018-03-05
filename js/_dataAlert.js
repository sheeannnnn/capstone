$(document).ready(function(){

});

var ioTurnChecks = setInterval(checkForNewData, 10000);
var prevFeeds = 0;

// function dateTime(){ //
// 	$.getJSON("script/_data.json", function(data){
// 		$.each(data, function(key, event){

// 			var dat = event['created_at'];
// 			var ss = dat.split("T");
// 			var time = ss[1].replace("Z", "");
			


// 		});
// 	});

// }
function playAudio(){ //play alert audio
	var x = document.getElementById("alertAudio");
		x.play();
}

function checkForNewData(){
	$.ajax({
		url: 'https://api.thingspeak.com/channels/344468/feeds.json',
		// url: 'script/_data.json',
		method: 'get',
		dataType: 'json',
		success: function(data){
			var feeds = data['feeds'];
			checkLastData(feeds[feeds.length-1]);
				prevFeeds = feeds.length;
				
		}

	});
}

function checkLastData(data){
	var dateData = data['created_at'];
	var dataCheck = data['field3'];

	var dataDateTime = dateData.split('T'); 
	var time = dataDateTime[1].replace('Z', '');
	var timeSplit = time.split(":");
	var finalDateTime = dataDateTime[0]+" "+timeSplit[0]+":"+timeSplit[1]; //24 hr format YYYY-MM-DD

	var date = new Date();
	var month = (date.getMonth()+1 > 10) ? date.getMonth()+1 : "0"+(date.getMonth()+1);
	var day = date.getDate() > 10 ? date.getDate() : "0"+date.getDate();
	var hours = date.getHours() > 10 ? date.getHours() : "0"+date.getHours();
	var minutes = date.getMinutes() > 10 ? date.getMinutes() : "0"+date.getMinutes();
	var dateTimeNow =date.getFullYear()+"-"+month+"-"+day+" "+hours+ ":" +minutes;
	
	console.log(finalDateTime);
	console.log(dateTimeNow);
		if(finalDateTime === dateTimeNow){
			if(dataCheck != 'true'){
				$("#myModal").modal();
				playAudio();
			}
		} else {
			// alert("Test.");
			
		}			
}