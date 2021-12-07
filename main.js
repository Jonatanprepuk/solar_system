import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Group, Material, Mesh, MeshStandardMaterial, SphereGeometry, TextureLoader } from 'three';
import ScrollOut from "scroll-out";

//Set up

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

camera.position.set(-3,5,20)

renderer.render(scene,camera);

// Window resize handling 
function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// Contols 
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = -1;

// Background stars 
const backgroundStars = new THREE.TextureLoader().load('https://i.ibb.co/VSWH891/background.jpg');
scene.background = backgroundStars;

//planets 
const scale = 1.5;

// Sun 
const sunTexture = new THREE.TextureLoader().load('https://i.ibb.co/XjK0hcW/sun-Texture.jpg');
const sunRadius = 6.96

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(sunRadius,32,32), // radie / 100 000
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);
scene.add(sun);

// Mercury 
const mercuryTexture = new THREE.TextureLoader().load('https://i.ibb.co/CJr9fcF/mercury-Texture.jpg');
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(0.2440), //radie i km/10000km
  new THREE.MeshStandardMaterial({
    map: mercuryTexture
  })
);
 // ((antalet au * 10) + solens radie) * scale
mercury.name = 'mercury';
scene.add(mercury);
const mercuryOrbit = 47/1000; // hastighet/1000;
const mercuryDay = 0.1/58.65; // 0.01/antalet dagar runt axel
const mercuryDistance = 5.79 //avstånd till solen (km) / 1 000 000


// Venus
const venusTexture = new THREE.TextureLoader().load('https://i.ibb.co/cXjYwS2/venus-Texture.jpg');
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(0.6051), // radie i km / 10000km
  new THREE.MeshStandardMaterial({
    map: venusTexture
  })
)
venus.name = 'venus';
scene.add(venus);
const venusOrbit = 35/1000;
const venusDay = 1/225;
const venusDistance = 10.8;

// Earth 
const earhTexture = new THREE.TextureLoader().load('https://i.ibb.co/XCb4WFg/earth-Texture.jpg');
//const earthNormalMap = new THREE.TextureLoader().load('./textures/earthNormalMap.jpg'); FUNKAR INTE MED AMBIENT LIGHT 
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.6371),
  new THREE.MeshStandardMaterial({
    map: earhTexture
   // normalMap: earthNormalMap FUNKAR INTE MED AMBIENT LIGHT 
  })
)
earth.name = 'earth';
scene.add(earth);
const earthOrbit = 30/1000;
const earthDay = .015;
const earthDistance = 14.9;

// Moon 
const moonTexture = new THREE.TextureLoader().load('https://i.ibb.co/FmbYVx8/moon-Texture.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.1737),
  new THREE.MeshStandardMaterial({
    map: moonTexture
  })
)
scene.add(moon);
const moonOrbit =  1.03/10;
const moonDistance = 0.384 + 0.6371;

// Mars
const marsTexture = new THREE.TextureLoader().load('https://i.ibb.co/0JCnpmY/mars-Texture.jpg');
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(0.339),
  new THREE.MeshStandardMaterial({
    map: marsTexture
  })
)
mars.name = 'mars';
scene.add(mars);
const marsOrbit = 24.1/1000;
const marsDay = 0.012;
const marsDistance = 22.79;

// Asteroid belt
const group = new THREE.Group();
function addAsteroid(){
  const asteroidTexture = new THREE.TextureLoader().load('https://i.ibb.co/BrJm7Nv/asteroid-Texture.jpg');
  const asteroid = new THREE.Mesh(
  new THREE.DodecahedronGeometry(0.1),
  new THREE.MeshStandardMaterial({
    map: asteroidTexture
  }));

  const r = THREE.MathUtils.randFloat(35.3, 49.36);
  const x = Array(1).fill().map(() => THREE.MathUtils.randFloat(-r,r));
  const y = THREE.MathUtils.randFloat(-0.5,0.5)

  let randomOne = [-1,1] 
  const z = Array(1).fill().map(() => Math.sqrt(Math.pow(r,2)-Math.pow(x,2)) * randomOne[Math.floor(Math.random()* 2)]);


  asteroid.position.set(x,y,z);

  group.add(asteroid);
}

Array(500).fill().forEach(addAsteroid);
// lite bugg med cirkel lite glest på vissa ställen. 
scene.add(group);

const CamMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
CamMaterial.opacity = 0;
CamMaterial.transparent = true;

// asteroid cam
const astCam = new THREE.Mesh(
  new SphereGeometry(0.3),
  CamMaterial
);
scene.add(astCam);
const astCamOrbit = 20/1000;
const astCAmDistance = 35;

