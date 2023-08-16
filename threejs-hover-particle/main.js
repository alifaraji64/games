import './style.css'
import * as THREE from 'three'
import dat from 'dat.gui'
var gui = new dat.GUI()
var world = { width: 5, height: 5 }
gui.add(world, 'width', 1, 10).onChange(() => {
  mesh.geometry.dispose()
  mesh.geometry = new THREE.PlaneGeometry(world.width, world.height, 10, 10)
  const { array } = mesh.geometry.attributes.position
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i]
    const y = array[i + 1]
    const z = array[i + 2]

    array[i + 2] = z + Math.random()
  }
})
gui.add(world, 'height', 1, 10).onChange(() => {
  mesh.geometry.dispose()
  mesh.geometry = new THREE.PlaneGeometry(world.width, world.height, 10, 10)
  const { array } = mesh.geometry.attributes.position
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i]
    const y = array[i + 1]
    const z = array[i + 2]

    array[i + 2] = z + Math.random()
  }
})
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer({ antialias: true })
const light = new THREE.DirectionalLight(0xfffff, 1)
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)

document.body.appendChild(renderer.domElement)

const geometry = new THREE.PlaneGeometry(5, 5, 10, 10)
const material = new THREE.MeshPhongMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
  flatShading: true
})
const mesh = new THREE.Mesh(geometry, material)

camera.position.z = 5
light.position.set(0, 0, 10)
scene.add(mesh)
scene.add(light)
const { array } = mesh.geometry.attributes.position
for (let i = 0; i < array.length; i += 3) {
  const x = array[i]
  const y = array[i + 1]
  const z = array[i + 2]

  array[i + 2] = z + Math.random()
}
function animate () {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
