const threeTextureLoader=new THREE.TextureLoader();
const cubeGeometry=new THREE.BoxGeometry(1, 1, 1); // cube with edge size of 1

// specify properties of blocks
// while the world generates a block it iterates over all blocks in blocksInfo and calls the generate(data) function where data contains the block position, temperature, height and stone level
// if the generate() function returns true it breakes the loop and places a block
// filename specifies the path to the texture file in the "textures" directory
const blocksInfo={
	snow: {
		generate: (data)=>(
			data.temperature <= 0
			&& data.p.y == data.height
			&& data.p.y >= 0
		),
		filename: "snow.png",
	},
	grass: {
		generate: (data)=>(
			data.temperature > 0 && data.temperature < 8
			&& data.p.y == data.height
			&& data.stone < 0
			&& data.p.y >= 0
		),
		filename: "grass.png",
	},
	sand: {
		generate: (data)=>(
			data.temperature >= 8
			&& data.p.y <= data.height
			&& data.p.y-data.height > data.stone
		),
		filename: "sand.png",
	},
	dirt: {
		generate: (data)=>(
			data.p.y <= data.height
			&& data.p.y-data.height > data.stone
		),
		filename: "dirt.png",
	},
	stone: {
		generate: (data)=>(
			!(data.p.y == data.height && data.p.y >= 0 && data.temperature <= 0)
			&& data.p.y <= data.height
			&& data.p.y-data.height <= data.stone
		),
		filename: "stone.png",
	},
	water: {
		generate: (data)=>(
			data.temperature > 0
			&& data.p.y > data.height
			&& data.p.y <= 0
			),
		filename: "water.png",
	},
	ice: {
		generate: (data)=>(
			data.temperature <= 0
			&& data.p.y > data.height
			&& data.p.y <= 0
		),
		filename: "ice.png",
	},
	planks: {
		filename: "planks.png",
	},
};
for (let id in blocksInfo) {
	let blockInfo=blocksInfo[id];
	blockInfo.id=id;
	blockInfo.texture=threeTextureLoader.load("textures/"+blockInfo.filename);
}

