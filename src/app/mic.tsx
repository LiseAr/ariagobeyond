import React from 'react'

import useMicStore from '@/store/useMicStore'
import useRecognition from '@/hooks/useRecognition'
import useAppStore, { ACTIONS } from '@/store/useAppStore'

const Mic = () => {
  const { speechRecognition } = useMicStore()
  const { startRecognition } = useRecognition()
  const { action } = useAppStore()
  if (!speechRecognition) return null

  return (
    <svg
      onClick={() => startRecognition()}
      className={`${
        action === ACTIONS.LISTENING ? 'bg-emerald-800/80' : ''
      } hover:bg-emerald-800/80 hover:text-primary rounded-full p-[0.6rem] m-2 w-12 h-12 cursor-pointer text-white/20 transition-all duration-300 ease-in-out`}
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 14 21'
    >
      <g fill='current' transform='translate(-3 -43)'>
        <g transform='translate(3 43.5)'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M7 12c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3S4 1.3 4 3v6c0 1.7 1.3 3 3 3h0zm5.3-3c0 3-2.5 5.1-5.3 5.1S1.7 12 1.7 9H0c0 3.4 2.7 6.2 6 6.7V19h2v-3.3c3.3-.5 6-3.3 6-6.7h-1.7 0z'
          ></path>
        </g>
      </g>
    </svg>
  )
}

export { Mic }
