import { create } from 'zustand'

interface SynthState {
  synth: SpeechSynthesis
  setSpeechSynthesis: (synth: SpeechSynthesis) => void

  utterance: SpeechSynthesisUtterance
  setUtterance: (utterance: SpeechSynthesisUtterance) => void
}

const useSynthStore = create<SynthState>((set) => ({
  synth: {} as SpeechSynthesis,
  setSpeechSynthesis: (synth: SpeechSynthesis) => set({ synth }),
  utterance: {} as SpeechSynthesisUtterance,
  setUtterance: (utterance: SpeechSynthesisUtterance) => set({ utterance })
}))

export default useSynthStore
