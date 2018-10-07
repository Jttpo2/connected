new p5();
p5.disableFriendlyErrors = true; // Disabling for performance

let backgroundColor;
const noOfParticles = 10;
const maxConnectionDistance = 120;
let particleHandler;

const G = 100;

function setup() {
	frameRate(30);
	let canvas = createCanvas(
		window.innerWidth,
		window.innerHeight
		);

	backgroundColor = color(50);

	particleHandler = new ParticleHandler(noOfParticles, maxConnectionDistance);
	particleHandler.init();
}

function draw() {
	background(backgroundColor);

	particleHandler.run();
}

function windowResized() {
	resizeCanvas(
		window.innerWidth,
		window.innerHeight);
}
