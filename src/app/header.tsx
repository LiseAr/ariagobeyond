import { Logo } from '@/components/Logo'

const Header = () => {
  return (
    <header className='w-full h-20 bg-primary flex items-center justify-center transition-all duration-300 ease-in-out'>
      <Logo />
    </header>
  )
}

export { Header }
