import { ChatSession } from '@prisma/client'
import { create } from 'zustand'

interface SessionStore {
  sessions: ChatSession[]
  setSessions: (sessions: ChatSession[]) => void
  sessionId: number | null
  setSessionId: (sessionId: number) => void
}

const useSessionStore = create<SessionStore>((set) => ({
  sessions: [],
  setSessions: (sessions: ChatSession[]) => set({ sessions }),
  sessionId: null,
  setSessionId: (sessionId: number) => set({ sessionId })
}))

export { useSessionStore }
