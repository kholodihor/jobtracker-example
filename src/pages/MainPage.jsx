import { useAuth } from '../hooks/useAuth'

const MainPage = () => {
const { user } = useAuth()
  return (
    <div className='h-screen w-full flex flex-col gap-4 justify-center items-center'>
      <h2>Current User:</h2>
      <p className='text-3xl'>{user ? user.username : 'Please Log In'}</p>
    </div>
  )
}

export default MainPage
