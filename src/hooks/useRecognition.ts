import useAppStore, { ACTIONS } from '@/store/useAppStore'
import useMessagesStore, {
  ROLE,
  SYSTEM_MESSAGE_STATUS,
  SystemMessage
} from '@/store/useMessagesStore'
import useMicStore from '@/store/useMicStore'
import { useEffect } from 'react'
import { usePrisma } from './usePrisma'

const useRecognition = () => {
  const { setAction, action } = useAppStore()
  const { setSpeechRecognition, speechRecognition } = useMicStore()

  const { appendMessage, messages } = useMessagesStore()

  const { addMessage } = usePrisma()

  const startRecognition = () => {
    if (!speechRecognition) return

    speechRecognition.start()

    speechRecognition.onresult = (event) => {
      if (event.results.length > 0) {
        const results = event.results
        const result = results[0]
        const transcript = result[0].transcript
        if (result.item(0).confidence < 0.5) return
        appendMessage({
          role: 'user',
          content: transcript,
          status: result.isFinal
            ? SYSTEM_MESSAGE_STATUS.DONE
            : SYSTEM_MESSAGE_STATUS.PROCESSING
        } as SystemMessage)
        if (result.isFinal) {
          speechRecognition.stop()
          addMessage(transcript, ROLE.USER)
        }
      }
    }
  }

  const debug = (e: any) => {
    if (e.type === 'end') setAction(ACTIONS.GENERATING)
  }

  const handleOnEnd = () => setAction(ACTIONS.GENERATING)

  useEffect(() => {
    if (action === ACTIONS.LISTENING) {
      const lastMessage = messages[messages.length - 1]
      if (
        lastMessage?.role === ROLE.ASSISTANT &&
        lastMessage?.status === SYSTEM_MESSAGE_STATUS.DONE
      )
        startRecognition()
    }
  }, [action, messages])

  const initRecognition = () => {
    const recog = window?.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new recog()
    recognition.interimResults = true
    recognition.lang = 'pt-BR'
    recognition.onend = handleOnEnd
    setSpeechRecognition(recognition)
  }

  useEffect(() => {
    if (!window?.SpeechRecognition && !window?.webkitSpeechRecognition)
      alert('Seu navegador não suporta reconhecimento de voz')
    else initRecognition()
  }, [])

  return { startRecognition }
}

export default useRecognition
