'use client'
import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import useAppStore, { ACTIONS } from '@/store/useAppStore'
import useUserStore from '@/store/useUserStore'
import { Login } from './login'

const AppContext = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [hasClicked, setHasClicked] = useState(false)

  const { setAction } = useAppStore()

  const { user, setUser } = useUserStore()

  // Verifica se o usuário clicou em algum lugar da tela
  const verifyClick = () => setHasClicked(true)

  const createPortal = () => {
    const portal = document.createElement('div')
    portal.id = 'portal-start'
    portal.style.position = 'fixed'
    portal.style.top = '0'
    portal.style.left = '0'
    portal.style.width = '100%'
    portal.style.height = '100%'
    portal.style.zIndex = '9999'
    const root = createRoot(portal)
    root.render(<Login />)
    document.body.appendChild(portal)
  }

  // Adiciona um eventListener para verificar se o usuário clicou em algum lugar da tela
  useEffect(() => {
    document.addEventListener('click', verifyClick)
    createPortal()
    const userLS = JSON.parse(localStorage.getItem('user') || '{}')
    if (userLS) setUser(userLS)
  }, [])

  useEffect(() => {
    const node = document?.getElementById('portal-start')
    if (hasClicked && user?.id) {
      if (node) node.remove()
      document.removeEventListener('click', verifyClick)
      setAction(ACTIONS.STARTED)
    }
  }, [hasClicked, user])

  return <>{children}</>
}

export { AppContext }
