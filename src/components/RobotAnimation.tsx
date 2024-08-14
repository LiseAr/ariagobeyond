'use client'
import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

export default function RobotAnimations() {
  const animationContainer = useRef<any>()

  useEffect(() => {
    lottie.loadAnimation({
      name: 'robot',
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: '/robot.json'
    })

    return () => lottie.destroy()
  }, [])

  return <div className='w-80 self-center' ref={animationContainer} />
}
