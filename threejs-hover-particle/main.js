import './style.css'
import * as THREE from 'three'
import dat from 'dat.gui'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import gsap from 'gsap'
var gui = new dat.GUI()
var world = { width: 15, height: 15, widthSegment: 17, heightSegment: 17 }
gui.add(world, 'width', 1, 15).onChange(() => generateMetarial())
gui.add(world, 'height', 1, 15).onChange(() => generateMetarial())
gui.add(world, 'widthSegment', 1, 15).onChange(() => generateMetarial())
gui.add(world, 'heightSegment', 1, 15).onChange(() => generateMetarial())

const generateMetarial = () => {
  mesh.geometry.dispose()
  mesh.geometry = new THREE.PlaneGeometry(
    world.width,
    world.height,
    world.widthSegment,
    world.heightSegment
  )
  mesh.geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(new Float32Array(colors), 3)
  )
  const { array } = mesh.geometry.attributes.position
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i]
    const y = array[i + 1]
    const z = array[i + 2]

    array[i + 2] = z + Math.random()
  }
}
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const raycaster = new THREE.Raycaster()
const renderer = new THREE.WebGLRenderer({ antialias: true })
const controls = new OrbitControls(camera, renderer.domElement)
const light = new THREE.DirectionalLight(0xfffff, 1)
const backLight = new THREE.DirectionalLight(0xfffff, 1)
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)

document.body.appendChild(renderer.domElement)

const geometry = new THREE.PlaneGeometry(
  world.width,
  world.height,
  world.widthSegment,
  world.heightSegment
)
const material = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide,
  flatShading: true,
  vertexColors: true
})
const mesh = new THREE.Mesh(geometry, material)

camera.position.z = 5
light.position.set(0, 0, 1)
backLight.position.set(0, 0, -1)
scene.add(mesh)
scene.add(light)
scene.add(backLight)
const { array } = mesh.geometry.attributes.position
for (let i = 0; i < array.length; i += 3) {
  const x = array[i]
  const y = array[i + 1]
  const z = array[i + 2]

  array[i + 2] = z + Math.random()
}
let colors = []
for (let i = 0; i < array.length; i++) {
  colors.push(0, 0.19, 0.6)
}
mesh.geometry.setAttribute(
  'color',
  new THREE.BufferAttribute(new Float32Array(colors), 3)
)
const mouse = { x: undefined, y: undefined }
function animate () {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObject(mesh)
  if (intersects.length) {
    const { a, b, c } = intersects[0].face
    let { color } = intersects[0].object.geometry.attributes
    const initialColor = { r: 0, g: 0.19, b: 0.6 }
    const hoverColor = { r: 0.1, g: 0.5, b: 4 }
    color.setX(a, hoverColor.r)
    color.setY(a, hoverColor.g)
    color.setZ(a, hoverColor.b)

    color.setX(b, hoverColor.r)
    color.setY(b, hoverColor.g)
    color.setZ(b, hoverColor.b)

    color.setX(c, hoverColor.r)
    color.setY(c, hoverColor.g)
    color.setZ(c, hoverColor.b)
    color.needsUpdate = true
    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      duration: 1.5,
      onUpdate: () => {
        color.setX(a, hoverColor.r)
        color.setY(a, hoverColor.g)
        color.setZ(a, hoverColor.b)

        color.setX(b, hoverColor.r)
        color.setY(b, hoverColor.g)
        color.setZ(b, hoverColor.b)

        color.setX(c, hoverColor.r)
        color.setY(c, hoverColor.g)
        color.setZ(c, hoverColor.b)
        color.needsUpdate = true
      }
    })
  }
}
animate()
addEventListener('mousemove', e => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1
  mouse.y = -(e.clientY / innerHeight) * 2 + 1
  //console.log(mouse)
})
