import { useEffect } from 'react'
import { useChat } from 'ai/react'
import useMessagesStore, {
  ROLE,
  SYSTEM_MESSAGE_STATUS
} from '@/store/useMessagesStore'
import { usePrisma } from '@/hooks/usePrisma'

const Input = () => {
  const {
    messages: messagesAI,
    input,
    handleSubmit: handleSubmitAI,
    setInput,
    isLoading
  } = useChat()

  const { generateSessionTitle, addMessage } = usePrisma()

  const { appendMessage, messages: chatMessages } = useMessagesStore()

  // Se a última mensagem for do usuário e estiver finalizada
  // Seta input com a última mensagem do usuário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmitAI(e)
  }

  // Se a última mensagem for do usuário e estiver finalizada
  // Seta input com a última mensagem do usuário
  // E simula um click no botão de submit
  useEffect(() => {
    const lastMessage = chatMessages[chatMessages.length - 1]
    if (
      lastMessage?.role === ROLE.USER &&
      lastMessage?.status === SYSTEM_MESSAGE_STATUS.DONE
    ) {
      setInput(lastMessage.content)
      setTimeout(() => {
        const btn = document.getElementById('submitchat')
        if (btn) btn.click()
        setTimeout(() => {
          if (chatMessages.length === 2) generateSessionTitle([lastMessage])
        }, 1000)
      }, 1000)
    }
  }, [chatMessages])

  // Se a última mensagem recebida da lib de IA for diferente de null
  // Adiciona a mensagem na lista de mensagens da aplicação
  // com o status: processing se estiver carregando e done se tinha finalizado
  // E se tiver finalizado de caregar a resposta, adiciona a mensagem ao BD
  useEffect(() => {
    const lastMessage = messagesAI[messagesAI.length - 1]
    if (!lastMessage) return
    appendMessage({
      ...lastMessage,
      status: isLoading
        ? SYSTEM_MESSAGE_STATUS.PROCESSING
        : SYSTEM_MESSAGE_STATUS.DONE
    })
    if (!isLoading) addMessage(lastMessage.content, ROLE.ASSISTANT)
  }, [messagesAI, isLoading])

  return (
    <div className='w-full max-w-4xl h-fit'>
      <form
        className=' bg-primary w-full h-fit rounded-full overflow-hidden font-thin text-white/50 text-lg border-[1px] border-purple-800/40 focus-within:border-purple-800/80 shadow-sm '
        onSubmit={handleSubmit}
      >
        <input
          className='bg-secondary/30 w-full rounded-full px-6 h-14 outline-none '
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Faça uma pergunta'
        />
        <button id='submitchat' className='hidden' type='submit' />
      </form>
    </div>
  )
}

export { Input }
