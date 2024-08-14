import { Loading } from '@/components/Loading'
import { usePrisma } from '@/hooks/usePrisma'
import useUserStore from '@/store/useUserStore'
import { useState } from 'react'

const Login = () => {
  const { getUser } = usePrisma()
  const { setUser, user } = useUserStore()
  const [loading, setLoading] = useState(false)

  const handleSuccess = (response: any) => {
    if (!response) {
      alert('Usuário não encontrado')
      return
    }
    localStorage.setItem('user', JSON.stringify(response))
    setUser(response)
  }

  const handleError = (error: any) => {
    console.error(error)
    alert('Erro ao tentar entrar. Verifique o email e tente novamente.')
  }

  const handleLogin = () => {
    const email = document.getElementById('email') as HTMLInputElement

    if (!email.value) {
      alert('Preencha o e-mail para continuar')
      return
    }

    setLoading(true)
    getUser(email.value)
      .then(handleSuccess)
      .catch(handleError)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div
      id='home'
      className='bg-gradient-to-b to-secondary from-primary font-black text-sm w-screen h-screen flex flex-col justify-center p-8 items-center
      transition-all duration-1000 ease-in-out
'
    >
      {/* Logo */}
      <div
        id='logoContainer'
        className={`text-8xl   hover:scale-125 transition-all duration-1000 ease-in-out cursor-pointer`}
      >
        <h1
          id=''
          className={`text-transparent bg-gradient-to-r from-purple-800 to-30% to-purple-900 bg-clip-text font-black tracking-widest  `}
        >
          Ár
          <span className=' text-emerald-700 scale-150'>IA</span>
        </h1>
      </div>
      {/* Fim logo */}

      <div className='mb-40 text-emerald-600 hover:text-purple-900 w-full max-w-xl text-center flex flex-col gap-16 font-sans font-thin tracking-widest cursor-pointer transition-all duration-300 ease-in-out'>
        Interface de voz para agentes de IA
      </div>

      <div className='text-emerald-700 hover:text-emerald-900 w-full max-w-xl self-center flex flex-col gap-16 font-sans tracking-widest'>
        {/* Input para email */}
        {!user?.id && (
          <input
            id='email'
            type='email'
            placeholder='Digite seu email'
            className='bg-gray-800 p-4 rounded-lg text-emerald-600 transition-all duration-300 ease-in-out border-[0.5px] border-purple-600'
          />
        )}

        {/* Botão de confirmação */}
        <button
          className='bg-purple-900   text-lg text-emerald-600 p-4 rounded-lg transition-all duration-300 ease-in-out cursor-pointer shadow-lg hover:shadow-emerald-400/30 border-[0.5px] border-purple-600 uppercase hover:scale-105'
          onClick={!user?.id ? handleLogin : () => {}}
        >
          Começar
        </button>
      </div>

      {loading && (
        <div className='absolute'>
          <Loading />
        </div>
      )}
    </div>
  )
}

export { Login }
