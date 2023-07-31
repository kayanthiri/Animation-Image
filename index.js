function makeNewPosition() {
    var containerVspace = container.offsetHeight - target.offsetHeight,
    containerHspace = container.offsetWidth - target.offsetWidth,
    newX = Math.floor(Math.random() * containerVspace),
    newY = Math.floor(Math.random() * containerHspace);
    return [newX, newY];
}

function velocity(prev, next) { 
	var x = Math.abs(prev[1] - next[1]),
    y = Math.abs(prev[0] - next[0]),
    larger = x > y ? x : y,
    speedModifier = 0.2,
    speed = Math.ceil(larger / speedModifier);
    return speed;	
}

function floatHead() {
    var newPos = makeNewPosition(),
    oldTop = target.offsetTop,
    oldLeft = target.offsetLeft;
	target.animate([
		{ top: oldTop+"px", left: oldLeft+"px" },
		{ top: newPos[0]+"px", left: newPos[1]+"px" }
		], {
	duration: velocity([oldTop, oldLeft],newPos),
	fill: 'forwards'
	}).onfinish = function() {
		floatHead();
	}
}

var container = document.getElementById("animation-container"),
stopAnimate = document.querySelector('.close-animation'),
target = document.createElement("img");
target.id = "target";
target.onload = function() {
    floatHead();
}
target.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/spiritedaway-head.png";
container.appendChild(target);

// close animation
stopAnimate.addEventListener('click', function() {
    container.classList.add('d-none')
})