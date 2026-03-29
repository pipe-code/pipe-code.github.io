import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useLang } from '@/context/LanguageContext'
import { MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import StackGrid from '@/components/StackGrid'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const SVG_CONTENT = `<svg width="189" height="202" viewBox="0 0 189 202" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M160 14.0784C160.2 17.1784 159.5 20.2784 158.1 22.9784C156.1 27.3784 155.6 31.4784 159 35.7784C161.2 38.5784 161.4 42.3784 159.2 44.9784C155.1 49.8784 156.8 54.3784 158.6 59.2784C160.9 65.3784 161.1 71.4784 156.9 76.9784C155.9 78.1784 154.8 79.2784 153.5 80.1784C150.9 82.1784 148.8 81.2784 146.8 79.1784C144.8 77.0784 144.3 74.6784 146.4 72.7784C150.3 69.0784 149.4 64.8784 147.7 60.9784C144.9 54.5784 144.8 48.3784 147.8 42.0784C148.4 40.7784 148.3 39.2784 147.6 37.9784C144.6 32.2784 145 26.4784 147.4 20.6784C149.2 16.1784 149.8 11.9784 146.4 7.87839C144.7 5.77839 145.1 3.6784 147 1.7784C148.9 -0.121597 151.2 -0.621591 153.6 0.878409C158.2 3.97841 160.3 8.37841 160 14.0784Z" fill="#3D92CB"/>
<path d="M113.5 66.2785C114.4 63.4785 115 60.0785 116.3 56.9785C118.1 52.9785 117.5 49.3785 115.4 45.9785C113.2 42.2785 112.6 38.9785 115.5 35.3785C118.3 31.8785 117.9 27.9785 116.2 24.0785C113.6 17.9785 112.4 11.9785 115.8 5.67851C118.2 1.17851 123.3 -1.1215 126.5 1.3785C129.1 3.3785 129.7 5.97849 127.5 8.37849C124.1 11.8785 124.5 15.4785 126.1 19.4785C128.7 25.9785 129.3 32.3785 126.2 38.8785C125.5 40.3785 125.8 41.8785 126.5 43.3785C129.2 49.1785 128.5 55.0785 126.4 60.7785C124.9 64.8785 123.6 68.6785 127.3 72.6785C129.5 74.9785 129.1 77.8785 126.4 80.1785C123.8 82.3785 121.8 81.3785 119.6 79.6785C115.4 76.2785 114.1 71.7785 113.5 66.2785Z" fill="#3D92CB"/>
<path d="M99.8998 201.979C98.6998 201.479 97.2998 201.579 95.9998 201.379C88.4998 200.079 81.4998 197.279 74.7998 193.679C56.0998 183.579 44.7998 167.879 39.3998 147.579C38.0998 142.679 37.9998 137.579 37.7998 132.479C37.3998 118.479 37.5998 104.379 37.5998 90.3785C37.5998 85.0785 37.5998 79.7785 37.5998 74.3785C37.5998 73.5785 37.7998 73.2786 38.6998 73.2786C47.3998 73.2786 55.9998 73.2786 64.6998 73.2786C65.5998 73.2786 65.7998 73.4785 65.7998 74.4785C65.7998 83.8785 65.7998 93.2786 65.7998 102.679C65.7998 106.379 65.8998 110.079 66.1998 113.879C66.8998 120.979 72.5998 126.479 79.6998 126.879C85.1998 127.179 89.7998 125.179 92.7998 120.479C94.1998 118.379 95.6998 117.679 98.1998 117.779C124.9 117.879 151.5 117.879 178.2 117.779C179.5 117.779 179.8 118.179 179.8 119.379C179.7 125.979 179.8 132.579 179.2 139.079C178.3 148.479 175.4 157.379 170.9 165.579C163.2 179.679 151.6 189.579 137.1 196.279C130.6 199.279 123.9 201.479 116.7 201.679C116.5 201.679 116.4 201.679 116.3 201.879L99.8998 201.979Z" fill="white"/>
<path d="M188 106.779C187.4 108.379 186.2 109.579 185 110.779C183.9 111.879 182.8 112.279 181.2 112.279C154.8 112.179 128.4 112.179 101.9 112.179C99.1002 112.179 96.3001 111.979 93.6001 111.879C90.0001 111.779 87.7001 108.679 87.2001 105.879C86.7001 102.579 87.6001 99.6785 90.2001 97.4785C91.2001 96.5785 92.6001 95.9785 94.0001 95.8785C101.2 95.4785 108.4 95.4785 115.6 95.4785C134.3 95.3785 153.1 95.3785 171.8 95.5785C174.9 95.5785 177.9 95.6785 181 95.8785C184.7 96.0785 187.1 98.3785 187.8 101.979C187.8 102.179 187.7 102.479 188.1 102.579V106.779H188Z" fill="white"/>
<path d="M0 26.2785C3.7 22.2785 8.00001 19.2785 12.7 16.6785C17.2 14.1785 21.9 12.2785 27 11.4785C41.9 8.97851 56.1 18.4785 59.6 33.1785C60.5 36.8785 60.6 40.6785 60.9 44.4785C61 45.1785 60.6 45.1785 60.1 45.1785C54.7 45.5785 49.2 45.4785 43.8 45.1785C43.1 45.1785 43.1 44.8785 43.1 44.3785C43.1 42.3785 43.1 40.2785 42.7 38.2785C41.5 33.1785 37.5 27.7785 29.4 28.8785C22 29.8785 14.9 32.4785 8.70001 36.5785C7.20001 37.5785 7.20001 37.4785 6.20001 36.0785C4.10001 33.1785 1.9 30.3785 0 27.2785V26.2785Z" fill="white"/>
<path d="M50.0999 51.0785C55.2999 51.0785 60.3999 50.8785 65.4999 51.2785C66.3999 51.3785 67.1998 51.4785 68.0998 51.5785C72.3998 52.4785 74.8999 56.4785 73.9999 61.2785C73.2999 65.2785 70.8998 67.0785 66.0998 67.4785C59.1998 67.9785 52.2999 67.7785 45.3999 67.7785C42.1999 67.7785 38.9999 67.7785 35.8999 67.2785C30.8999 66.4785 28.1999 62.4785 29.4999 57.4785C29.7999 56.1785 30.4999 54.8785 31.3999 53.7785C32.7999 52.0785 34.5999 51.2785 36.7999 51.1785C38.9999 51.1785 41.1999 50.9785 43.3999 50.9785C45.6999 51.0785 47.8999 51.0785 50.0999 51.0785Z" fill="white"/>
</svg>`

const SVG_W = 189
const SVG_H = 202
const SCALE = 0.034   // ~10% smaller than before
const EXTRUDE_DEPTH = 15  // half the thickness

interface MeshData {
  geometry: THREE.BufferGeometry
  isBlue: boolean
}

// Canvas-based radial gradient texture so the glow IS captured in the
// transmission background buffer (ShaderMaterial with AdditiveBlending is not).
function makeGlowTexture(): THREE.CanvasTexture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const r = size / 2
  const grad = ctx.createRadialGradient(r, r, 0, r, r, r)
  grad.addColorStop(0,    'rgba(30,110,220,1)')
  grad.addColorStop(0.15, 'rgba(30,110,220,0.7)')
  grad.addColorStop(0.45, 'rgba(20,80,180,0.3)')
  grad.addColorStop(1,    'rgba(10,50,150,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function Scene({ mouseRef }: { mouseRef: React.RefObject<THREE.Vector2> }) {
  const lightRef = useRef<THREE.PointLight>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  const { viewport } = useThree()

  const meshes = useMemo<MeshData[]>(() => {
    const loader = new SVGLoader()
    const result = loader.parse(SVG_CONTENT)

    const extrudeOpts = {
      depth: EXTRUDE_DEPTH,
      bevelEnabled: true,
      bevelThickness: 1.5,
      bevelSize: 1,
      bevelSegments: 10,
    }

    const blueGeos: THREE.BufferGeometry[] = []
    const whiteGeos: THREE.BufferGeometry[] = []

    result.paths.forEach(path => {
      const shapes = SVGLoader.createShapes(path)
      const geo = new THREE.ExtrudeGeometry(shapes, extrudeOpts)
      const c = path.color
      if (c.r < 0.5 && c.b > 0.5) blueGeos.push(geo)
      else whiteGeos.push(geo)
    })

    return [
      { geometry: BufferGeometryUtils.mergeGeometries(blueGeos), isBlue: true },
      { geometry: BufferGeometryUtils.mergeGeometries(whiteGeos), isBlue: false },
    ]
  }, [])

  const glowMaterial = useMemo(() => {
    const tex = makeGlowTexture()
    return new THREE.MeshBasicMaterial({
      map: tex,
      color: new THREE.Color('#1e6edc'),
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  }, [])

  useFrame(() => {
    if (!mouseRef.current) return
    const tx = mouseRef.current.x * (viewport.width / 2)
    const ty = mouseRef.current.y * (viewport.height / 2)

    // Smooth follow
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, tx, 0.1)
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, ty, 0.1)
    }
    if (glowRef.current) {
      glowRef.current.position.x = THREE.MathUtils.lerp(glowRef.current.position.x, tx, 0.1)
      glowRef.current.position.y = THREE.MathUtils.lerp(glowRef.current.position.y, ty, 0.1)
    }

    // Subtle parallax tilt on logo
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseRef.current.x * 0.12,
        0.04
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouseRef.current.y * 0.08,
        0.04
      )
    }
  })

  // Scale down on narrow viewports so the logo always fits — never scale up
  const logoW = SVG_W * SCALE
  const logoH = SVG_H * SCALE
  const fit = Math.min(
    1,
    (viewport.width  * 0.88) / logoW,
    (viewport.height * 0.82) / logoH,
  )
  const s = SCALE * fit

  // Center SVG coordinate space at world origin
  const cx = (-SVG_W / 2) * s
  const cy = (SVG_H / 2) * s
  const cz = -(EXTRUDE_DEPTH * s) / 2

  return (
    <>
      {/* Radial glow plane behind the crystal — captured by MeshTransmissionMaterial's render pass */}
      <mesh ref={glowRef} position={[0, 0, -2]} material={glowMaterial}>
        <planeGeometry args={[20, 20]} />
      </mesh>

      {/* Backlight — blue, behind the crystal so transmission bends/tints it */}
      <pointLight
        ref={lightRef}
        position={[0, 0, -2]}
        intensity={400}
        color="#3D92CB"
        distance={30}
        decay={2}
      />

      {/* Tech stack logos scattered in deep background */}
      <StackGrid />

      {/* Very dim ambient so crystal silhouette is barely visible in the dark */}
      <ambientLight intensity={0.04} color="#aaccff" />

      {/* Crystal logo */}
      <group
        ref={groupRef}
        position={[cx, cy, cz]}
        scale={[s, -s, s]}
      >
        {meshes.map(({ geometry, isBlue }, i) => (
          <mesh key={i} geometry={geometry}>
            <MeshTransmissionMaterial
              color={isBlue ? '#a8d8f0' : '#e8f4ff'}
              transmission={1}
              roughness={0.01}
              thickness={isBlue ? 1.5 : 1.2}
              ior={1.55}
              chromaticAberration={0.04}
              attenuationColor={isBlue ? '#1a6aaa' : '#7aaacc'}
              attenuationDistance={isBlue ? 2 : 4}
              backside
              samples={16}
              resolution={512}
            />
          </mesh>
        ))}
      </group>
    </>
  )
}

type DoEWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<PermissionState>
}

export default function GlassLogo() {
  const { t } = useLang()
  const mouseRef   = useRef(new THREE.Vector2(0, 0))
  const onGyroRef  = useRef<((e: DeviceOrientationEvent) => void) | null>(null)
  const [showTap, setShowTap] = useState(false)
  const [tapFading, setTapFading] = useState(false)

  useEffect(() => {
    const isTouch = navigator.maxTouchPoints > 0

    if (!isTouch) {
      const onMove = (e: MouseEvent) => {
        mouseRef.current.x =  (e.clientX / window.innerWidth)  * 2 - 1
        mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
      }
      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    }

    // gamma: left-right tilt (-90→90°), beta: front-back (0→180°, 90° = upright)
    const onGyro = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0
      const beta  = e.beta  ?? 90
      mouseRef.current.x = Math.max(-1, Math.min(1, gamma / 45))
      mouseRef.current.y = Math.max(-1, Math.min(1, (90 - beta) / 45))
    }
    onGyroRef.current = onGyro

    const DoE = DeviceOrientationEvent as DoEWithPermission

    if (typeof DoE.requestPermission === 'function') {
      // iOS 13+: show tap prompt — permission must come from a direct user gesture
      setShowTap(true)
    } else {
      // Android / browsers without permission gate
      window.addEventListener('deviceorientation', onGyro)
      return () => window.removeEventListener('deviceorientation', onGyro)
    }
  }, [])

  const handleTapPermission = () => {
    const DoE = DeviceOrientationEvent as DoEWithPermission
    DoE.requestPermission!().then(state => {
      if (state === 'granted' && onGyroRef.current) {
        window.addEventListener('deviceorientation', onGyroRef.current)
      }
      // fade out regardless of decision
      setTapFading(true)
      setTimeout(() => setShowTap(false), 600)
    })
  }

  return (
    <>
      <Canvas
        style={{ position: 'fixed', inset: 0 }}
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <color attach="background" args={['#000000']} />
        <Scene mouseRef={mouseRef} />
      </Canvas>

      {showTap && (
        <button
          onClick={handleTapPermission}
          style={{
            position:        'fixed',
            bottom:          40,
            left:            '50%',
            transform:       'translateX(-50%)',
            background:      'rgba(17,17,27,0.72)',
            border:          '1px solid #313244',
            borderRadius:    6,
            padding:         '7px 18px',
            fontFamily:      '"JetBrains Mono", monospace',
            fontSize:        11,
            color:           '#7f849c',
            cursor:          'pointer',
            letterSpacing:   '0.06em',
            backdropFilter:  'blur(8px)',
            zIndex:          200,
            opacity:         tapFading ? 0 : 1,
            transition:      'opacity 0.6s ease',
            pointerEvents:   tapFading ? 'none' : 'auto',
          }}
        >
          {t('common', 'gyro_prompt')}
        </button>
      )}
    </>
  )
}
