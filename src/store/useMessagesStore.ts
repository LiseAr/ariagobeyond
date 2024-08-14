import { Message } from 'ai'
import { create } from 'zustand'

export enum ROLE {
  USER = 'user',
  ASSISTANT = 'assistant'
}

export type Role = ROLE.USER | ROLE.ASSISTANT

export enum SYSTEM_MESSAGE_STATUS {
  DONE = 'done',
  PROCESSING = 'processing'
}

export interface SystemMessage extends Message {
  status?: SYSTEM_MESSAGE_STATUS.DONE | SYSTEM_MESSAGE_STATUS.PROCESSING
}

interface ChatState {
  messages: SystemMessage[]
  setMessages: (messages: SystemMessage[]) => void
  appendMessage: (message: SystemMessage) => void
}

const useMessagesStore = create<ChatState>((set, get) => ({
  messages: [],
  setMessages: (messages: SystemMessage[]) => set({ messages }),

  appendMessage: (message: SystemMessage) => {
    const messages = get().messages
    if (!messages.length) return set({ messages: [message] })
    else {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === message.role) {
        set({ messages: [...messages.slice(0, -1), message] })
      } else {
        set({ messages: messages.concat([message]) })
      }
    }
  }
}))

export default useMessagesStore
