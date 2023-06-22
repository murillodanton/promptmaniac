'use client'

import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'
import { DefaultUser } from 'next-auth'
import { set } from 'mongoose'

const MyProfile = () => {

const { data:session } = useSession()
const router = useRouter()
const [posts, setPosts] = useState([])

console.log('session',session)

    useEffect(() => {console.log('fetch',session?.user)
        const fetchPosts = async () => {
          //@ts-ignore
          const response = await fetch(`/api/users/${session?.user.id}/posts}`)
          const data = await response.json()
          console.log('fetch',session?.user)
          setPosts(data)
        }
        //@ts-ignore
        if(session?.user.id) fetchPosts()
        //@ts-ignore
      },[session?.user.id])

    const handleEdit = (post:any) => {
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post:any) => {
      const hasConfirmed = confirm('Are you sure you want to delete this post?')
      if(hasConfirmed){
        try {
          const response = await fetch(`/api/prompt/${post._id.toString()}`,{
            method: 'DELETE',
          })

          const filteredPost = posts.filter((p:any) => p._id !== post._id)

          setPosts(filteredPost)
          if(response.ok){
            router.push('/')
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

  return (<>
    <Profile
        name='My'
        desc='Welcome to your personalized profile page!'
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
    </>
  )
}

export default MyProfile