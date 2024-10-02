import * as React from 'react'
import { useEffect, useState } from 'react'
import {  useParams } from 'wouter-preact'
import { getStory } from 'helpers/api'
import { Typography, Box, Card, CardContent, CircularProgress, Button } from '@mui/material'

const Comment = ({ commentId }: { commentId: number }) => {
  const [comment, setComment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSubcomments, setShowSubcomments] = useState(false)

  useEffect(() => {
    const fetchComment = async () => {
      setLoading(true)
      try {
        const data = await getStory(commentId)
        setComment(data)
      } catch (err) {
        setError('Failed to fetch comment')
      } finally {
        setLoading(false)
      }
    }

    fetchComment()
  }, [commentId])

  if(loading){
    return (
      <div className="flex items-center justify-center h-auto">
      <CircularProgress/>
      </div>
    )
  }  if (error) return <Typography color="error">{error}</Typography>
  if (!comment) return null


  return (
    <Box sx={{ marginBottom: 1, width: 'auto'}}>
      <Card  sx={{ border: '1px solid black', width: 'auto'}}>
        <CardContent  >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {new Date(comment.time * 1000).toLocaleString()} by {comment.by}
          </Typography>
          <Typography 
            variant="body1" 
            dangerouslySetInnerHTML={{ __html: comment.text }}
            sx={{width: 'auto'}}
            >
                {comment.text}
        </Typography>      
           {comment.kids && comment.kids.length > 0 && (
        <Box >
            <Button onClick={() => setShowSubcomments(prev => !prev)}
                sx={{ 
                    backgroundColor: '#ff3d00', 
                    color: 'white', 
                    borderRadius: '10px', 
                    marginBottom:  showSubcomments ? '2%' : '0%',
                    marginTop: '2%', 
                    padding: '4px 8px',
                    fontSize: '10px',
                    justifyContent: 'flex-end' 
                }}>               
                {showSubcomments ? 'Hide' : 'Show'} replies
              </Button>
              {showSubcomments && (
                <Box>
                  {comment.kids.map((kidId: number) => (
                    <Comment key={kidId} commentId={kidId} />
                  ))}
                </Box>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default function Storie() {
  const { id } = useParams<{ id: string }>()
  const [story, setStory] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true)
      try {
        const data = await getStory(Number(id))
        setStory(data)
      } catch (err) {
        setError('Failed to fetch story')
      } finally {
        setLoading(false)
      }
    }

    fetchStory()
  }, [id])

  if (loading) return <CircularProgress />
  if (error) return <Typography color="error">{error}</Typography>
  if (!story) return null

  return (
    <Box sx={{ padding: 1 }}>
    <Card sx={{ maxWidth: '100%', marginBottom: '2%', border: '1px solid black' }}>
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {new Date(story.time * 1000).toLocaleString()} by {story.by} 
        </Typography>
        <Typography variant="h6">
          {story.title}
        </Typography>
        {story.text && (
        <Typography variant="body2" sx={{marginTop: '1%',}} dangerouslySetInnerHTML={{ __html: story.text }} >
          {story.text}
        </Typography>
        )}
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {story.descendants} comments  
          | {story.score} points   
          {story.url && (
            <span>
              {' '}
              |{' '}
              <a href={story.url} target="_blank" rel="noopener noreferrer" style={{ color: '#ff3d00' }}>
                original link
              </a>
            </span>
          )}
        </Typography>
      </CardContent>
      </Card>
      {story.kids && story.kids.length > 0 && (
        <Box >
          {story.kids.map((kidId: number) => (
            <Comment key={kidId} commentId={kidId} />
          ))}
        </Box>
      )}
    </Box>
  );
}
