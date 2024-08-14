import { create } from 'zustand'

interface UseMicStore {
  speechRecognition: SpeechRecognition | null
  setSpeechRecognition: (speechRecognition: SpeechRecognition) => void
}

const useMicStore = create<UseMicStore>((set) => ({
  speechRecognition: null,
  setSpeechRecognition: (speechRecognition) => set({ speechRecognition })
}))

export default useMicStore
