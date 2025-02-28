import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import BackUsers  from './BackUsers';
import BackProjects from './BackProjects';
import BackSprints from './BackSprints';
import BackStories from './BackStories';
import BackTasks from './BackTasks';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', path: '/' },
  { text: 'Users', path: '/users' },
  { text: 'Projects', path: '/projects' },
  { text: 'Tasks', path: '/tasks' },
  { text: 'Stories', path: '/stories' },
  { text: 'Sprints', path: '/sprints' },
];

function HomeScreen() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Project Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} component={Link} to={item.path} sx={{ cursor: 'pointer' }}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<div>Bienvenue dans l'application de gestion de projet</div>} />
          <Route path="/users" element={<BackUsers />} />
          <Route path="/projects" element={<BackProjects />} />
          <Route path="/tasks" element={<BackTasks />} />
          <Route path="/stories" element={<BackStories />} />
          <Route path="/sprints" element={<BackSprints />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default HomeScreen;