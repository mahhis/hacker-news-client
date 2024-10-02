import * as React from 'react'
import { useEffect, useState } from 'react'
import { getTopStories, getStory, getItemsByTopic } from 'helpers/api'
import MenuAppBar from 'components/Header'
import { Box, Typography, List, CircularProgress, Button } from '@mui/material'
import Item from 'components/Item'
import { useAtom } from 'jotai'
import currentTopicAtom from 'atoms/currentTopic'
import isLoadingAtom from 'atoms/isLoading'

export default function Top() {
  const [idsCurrentItems, setIdsCurrentItems] = useState<number[]>([])
  const [displayedItems, setDisplayedItems] = useState<number[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [topic] = useAtom(currentTopicAtom)
  const [offset, setOffset] = useState(30)


  console.log(topic)

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true)
      try {
        console.log(topic)
        const stories = await getItemsByTopic(topic.shortName)
        setIdsCurrentItems(stories)
        setDisplayedItems(stories.slice(0, 30)) 
      } catch (err) {
        setError('Failed to fetch top stories')
      } finally {
        setIsLoading(false)
      }
    }
    fetchStories()
  }, [topic])


  const loadMoreItems = () => {
    const nextOffset = offset + 30
    setOffset( offset => offset+30)
    setDisplayedItems(idsCurrentItems.slice(0, nextOffset))
  }

  if(isLoading){
    return (
      <div className="flex items-center justify-center h-screen">
         <CircularProgress/>
      </div>
    )
  }
  if(error){
    return (
      <Typography color="error">{error}</Typography>
    )
  }

  return (
    <Box>
      <MenuAppBar />
      <Box sx={{ padding: 1 }}>
        <List>
          {displayedItems.map((id) => (
            <Item key={id} id={id} />
          ))}
        </List>
        {offset < idsCurrentItems.length && (
          <Box display="flex" justifyContent="center" >
            <Button 
              variant="contained" 
              onClick={loadMoreItems} 
              sx={{ 
                borderRadius: '20px', 
                padding: '10px 20px', 
                fontSize: '16px', 
              }}
            >
              More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}


