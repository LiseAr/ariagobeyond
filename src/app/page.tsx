'use client'

import useAppStore from '@/store/useAppStore'
import { useSessionStore } from '@/store/useSessionStore'
import useSynthStore from '@/store/useSynthStore'
import { Menu } from '@/components/icons/menu'
import { Loading } from '@/components/Loading'

import { Chat } from './chat'
import { Input } from './input'
import { Header } from './header'
import { Mic } from './mic'
import { SideBar } from './sideBar'
import useAgent from '@/hooks/useAgent'

export default function Main() {
  useAgent()
  const { toggleSideBar } = useAppStore()
  const { sessionId } = useSessionStore()
  const { synth, utterance } = useSynthStore()

  if (!sessionId || !synth || !utterance?.voice) return <Loading />

  return (
    <div className='bg-gradient-to-b to-primary from-primary w-screen h-screen flex transition-all duration-300 ease-in-out'>
      <div className='fixed left-0 p-2 z-50'>
        <Menu onClick={toggleSideBar} />
      </div>
      <SideBar />
      <div className='flex flex-col flex-1 '>
        <Header />

        <div className='overflow-hidden w-full h-full flex flex-col items-center transition-all duration-300 ease-in-out'>
          <Chat />

          <div className='w-full flex justify-center items-center p-4  transition-all duration-300 ease-in-out'>
            <Input />
            <Mic />
          </div>
        </div>
      </div>
    </div>
  )
}
