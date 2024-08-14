import useAppStore, { ACTIONS } from '@/store/useAppStore'
import useSynthStore from '@/store/useSynthStore'
import { useEffect, useState } from 'react'

const useSynth = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  const { setAction } = useAppStore()
  const { setSpeechSynthesis, synth, setUtterance, utterance } = useSynthStore()

  const speak = (message: string) => {
    if (!synth || !utterance) {
      alert(
        'Seu navegador não suporta Web Speech API. Por favor, use o Google Chrome.'
      )
      return
    }

    utterance.text = message

    if (synth.speaking) {
      synth.cancel()

      setTimeout(() => {
        synth.speak(utterance)
      }, 300)
    } else synth.speak(utterance)
  }

  const handleOnStart = () => {
    setAction(ACTIONS.SPEAKING)
  }

  const handleOnEnd = () => {
    setAction(ACTIONS.LISTENING)
  }

  const getUtterance = () => {
    const utterance = new SpeechSynthesisUtterance()

    utterance.lang = 'pt-BR'
    utterance.rate = 1
    utterance.pitch = 0.9

    utterance.onend = handleOnEnd
    utterance.onstart = handleOnStart

    return utterance
  }

  function getVoices() {
    var voices = speechSynthesis.getVoices()
    // console.log('getVoices voices', voices)
    if (voices.length === 0) return
    setVoices(voices.filter((voice) => voice.lang === 'pt-BR'))
  }

  const getNewSynth = () => {
    if (!window?.speechSynthesis)
      alert('Seu navegador não suporta reconhecimento de voz')
    else {
      const synth = window?.speechSynthesis
      // console.log('synth', synth)
      setSpeechSynthesis(synth)
      synth.onvoiceschanged = getVoices
    }
  }

  useEffect(() => {
    if (voices.length === 0 && utterance?.voice) return
    const utter = getUtterance()
    utter.voice = voices[2]
    setUtterance(utter)
  }, [voices])

  useEffect(() => {
    if (Object.keys(synth).length === 0) getNewSynth()
  }, [synth])

  return { utterance, voices, speak, loading: !utterance?.voice }
}

export default useSynth
