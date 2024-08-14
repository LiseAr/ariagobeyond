import { useEffect } from 'react'

import useAppStore, { ACTIONS } from '@/store/useAppStore'
import useMessagesStore, {
  ROLE,
  SYSTEM_MESSAGE_STATUS
} from '@/store/useMessagesStore'
import { useSessionStore } from '@/store/useSessionStore'
import useUserStore from '@/store/useUserStore'

import useSynth from './useSynth'
import { usePrisma } from './usePrisma'

const useAgent = () => {
  const { speak } = useSynth()
  const { action } = useAppStore()
  const { appendMessage, messages } = useMessagesStore()
  const { sessionId } = useSessionStore()
  const { user } = useUserStore()
  const { createSession, removeIdleSession } = usePrisma()

  //** START: CARREGANDO APLICAÇÃO

  const createWelcomeMessage = () => {
    appendMessage({
      id: '',
      role: ROLE.ASSISTANT,
      content: 'Oi humano.',
      status: SYSTEM_MESSAGE_STATUS.DONE
    })
  }

  // Ao iniciar a aplicação:
  // - Se action for diferente de STARTED, não faz nada
  // - Se não houver uma sessão ativa,
  // 1. Remove todas as outras sessões do usuário que não possuem mensagens
  // 2. cria uma nova sessão
  // - Se houver uma sessão ativa, cria uma mensagem de boas-vindas
  useEffect(() => {
    if (action !== ACTIONS.STARTED) return
    if (!sessionId && user?.id)
      removeIdleSession().then(() => createSession(user?.id))
    else createWelcomeMessage()
  }, [sessionId, action, user])

  //** END: CARREGANDO APLICAÇÃO

  // Se a última mensagem for do sistema e estiver finalizada
  // Faz o sistema falar a última mensagem
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (
      !lastMessage ||
      lastMessage?.status !== SYSTEM_MESSAGE_STATUS.DONE ||
      lastMessage.role === ROLE.USER
    )
      return
    speak(lastMessage.content)
  }, [messages])
}

export default useAgent
