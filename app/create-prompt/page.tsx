'use client'

import {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const CreatingPrompts = () => {

  const {data: session} = useSession()
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const createdPrompt = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)


    try {
      //@ts-ignore
      const userId = session && session.user  ? session.user.id  : 'guest';
      const response = await fetch('/api/prompt/new',{
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: userId,
          tag: post.tag,
        }),
      })
      console.log(response)
      if(response.ok){
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createdPrompt}
    />
  )
}

export default CreatingPrompts