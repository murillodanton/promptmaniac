'use client'

import {useEffect, useState} from 'react'

import PromptCard from './PromptCard'

  const PromptCardList = ({data, handleTagClick}:any) => {
    return (
      <div className='mt-16 prompt_layout'>
        {data.map((post:any, index:number) => {
          return (
            <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}/>
          )
        })}
      </div>
    )
  }

export const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt',{
        method: 'GET',
      })
      const data = await response.json()
      console.log('fetch',data)
      setPosts(data)
    }

    fetchPosts()
  },[])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
      <input type="text" placeholder='Search for a tag or a username' value={searchText} onChange={handleSearchChange}
      required
      className='search_input peer' />
      </form>
      <PromptCardList
      data={posts}
      handleTagClick={() => {}}/>
    </section>
  )
}
