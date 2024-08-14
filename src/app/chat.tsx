import useMessagesStore from '@/store/useMessagesStore'
import { useEffect } from 'react'

const Chat = () => {
  const { messages } = useMessagesStore()

  // Scroll to bottom when new message is added
  useEffect(() => {
    const chatEl = document.getElementById('messages-chat')
    chatEl?.scrollTo(0, chatEl.scrollHeight)
  }, [messages])

  if (!messages) return null

  return (
    <div
      id='messages-chat'
      className='flex-1 h-full w-full  overflow-auto rounded-lg p-8 flex justify-center'
    >
      <div className='h-full flex flex-col max-w-4xl w-full '>
        {messages.map((message, index) => (
          <div
            key={index}
            className={` bg-primary/60 md:max-w-[70%] min-w-[40%] p-2 rounded-lg  border-b-[0.5px] mb-4 shadow-sm ${
              message.role === 'user'
                ? 'text-right shadow-purple-900 border-b-purple-400 ml-auto'
                : 'text-left shadow-emerald-900 border-b-emerald-400 mr-auto'
            } `}
          >
            <span
              className={` text-sm tracking-widest uppercase font-black
              ${
                message.role === 'user'
                  ? 'text-purple-600/60 '
                  : 'text-emerald-600/60'
              }
            `}
            >
              {message.role}
            </span>
            <p className='text-white/60 text-xl font-thin tracking-wide'>
              {message.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Chat }
