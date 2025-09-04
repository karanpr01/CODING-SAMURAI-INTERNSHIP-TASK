import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'

const ProfilePage = () => {

  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate()
  const [name,setName] = useState("Prem Karn")
  const [bio,setBio] = useState("Hi Everyone, I am using QuickChat")

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>

      <div 
      className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between mx-sm:flex-col-reverse rounded-lg'
      >

        <form
        className='flex flex-col gap-5 p-10 flex-1'
        onSubmit={handleSubmit}
        >

          <h3 className='text-lg'>Profile details</h3>

          <label 
          htmlFor="avatar"
          className='flex items-center gap-3 cursor-pointer'
          >
            <input 
            type="file" 
            id='avatar' 
            accept='.png, .jpg, .jpeg' 
            hidden
            onChange={(e) => setSelectedImg(e.target.files[0])}
            />
            <img src={selectedImg? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt=""  className={`w-12 h-12 ${selectedImg && 'rounded-full'}`}/>
            Upload Profile Image
          </label>

          <input
          type="text"
          required
          placeholder='Enter Your Name'
          className='p-2 border border-b-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
          onChange={(e) => setName(e.target.value)}
          value={name}
          />

          <textarea
          placeholder='Write Profile Bio...'
          required
          rows={4}
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          ></textarea>

          <button
          type='submit'
          className='p-2 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-full text-lg cursor-pointer'
          >Save</button>
        </form>

        <img src={assets.logo_icon} alt="" className='max-w-44 aspect-square rounded-full mx-10 mx-sm:mt-10' />
      </div>
    </div>
  )
}

export default ProfilePage