let animalsInfo={
	hedgehog: {
		size: {x: 0.56, y: 0.2, z: 1},
		generate: (data)=>(
			data.height >= 0 && data.p.y == data.height+1 && Math.random()>0.99
		),
		meshesSchemas: [
			{
				filename: "hedgehog/top.png",
				vertices: new Float32Array([0,-0.1,-0.5,-0.1,-0.1,-0.46,0,0.02,-0.41,0,-0.1,-0.5,0,0.02,-0.41,0.1,-0.1,-0.46,-0.1,-0.1,-0.46,-0.05,0.02,-0.38,0,0.02,-0.41,0.1,-0.1,-0.46,0,0.02,-0.41,0.05,0.02,-0.38,-0.1,-0.1,-0.46,-0.22,-0.1,-0.3,-0.05,0.02,-0.38,0.1,-0.1,-0.46,0.05,0.02,-0.38,0.22,-0.1,-0.3,-0.22,-0.1,-0.3,-0.14,0.02,-0.26,-0.05,0.02,-0.38,0.05,0.02,-0.38,0.14,0.02,-0.26,0.22,-0.1,-0.3,-0.28,-0.1,-0.04,-0.14,0.02,-0.26,-0.22,-0.1,-0.3,0.14,0.02,-0.26,0.28,-0.1,-0.04,0.22,-0.1,-0.3,-0.28,-0.1,-0.04,-0.19,0.02,-0.04,-0.14,0.02,-0.26,0.19,0.02,-0.04,0.28,-0.1,-0.04,0.14,0.02,-0.26,-0.28,-0.1,-0.04,-0.25,-0.1,0.15,-0.19,0.02,-0.04,0.19,0.02,-0.04,0.25,-0.1,0.15,0.28,-0.1,-0.04,-0.25,-0.1,0.15,-0.18,0.02,0.1,-0.19,0.02,-0.04,0.18,0.02,0.1,0.25,-0.1,0.15,0.19,0.02,-0.04,-0.25,-0.1,0.15,-0.14,-0.1,0.33,-0.18,0.02,0.1,0.14,-0.1,0.33,0.25,-0.1,0.15,0.18,0.02,0.1,-0.14,-0.1,0.33,-0.08,0.02,0.27,-0.18,0.02,0.1,0.14,-0.1,0.33,0.18,0.02,0.1,0.08,0.02,0.27,-0.05,0.02,-0.38,0,0.1,-0.2,0,0.02,-0.41,0,0.02,-0.41,0,0.1,-0.2,0.05,0.02,-0.38,-0.14,0.02,-0.26,0,0.1,-0.2,-0.05,0.02,-0.38,0,0.1,-0.2,0.14,0.02,-0.26,0.05,0.02,-0.38,-0.19,0.02,-0.04,0,0.1,-0.2,-0.14,0.02,-0.26,0,0.1,-0.2,0.19,0.02,-0.04,0.14,0.02,-0.26,-0.19,0.02,-0.04,0,0.1,0.06,0,0.1,-0.2,0,0.1,-0.2,0,0.1,0.06,0.19,0.02,-0.04,-0.19,0.02,-0.04,-0.18,0.02,0.1,0,0.1,0.06,0.18,0.02,0.1,0.19,0.02,-0.04,0,0.1,0.06,-0.18,0.02,0.1,-0.08,0.02,0.27,0,0.1,0.06,0.08,0.02,0.27,0.18,0.02,0.1,0,0.1,0.06,-0.08,0.02,0.27,0.08,0.02,0.27,0,0.1,0.06,-0.14,-0.1,0.33,0,0,0.35,-0.08,0.02,0.27,0.08,0.02,0.27,0,0,0.35,0.14,-0.1,0.33,-0.08,0.02,0.27,0,0,0.35,0.08,0.02,0.27,-0.14,-0.1,0.33,-0.03,-0.04,0.46,0,0,0.35,0,0,0.35,0.03,-0.04,0.46,0.14,-0.1,0.33,-0.03,-0.04,0.46,0.03,-0.04,0.46,0,0,0.35,-0.14,-0.1,0.33,-0.03,-0.1,0.46,-0.03,-0.04,0.46,0.03,-0.1,0.46,0.14,-0.1,0.33,0.03,-0.04,0.46,-0.03,-0.1,0.46,-0.02,-0.1,0.5,-0.03,-0.04,0.46,0.02,-0.1,0.5,0.03,-0.1,0.46,0.03,-0.04,0.46,-0.03,-0.04,0.46,-0.02,-0.1,0.5,-0.02,-0.06,0.5,0.03,-0.04,0.46,0.02,-0.06,0.5,0.02,-0.1,0.5,-0.02,-0.1,0.5,0,-0.1,0.5,-0.02,-0.06,0.5,0,-0.1,0.5,0.02,-0.1,0.5,0.02,-0.06,0.5,-0.02,-0.06,0.5,0,-0.1,0.5,0,-0.06,0.5,0.02,-0.06,0.5,0,-0.06,0.5,0,-0.1,0.5,-0.03,-0.04,0.46,-0.02,-0.06,0.5,0,-0.06,0.5,0.03,-0.04,0.46,0,-0.06,0.5,0.02,-0.06,0.5,-0.03,-0.04,0.46,0,-0.06,0.5,0.03,-0.04,0.46]),
				uvs: new Float32Array([0.5,1,0.32,0.96,0.5,0.91,0.5,1,0.5,0.91,0.68,0.96,0.32,0.96,0.41,0.88,0.5,0.91,0.68,0.96,0.5,0.91,0.59,0.88,0.32,0.96,0.11,0.8,0.41,0.88,0.68,0.96,0.59,0.88,0.89,0.8,0.11,0.8,0.25,0.76,0.41,0.88,0.59,0.88,0.75,0.76,0.89,0.8,0,0.54,0.25,0.76,0.11,0.8,0.75,0.76,1,0.54,0.89,0.8,0,0.54,0.16,0.54,0.25,0.76,0.84,0.54,1,0.54,0.75,0.76,0,0.54,0.05,0.35,0.16,0.54,0.84,0.54,0.95,0.35,1,0.54,0.05,0.35,0.18,0.4,0.16,0.54,0.82,0.4,0.95,0.35,0.84,0.54,0.05,0.35,0.25,0.17,0.18,0.4,0.75,0.17,0.95,0.35,0.82,0.4,0.25,0.17,0.36,0.23,0.18,0.4,0.75,0.17,0.82,0.4,0.64,0.23,0.41,0.88,0.5,0.7,0.5,0.91,0.5,0.91,0.5,0.7,0.59,0.88,0.25,0.76,0.5,0.7,0.41,0.88,0.5,0.7,0.75,0.76,0.59,0.88,0.16,0.54,0.5,0.7,0.25,0.76,0.5,0.7,0.84,0.54,0.75,0.76,0.16,0.54,0.5,0.44,0.5,0.7,0.5,0.7,0.5,0.44,0.84,0.54,0.16,0.54,0.18,0.4,0.5,0.44,0.82,0.4,0.84,0.54,0.5,0.44,0.18,0.4,0.36,0.23,0.5,0.44,0.64,0.23,0.82,0.4,0.5,0.44,0.36,0.23,0.64,0.23,0.5,0.44,0.25,0.17,0.5,0.15,0.36,0.23,0.64,0.23,0.5,0.15,0.75,0.17,0.36,0.23,0.5,0.15,0.64,0.23,0.25,0.17,0.45,0.04,0.5,0.15,0.5,0.15,0.55,0.04,0.75,0.17,0.45,0.04,0.55,0.04,0.5,0.15,0.25,0.17,0.45,0.04,0.45,0.04,0.55,0.04,0.75,0.17,0.55,0.04,0.45,0.04,0.46,0,0.45,0.04,0.54,0,0.55,0.04,0.55,0.04,0.45,0.04,0.46,0,0.46,0,0.55,0.04,0.54,0,0.54,0,0.46,0,0.5,0,0.46,0,0.5,0,0.54,0,0.54,0,0.46,0,0.5,0,0.5,0,0.54,0,0.5,0,0.5,0,0.45,0.04,0.46,0,0.5,0,0.55,0.04,0.5,0,0.54,0,0.45,0.04,0.5,0,0.55,0.04]),
			},
			{
				filename: "hedgehog/bottom.png",
				vertices: new Float32Array([-0.1,-0.1,-0.46,0,-0.1,-0.5,0,-0.1,0,0,-0.1,0,0,-0.1,-0.5,0.1,-0.1,-0.46,-0.22,-0.1,-0.3,-0.1,-0.1,-0.46,0,-0.1,0,0.1,-0.1,-0.46,0.22,-0.1,-0.3,0,-0.1,0,-0.28,-0.1,-0.04,-0.22,-0.1,-0.3,0,-0.1,0,0.28,-0.1,-0.04,0,-0.1,0,0.22,-0.1,-0.3,-0.25,-0.1,0.15,-0.28,-0.1,-0.04,0,-0.1,0,0.25,-0.1,0.15,0,-0.1,0,0.28,-0.1,-0.04,-0.14,-0.1,0.33,-0.25,-0.1,0.15,0,-0.1,0,0.25,-0.1,0.15,0.14,-0.1,0.33,0,-0.1,0,-0.03,-0.1,0.46,-0.14,-0.1,0.33,0,-0.1,0,0.14,-0.1,0.33,0.03,-0.1,0.46,0,-0.1,0,-0.02,-0.1,0.5,-0.03,-0.1,0.46,0,-0.1,0,0.02,-0.1,0.5,-0.02,-0.1,0.5,0,-0.1,0,0.02,-0.1,0.5,0,-0.1,0,0.03,-0.1,0.46]),
				uvs: new Float32Array([0.32, 0.96, 0.5, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 0.68, 0.96, 0.11, 0.8, 0.32, 0.96, 0.5, 0.5, 0.68, 0.96, 0.89, 0.8, 0.5, 0.5, 0, 0.54, 0.11, 0.8, 0.5, 0.5, 1, 0.54, 0.5, 0.5, 0.89, 0.8, 0.05, 0.35, 0, 0.54, 0.5, 0.5, 0.95, 0.35, 0.5, 0.5, 1, 0.54, 0.25, 0.17, 0.05, 0.35, 0.5, 0.5, 0.95, 0.35, 0.75, 0.17, 0.5, 0.5, 0.45, 0.04, 0.25, 0.17, 0.5, 0.5, 0.75, 0.17, 0.55, 0.04, 0.5, 0.5, 0.46, 0, 0.45, 0.04, 0.5, 0.5, 0.54, 0, 0.46, 0, 0.5, 0.5, 0.54, 0, 0.5, 0.5, 0.55, 0.04]),
			},
		],

	},
};
for (let id in animalsInfo) {
	let animalInfo=animalsInfo[id];
	animalInfo.id=id;
	animalInfo.meshesSchemas.forEach((meshSchema)=>{
		meshSchema.texture=threeTextureLoader.load("textures/"+meshSchema.filename);
	});
}

