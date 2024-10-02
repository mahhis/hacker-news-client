import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import currentTopic from 'atoms/currentTopic';
import isStoryAtom from 'atoms/isStory';
import { useAtom } from 'jotai';
import { Link, useLocation } from 'wouter-preact';



export default function MenuAppBar() {
  const [open, setOpen] = React.useState(false);
  const [topic, setTopic] = useAtom(currentTopic)
  const [isStory, setIsStory] = useAtom(isStoryAtom)

  const [location, setLocation] = useLocation();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleTopicChange = (newTopic: string) => {
    setTopic({
      fullName: newTopic,
      shortName: newTopic.split(' ')[0].toLowerCase()
    }
    );
    setLocation("/");
    setIsStory(false)
  };

  const DrawerList = (
    <Box sx={{ width: 150 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
      {['Top', 'New', 'Best stories'].map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton onClick={() => handleTopicChange(text)} >
          <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['Ask HN', 'Show HN', 'Job stories'].map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton  onClick={() => handleTopicChange(text)}>
          <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    </Box>
  );

  return (
    <Box  sx={{ flexGrow: 1, marginBottom: '12%' }}>
      <AppBar  sx={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
        <Toolbar>
        {isStory && 
          <Link to={`/`} onClick={() => setIsStory(false)}>

          <Button color="inherit" sx={{ paddingLeft: '0', minWidth: '0'}}>
            <KeyboardArrowLeftIcon />
          </Button>
          </Link>
          }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {topic.fullName}
          </Typography>
          <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>  
           <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}