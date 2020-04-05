//create the camera
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;  // the canvas default
const near = 1;
const far = 500;
var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
camera.position.set( 0, 0, 25 );
camera.lookAt( 0, 0, 0 )

//create the renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

//create the scene
var scene = new THREE.Scene();

{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
}

var boxWidth = 5;
var boxHeight = 5;
var boxDepth = 5;
var boxgeo = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );
var green_mesh_basic = new THREE.MeshPhongMaterial( { color: 0x44aa88 } );
var cube = new THREE.Mesh( boxgeo, green_mesh_basic );
scene.add( cube );

var line_geo = new THREE.Geometry();

var point1 = -10;
var point2 = 10;
var point3 = 10;

line_geo.vertices.push(new THREE.Vector3( point1, 0, 0) );
line_geo.vertices.push(new THREE.Vector3( 0, point2, 0) );
line_geo.vertices.push(new THREE.Vector3( point3, 0, 0) );
var blue_line_basic = new THREE.LineBasicMaterial( { color: 0xff0000 } );
var line = new THREE.Line( line_geo, blue_line_basic );
scene.add(line)


//animate the scene, so the cube rotates
function animate() {
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();