// specify faces of a cube
// inverseIndex is the index of the opposite wall in the "faces" array
let faces=[
	// front
	{
		d: {x: 0, y: 0, z: 1},
		inverseIndex: 1,
		vertices: new Float32Array([
			-0.5, -0.5, 0.5,
			0.5, -0.5, 0.5,
			0.5, 0.5, 0.5,
			0.5, 0.5, 0.5,
			-0.5, 0.5, 0.5,
			-0.5, -0.5, 0.5,
		]),
		uvs: [
			[
				0, 0,
				0, 1,
				1, 1,
				1, 1,
				1, 0,
				0, 0,
			],
		],
	},
	// back
	{
		d: {x: 0, y: 0, z: -1},
		inverseIndex: 0,
		vertices: new Float32Array([
			-0.5, 0.5, -0.5,
			0.5, -0.5, -0.5,
			-0.5, -0.5, -0.5,
			0.5, -0.5, -0.5,
			-0.5, 0.5, -0.5,
			0.5, 0.5, -0.5,
		]),
		uvs: [
			[
				0, 0,
				1, 1,
				1, 0,
				1, 1,
				0, 0,
				0, 1,
			],
		],
	},
	// left
	{
		d: {x: 1, y: 0, z: 0},
		inverseIndex: 3,
		vertices: new Float32Array([
			0.5, 0.5, -0.5,
			0.5, -0.5, 0.5,
			0.5, -0.5, -0.5,
			0.5, 0.5, -0.5,
			0.5, 0.5, 0.5,
			0.5, -0.5, 0.5,
			
		]),
		uvs: [
			[
				0, 0,
				1, 1,
				1, 0,
				0, 0,
				0, 1,
				1, 1,
			],
		],
	},
	// right
	{
		d: {x: -1, y: 0, z: 0},
		inverseIndex: 2,
		vertices: new Float32Array([
			-0.5, -0.5, -0.5,
			-0.5, -0.5, 0.5,
			-0.5, 0.5, 0.5,
			-0.5, 0.5, -0.5,
			-0.5, -0.5, -0.5,
			-0.5, 0.5, 0.5,
		]),
		uvs: [
			[
				0, 0,
				0, 1,
				1, 1,
				1, 0,
				0, 0,
				1, 1,
			],
		],
	},
	// top
	{
		d: {x: 0, y: 1, z: 0},
		inverseIndex: 5,
		vertices: new Float32Array([
			-0.5, 0.5, 0.5,
			0.5, 0.5, -0.5,
			-0.5, 0.5, -0.5,
			-0.5, 0.5, 0.5,
			0.5, 0.5, 0.5,
			0.5, 0.5, -0.5,
		]),
		uvs: [
			[
				0, 0,
				1, 1,
				1, 0,
				0, 0,
				0, 1,
				1, 1,
			],
		],
	},
	// bottom
	{
		d: {x: 0, y: -1, z: 0},
		inverseIndex: 4,
		vertices: new Float32Array([
			-0.5, -0.5, -0.5,
			0.5, -0.5, -0.5,
			-0.5, -0.5, 0.5,
			0.5, -0.5, 0.5,
			-0.5, -0.5, 0.5,
			0.5, -0.5, -0.5,
		]),
		uvs: [
			[
				0, 1,
				0, 0,
				1, 1,
				1, 0,
				1, 1,
				0, 0,
			],
		],
	},
];

