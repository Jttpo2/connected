new p5();

let backgroundColor;
const noOfParticles = 10;
let particleHandler;

const G = 2;

function setup() {
	let canvas = createCanvas(
		window.innerWidth,
		window.innerHeight
		);

	backgroundColor = color(50);

	particleHandler = new ParticleHandler(noOfParticles);
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