// Jupiter
const jupiterTexture = new THREE.TextureLoader().load('https://i.ibb.co/vYSZT5L/jupiter-Texture.jpg');
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(6.9),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture
  })
)
jupiter.name = 'jupiter';
scene.add(jupiter);
const jupiterOrbit = 13/1000; // hastighet/1000;
const jupiterDay = 0.032; // 0.01/antalet dagar runt axel
const jupiterDistance = 77.85 //avstånd till solen (km) / 1 000 000

// Saturn 
const saturnTexture = new THREE.TextureLoader().load('https://i.ibb.co/cYTx9Qf/saturn-Texture.jpg');
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(5.82),
  new THREE.MeshStandardMaterial({
    map: saturnTexture
  })
)

// Saturn ring
const saturnRingTexture = new TextureLoader().load('https://i.ibb.co/ySKP56S/saturn-Ring-Texture.jpg');
const saturnRing = new THREE.Mesh(
  new THREE.RingGeometry(6.69,10.09,32),
  new THREE.MeshStandardMaterial({
    map: saturnRingTexture,
    side: THREE.DoubleSide
  })
)
saturn.name = 'saturn';
saturnRing.rotation.x = Math.PI/2 - 0.3712;
scene.add(saturnRing);
scene.add(saturn);
const saturnOrbit = 9.69/1000; // hastighet/1000;
const saturnDay = 0.028; // 0.01/antalet dagar runt axel
const saturnDistance = 143 //avstånd till solen (km) / 1 000 000

// Uranus 
const uranusTexture = new THREE.TextureLoader().load('https://i.ibb.co/cxgTq2N/uranus-Texture.jpg');
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(2.536),
  new THREE.MeshStandardMaterial({
    map: uranusTexture
  })
)
uranus.name = 'uranus';
scene.add(uranus);
const uranusOrbit = 6.80/1000; // hastighet/1000;
const uranusDay = 0.018; // 0.01/antalet dagar runt axel
const uranusDistance = 287 //avstånd till solen (km) / 1 000 000

// Neptune 
const neptuneTexture = new THREE.TextureLoader().load('https://i.ibb.co/3h2QBpG/neptune-Texture.jpg');
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(2.4622),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture
  })
)
neptune.name = 'neptune';
scene.add(neptune);
const neptuneOrbit = 5.43/1000; // hastighet/1000;
const neptuneDay = 0.0023; // 0.01/antalet dagar runt axel
const neptuneDistance = 449.5 //avstånd till solen (km) / 1 000 000

// Pluto 

const plutoTexture = new THREE.TextureLoader().load('https://i.ibb.co/p3QjQtv/pluto-Texture.png');
const pluto = new THREE.Mesh(
  new THREE.SphereGeometry(0.1188),
  new THREE.MeshStandardMaterial({
    map: plutoTexture
  })
)
pluto.name = 'pluto';
scene.add(pluto);
const plutoOrbit = 4.7/1000; // hastighet/1000;
const plutoDay = 0.020; // 0.01/antalet dagar runt axel
const plutoDistance = 590.5 //avstånd till solen (km) / 1 000 000


// Light 
const ambientLight = new THREE.AmbientLight(0xffffff);

// Helpers 
const gridHelper = new THREE.GridHelper(200,50);
//scene.add(gridHelper);
scene.add(ambientLight);


// Move camera on scroll 

ScrollOut({
  targets: ".planets",
});