const rotatePointAroundUnitVector=(u, p, ang)=>({x: p.x*(Math.cos(ang)+u.x*u.x*(1-Math.cos(ang)))+p.y*(u.x*u.y*(1-Math.cos(ang))-u.z*Math.sin(ang))+p.z*(u.x*u.z*(1-Math.cos(ang))+u.y*Math.sin(ang)), y: p.x*(u.x*u.y*(1-Math.cos(ang))+u.z*Math.sin(ang))+p.y*(Math.cos(ang)+u.y*u.y*(1-Math.cos(ang)))+p.z*(u.y*u.z*(1-Math.cos(ang))-u.x*Math.sin(ang)), z: p.x*(u.x*u.z*(1-Math.cos(ang))-u.y*Math.sin(ang))+p.y*(u.y*u.z*(1-Math.cos(ang))+u.x*Math.sin(ang))+p.z*(Math.cos(ang)+u.z*u.z*(1-Math.cos(ang)))});
const quaternionToEuler=(q)=>({x: Math.atan2(2*(q.w*q.z+q.y*q.x), 1-(2*(q.z*q.z+q.y*q.y))), y: Math.asin(2*(q.w*q.y-q.x*q.z)), z: Math.atan2(2*(q.w*q.x+q.z*q.y), 1-(2*(q.y*q.y+q.x*q.x)))});