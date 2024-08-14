import { usePrisma } from '@/hooks/usePrisma'
import useAppStore from '@/store/useAppStore'
import useMessagesStore from '@/store/useMessagesStore'
import { useSessionStore } from '@/store/useSessionStore'
import useUserStore from '@/store/useUserStore'
import { getUIDate } from '@/utils/date'
import { useEffect } from 'react'

const SideBar = () => {
  const { getAllSessions } = usePrisma()
  const { sideBarOpen } = useAppStore()
  const { sessions } = useSessionStore()
  const { user } = useUserStore()

  // Clique fora da sidebar deve fechar a sidebar
  useEffect(() => {
    const closeSideBar = () => {
      if (sideBarOpen) useAppStore.getState().toggleSideBar()
    }

    document.addEventListener('click', closeSideBar)
    return () => document.removeEventListener('click', closeSideBar)
  }, [sideBarOpen])

  useEffect(() => {
    if (!user) return
    getAllSessions(user.id)
  }, [user])

  const groupedSessions = groupByDate(sessions)

  return (
    <div
      className={`
        fixed md:relative  max-w-32 
        h-full bg-secondary pt-20 transition-all duration-500 ease-in-out
        ${
          sideBarOpen
            ? 'min-w-72 md:w-fit'
            : 'transform -translate-x-full !w-0 !max-w-0 overflow-hidden'
        }
        `}
    >
      <div className='space-y-4 p-4'>
        {Object.keys(groupedSessions).map((date, index) => (
          <div className='space-y-4 p-4' key={index}>
            <p className='text-xs text-gray-400'>{date}</p>
            {groupedSessions[date].map((session: any) => (
              <SessionItem session={session} key={session.id} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export { SideBar }

// Função para agrupar as seções por data
// cria um objeto com a data como chave e um array de seções como valor
const groupByDate = (sessions: any) => {
  const result: any = {}
  sessions
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .forEach((session: any) => {
      const date = getUIDate(session.createdAt)
      if (!result[date]) {
        result[date] = []
      }
      result[date].push(session)
    })
  return result
}

const SessionItem = ({ session }: any) => {
  const { setMessages } = useMessagesStore()
  const { setSessionId } = useSessionStore()

  const handleOpenSession = () => {
    setMessages(session.messages)
    setSessionId(session.id)
  }

  return (
    <div
      onClick={() => handleOpenSession()}
      key={session.id}
      className='px-4 py-2 bg-gray-400/10 text-gray-300 rounded-md cursor-pointer 
              hover:bg-gradient-to-r from-gray-700/80 to-gray-600/30
              transition-colors duration-1000 ease-in-out
              
              '
    >
      <p
        className='text-sm text-wrap overflow-hidden line-clamp-2'
        title={session.title}
      >
        {session.title}
      </p>
      {/* {session.id} */}
    </div>
  )
}
