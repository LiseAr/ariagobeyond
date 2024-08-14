import { useEffect } from 'react'

const usePermissions = () => {
  const getPermissions = async () => {
    await navigator.mediaDevices.getUserMedia({ audio: true })
  }
  useEffect(() => {
    getPermissions()
  }, [])
}

export { usePermissions }
