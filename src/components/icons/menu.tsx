import { HTMLAttributes } from 'react'

const Menu = (props: HTMLAttributes<HTMLOrSVGElement>) => (
  <div className='scale-50 w-fit cursor-pointer'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      fill='currentColor'
      className=' text-gray-600 hover:text-emerald-700 cursor-pointer'
      // x='0'
      // y='0'
      // viewBox='0 0 50 50'
      {...props}
    >
      <path d='M5 8a2 2 0 100 4h40a2 2 0 100-4H5zm0 15a2 2 0 100 4h40a2 2 0 100-4H5zm0 15a2 2 0 100 4h40a2 2 0 100-4H5z'></path>
    </svg>
  </div>
)

export { Menu }