const allPlanets = ['sun', 'mercury', 'venus', 'earth', 'mars', 'astroid', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
const allPlanetsObj = [sun, mercury, venus, earth, mars, group, jupiter, saturn, uranus, neptune, pluto];

// On / Off switch

function checkbox(){
  var checkboxVal = document.getElementById("switch").checked;

  var text = document.getElementsByClassName("planets");
  var header = document.getElementById("header");
  var div = document.getElementById("source");

  if(!checkboxVal){
    
    for(let i = 0; i < text.length; i++){
      text.item(i).style.display = "block";
    }
    header.style.display = "block";
    div.style.display = "block";


  }else{
    controls.autoRotateSpeed = -1;

    for(let i = 0; i < text.length; i++){
      text.item(i).style.display = "none";
    }
    header.style.display = "none";
    div.style.display = "none";
    controls.maxDistance = 500;
    
  }
}

// Click to remove function

const raycaster = new THREE.Raycaster();
const clickMouse = new THREE.Vector2();
const moveMouse = new THREE.Vector2();

window.addEventListener('click', event => {
  clickMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	clickMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera(clickMouse,camera);
  const intersects = raycaster.intersectObjects( scene.children );


  if(intersects.length > 0){
    controls.target = intersects[0].object.position
    controls.autoRotate = true;
    controls.maxDistance = intersects[0].object.geometry.boundingSphere.radius * 2;
    controls.minDistance = intersects[0].object.geometry.boundingSphere.radius;

    var element = document.getElementById(intersects[0].object.name);

    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
})

// Animation 
var t = 0; 
function animate(){
  requestAnimationFrame(animate);
  t += 0.033333; // 30fps 1second orbtal period  

  sun.rotation.y += .01/35; // 0.01/antalet dagar runt axel

  mercury.rotation.y += mercuryDay;
  mercury.position.x = (mercuryDistance + sunRadius) * Math.sin(t * mercuryOrbit);  
  mercury.position.z = (mercuryDistance + sunRadius) * Math.cos(t * mercuryOrbit);

  venus.rotation.y += venusDay;
  venus.position.x = (venusDistance + sunRadius) * Math.sin(t * venusOrbit);
  venus.position.z = (venusDistance + sunRadius) * Math.cos(t * venusOrbit);

  earth.rotation.y += earthDay;
  earth.position.x = (earthDistance + sunRadius) * Math.sin(t * earthOrbit) ;
  earth.position.z = (earthDistance + sunRadius) * Math.cos(t * earthOrbit);

  moon.position.x = earth.position.x + moonDistance * Math.sin(t * moonOrbit);
  moon.position.z = earth.position.z + moonDistance * Math.cos(t * moonOrbit);

  mars.rotation.y += marsDay;
  mars.position.x = (marsDistance + sunRadius) * Math.sin(t * marsOrbit);
  mars.position.z = (marsDistance + sunRadius) * Math.cos(t * marsOrbit);

  group.rotation.y += 0.001
  astCam.position.x = (astCAmDistance + sunRadius) * Math.sin(t * astCamOrbit);
  astCam.position.z = (astCAmDistance + sunRadius) * Math.cos(t * astCamOrbit);

  jupiter.rotation.y += jupiterDay;
  jupiter.position.x = (jupiterDistance + sunRadius) * Math.sin(t * jupiterOrbit);
  jupiter.position.z = (jupiterDistance + sunRadius) * Math.cos(t * jupiterOrbit);

  saturn.rotation.y += saturnDay;
  saturn.position.x = (saturnDistance + sunRadius) *  Math.sin(t *saturnOrbit);
  saturn.position.z = (saturnDistance + sunRadius) *  Math.cos(t *saturnOrbit);
  
  saturnRing.position.x = saturn.position.x;
  saturnRing.position.z = saturn.position.z;
  saturnRing.rotation.z += saturnDay;
  saturnRing.rotation.y = Math.sin(t * 0.5 ) * 0.05;

  uranus.rotation.y += uranusDay;
  uranus.position.x = (uranusDistance + sunRadius) * Math.sin(t * uranusOrbit);
  uranus.position.z = (uranusDistance + sunRadius) * Math.cos(t * uranusOrbit);
  
  neptune.rotation.y += neptuneDay;
  neptune.position.x = (neptuneDistance + sunRadius) * Math.sin(t * neptuneOrbit);
  neptune.position.z = (neptuneDistance + sunRadius) * Math.cos(t * neptuneOrbit);

  pluto.rotation.y += plutoDay;
  pluto.position.x = (plutoDistance + sunRadius) * Math.sin(t * plutoOrbit);
  pluto.position.z = (plutoDistance + sunRadius) * Math.cos(t * plutoOrbit);


  // -------------------------------------------------------------------------------------- \\

  for(let i = 0; i < allPlanets.length; i++){
    let inOut = document.querySelector(`#${allPlanets[i]}`).dataset.scroll;

    if(inOut === 'in'){
      let planet = allPlanetsObj[i];
      if(planet === group){
        controls.target = new THREE.Vector3(astCam.position.x,2,astCam.position.z);
        camera.lookAt(new THREE.Vector3(astCam.position.x,-10,astCam.position.z));
        controls.maxDistance = 2;
        controls.minDistance = 2;
    
      }else{
        controls.autoRotate = true
        controls.target = planet.position;
        camera.lookAt(planet.position);
        controls.maxDistance = planet.geometry.parameters.radius * 4;
        controls.minDistance = planet.geometry.parameters.radius * 4;
      }
    }
  }

  checkbox();

  controls.update();

  renderer.render(scene, camera);
}

animate();



