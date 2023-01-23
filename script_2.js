let distToObject;
let angle;
function main() {
	distToObject = document.getElementById("mySlider").value;
	angle = window.screen.orientation.angle;
	
	window.addEventListener("deviceorientation", onOrientationChange)
	document.getElementById("mySlider").addEventListener("change", (e) => {
		distToObject = e.target.value;
		console.log(e.target.value);
		getHeight(angle, distToObject)
	})

	navigator.mediaDevices.getUserMedia({video:{
		facingMode:'environment'
	}})
	    .then(function(signal){
	    	const video = document.getElementById("myVideo");
	    	video.srcObject = signal;
	    	video.play();
	    	getHeight(angle, distToObject);
	    })
	    .catch(function(err){
	    	alert(err);
	    })
}

function getHeight(angle, dist) {
	const height = Math.tan(angle*Math.PI/180) * dist;
	document.getElementById("myLabel").innerHTML = "Distance to object: " + dist + " metres";
	document.getElementById("heightInfo").innerHTML = height.toFixed(2) + " m (" + angle.toFixed(2)+"&deg;)";
}

function onOrientationChange(event) {
	angle = event.beta - 90;
	if (angle < 0) {
		angle = 0;
	}

	getHeight(angle, distToObject)
}