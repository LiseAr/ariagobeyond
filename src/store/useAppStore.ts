import { create } from 'zustand'

export enum ACTIONS {
  BLOCKED = 'blocked',
  STARTED = 'started',
  LISTENING = 'listening',
  GENERATING = 'generating',
  SPEAKING = 'speaking',
  IDLE = 'idle'
}

type Action =
  | ACTIONS.BLOCKED
  | ACTIONS.STARTED
  | ACTIONS.LISTENING
  | ACTIONS.GENERATING
  | ACTIONS.SPEAKING
  | ACTIONS.IDLE

// Guarda as informações da aplicação
// bem como os métodos para alterá-las
interface AppStore {
  // Ação que a aplicação está realizando:
  // Pode estar ouvindo o usuário ou sintetizando a resposta.
  action: Action
  setAction: (action: Action) => void

  // Barra lateral:
  // - estado Aberta ou fechada. default: false
  // - Função para alternar entre aberta e fechada.
  sideBarOpen: boolean
  toggleSideBar: () => void
}

const useAppStore = create<AppStore>((set) => ({
  // Ação:
  action: ACTIONS.BLOCKED,
  setAction: (action) => set({ action }),

  // Barra lateral:
  sideBarOpen: false,
  toggleSideBar: () => set((state) => ({ sideBarOpen: !state.sideBarOpen }))
}))

export default useAppStore
