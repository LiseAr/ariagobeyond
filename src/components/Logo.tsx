import { HTMLAttributes } from 'react'

const Logo = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <div id='logoContainer' className={`text-3xl ${props.className}`}>
      <h1
        id=''
        className={`text-transparent bg-gradient-to-r from-purple-600  to-emerald-800 bg-clip-text font-black tracking-widest  `}
      >
        Ár
        <span className=' text-emerald-700 scale-150'>IA</span>
      </h1>
    </div>
  )
}

export { Logo }
