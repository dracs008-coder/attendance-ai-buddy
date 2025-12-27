import { useRef, useState, useEffect } from 'react'
import Spline from '@splinetool/react-spline'
import ErrorBoundary from '../ErrorBoundary'

interface InteractiveRobotSplineProps {
  scene: string
  className?: string
}

export function InteractiveRobotSpline({ scene: _scene, className }: InteractiveRobotSplineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)
  const SCENE_WIDTH = 1200
  const SCENE_HEIGHT = 900

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof ResizeObserver === 'undefined') return

    const handleResize = () => {
      const rect = el.getBoundingClientRect()
      const s = Math.min(rect.width / SCENE_WIDTH, rect.height / SCENE_HEIGHT)
      setScale(s || 1)
    }

    handleResize()
    const ro = new ResizeObserver(handleResize)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={`w-full h-full relative overflow-hidden ${className ?? ''}`}>
      <ErrorBoundary
        fallback={
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-900 text-white rounded-lg">
            <span>Unable to load 3D preview.</span>
          </div>
        }
      >
        <div className="absolute inset-0 flex items-center justify-center">
            <div
              style={{
                width: SCENE_WIDTH,
                height: SCENE_HEIGHT,
                transform: `translate(-50%, -50%) scale(${Math.max(scale * 1.05, 0.5)})`,
                position: 'absolute',
                left: '50%',
                top: '50%',
                transformOrigin: 'center center',
              }}
            >
              <Spline
                scene={_scene}
                className="w-full h-full"
                renderOnDemand={false}
              />
            </div>
          </div>
      </ErrorBoundary>
    </div>
  )
}

