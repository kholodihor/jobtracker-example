import { useEffect, useState } from 'react'
import axios from '../config/axios'


const MainPage = () => {
  const [user, setUser] = useState([])


  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get('https://job-tracker-backend-x.vercel.app/api/user/profile')
        setUser(res.data.user)
        console.log(user)
      } catch (error) {
        console.error(error)
      }
    }
    getUser()
  }, [])

  return (
    <div className='h-screen w-full flex flex-col gap-4 justify-center items-center'>
      <h2>Current User:</h2>
      <p className='text-3xl'>{user? user.username : 'Please Log In'}</p>
    </div>
  )
}

export default MainPage
