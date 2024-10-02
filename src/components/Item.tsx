import { Typography, Card, CardContent} from '@mui/material'
import { useEffect, useState } from 'react';
import { getStory } from 'helpers/api';
import { Link } from 'wouter-preact'; // Import Link from react-router-dom
import { useAtom } from 'jotai';
import isStoryAtom from 'atoms/isStory';

// src/types/Item.ts
export interface Item {
  /** The item's unique id. */
  id: number;
  /** true if the item is deleted. */
  deleted?: boolean;
  /** The type of item. One of "job", "story", "comment", "poll", or "pollopt". */
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
  /** The username of the item's author. */
  by: string;
  /** Creation date of the item, in Unix Time. */
  time: number;
  /** The comment, story or poll text. HTML. */
  text?: string;
  /** true if the item is dead. */
  dead?: boolean;
  /** The comment's parent: either another comment or the relevant story. */
  parent?: number;
  /** The pollopt's associated poll. */
  poll?: number;
  /** The ids of the item's comments, in ranked display order. */
  kids?: number[];
  /** The URL of the story. */
  url?: string;
  /** The story's score, or the votes for a pollopt. */
  score?: number;
  /** The title of the story, poll or job. HTML. */
  title?: string;
  /** A list of related pollopts, in display order. */
  parts?: number[];
  /** In the case of stories or polls, the total comment count. */
  descendants?: number;
}

export default function Item({ id }: { id: number }) {
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStory, setIsStory] = useAtom(isStoryAtom)


  useEffect(() => {
    const fetchStory = async () => {
      try {
        const storyData: Item[] = await getStory(id);
        setStory(storyData);
        console.log(storyData)
      } catch (err) {
        setError('Failed to fetch story');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!story) return null;

  return (
    <Card sx={{ maxWidth: '100%', marginBottom: '2%', border: '1px solid black' }}>
      <CardContent>
      <Link to={`/${story.id}`} onClick={() => setIsStory(true)}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {new Date(story.time * 1000).toLocaleString()} by {story.by} 
          </Typography>
          <Typography variant="h6">
            {story.title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {story.descendants} comments  
         | {story.score} points   
         {story.url && (
        <span>
          {' '}
          |{' '}
          <a href={story.url} target="_blank" rel="noopener noreferrer"  style={{ color: '#ff3d00' }}>
            original link
          </a>
        </span>
      )}
        </Typography>
      </CardContent>
    </Card>
  );
}