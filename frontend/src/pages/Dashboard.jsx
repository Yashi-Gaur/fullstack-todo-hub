import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import AddTask from '../components/DashboardComponents/addTask.jsx';
import Task from '../components/DashboardComponents/task.jsx';
import StatList from '../components/DashboardComponents/statList.jsx';
import FormGroup from '@mui/material/FormGroup';
import { motion, AnimatePresence } from "framer-motion";
import { IconButton, Box, useMediaQuery, useTheme, Drawer } from '@mui/material';

import { LoadingContext } from '../context/loadingcontext.jsx';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Dashboard({ token, onLogout }) {
  const { setLoading } = useContext(LoadingContext);
  const [tasks, setTasks] = useState([]);
  const [maxIncompleteOrder, setMaxIncompleteOrder] = useState(-1);
  const [maxCompleteOrder, setMaxCompleteOrder] = useState(-1);
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const incomplete = total - completed;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); // simulate page load
    return () => clearTimeout(timer);
  }, []);
  
  const sortTasks = (list) => 
    list.slice().sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return a.order - b.order;
  });
  
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/tasks', {
        headers: { Authorization: token },
      });
      setTasks(sortTasks(res.data));
    } catch {
      alert('Failed to fetch tasks');
    }
  };
  
  const addTask = async (newTitle) => {
    if (!newTitle.trim()) return;

    try {
      if (maxIncompleteOrder === -1) {
        const maxIncomplete = tasks
          .filter((t) => !t.completed)
          .reduce((max, t) => Math.max(max, t.order ?? 0), 0);

        const maxCompleted = tasks
          .filter((t) => t.completed)
          .reduce((max, t) => Math.max(max, t.order ?? 0), 0);

        setMaxCompleteOrder(maxCompleted);

        const newOrder = maxIncomplete + 1;

        await axios.post(
          "http://localhost:8000/api/tasks/add",
          { title: newTitle, completed: "False", order: newOrder },
          { headers: { Authorization: token } }
        );

        setMaxIncompleteOrder(newOrder);
        fetchTasks();
      } else {
        const newOrder = maxIncompleteOrder + 1;
        console.log(newOrder);

        await axios.post(
          "http://localhost:8000/api/tasks/add",
          { title: newTitle, completed: "False", order: newOrder },
          { headers: { Authorization: token } }
        );

        setMaxIncompleteOrder(newOrder);
        fetchTasks();
      }
    } catch {
      alert("Failed to add task");
    }
  };
      
  const deleteTask = async (id) => {
    try {
      await axios.post(
        'http://localhost:8000/api/tasks/delete',
        { id },
        { headers: { Authorization: token } }
      );
      fetchTasks();
    } catch {
      alert('Failed to delete task');
    }
  };

  const updateTask = async (id, newTitle) => {
    try {
      await axios.put(
        'http://localhost:8000/api/tasks/update',
        { id, title: newTitle },
        { headers: { Authorization: token } }
      );
      fetchTasks();
    } catch {
      alert('Failed to update task');
    }
  };

  const completeTask = async (taskId, currentCompleted) => {
    try {
      const updatedCompleted = !currentCompleted;
      let maxIncomplete = maxIncompleteOrder;
      let maxComplete = maxCompleteOrder;
      if (maxIncompleteOrder === -1) {
        maxIncomplete = tasks
          .filter((t) => !t.completed)
          .reduce((max, t) => Math.max(max, t.order ?? 0), 0);

        maxComplete = tasks
          .filter((t) => t.completed)
          .reduce((max, t) => Math.max(max, t.order ?? 0), 0);

        if(updatedCompleted) {
          setMaxIncompleteOrder(maxIncomplete);
        } else {
          setMaxCompleteOrder(maxComplete);
        }
      }
      const newOrder = updatedCompleted? maxComplete+1 : maxIncomplete+1;
      await axios.put(
        'http://localhost:8000/api/tasks/complete',
        { id: taskId, completed: updatedCompleted, order: newOrder },
        { headers: { Authorization: token } }
      );

      setTasks((prev) =>
        sortTasks(
          prev.map((task) =>
            task.id === taskId ? { ...task, completed: updatedCompleted, order: newOrder } : task
          )
        )
      );

      if(updatedCompleted) {
        setMaxCompleteOrder(newOrder);
      } else {
        setMaxIncompleteOrder(newOrder);
      }

    } catch {
      alert('Failed to update task status');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const [showRight, setShowRight] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  
  const motionProps = {
    layout: true,
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { type: "spring", stiffness: 300, damping: 25 },
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden', alignItems:'center' }}>
      <Header isLoggedIn = {true} title='Dashboard' logout={onLogout} />
      <div className='dashboardContainer'>
        {/* Left section */}
        <div
          style={{
            width: showRight ? "50%" : "100%",
            marginLeft: showRight ? 0 : "auto",
            marginRight: showRight ? 0 : "auto",
          }}
          className='taskContainer'
        >
          
          <FormGroup style={{ width: "100%", maxWidth: "600px"}}>
            
            <AnimatePresence>
              <motion.div
                  {...motionProps}
                > 
                  <AddTask onAdd={addTask} />
                </motion.div>
              
              {sortTasks(tasks).map((task) => (
                <motion.div
                  key={task.id}
                  {...motionProps}
                >
                  <Task 
                    key={task.id} 
                    id={task.id} 
                    title={task.title} 
                    completed={task.completed} 
                    clickCheckBox={completeTask}
                    clickSave={updateTask}
                    clickDelete={deleteTask}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </FormGroup>
        </div>

        {/* Right section */}
        {!isSmallScreen && showRight && (
          <div className='statsContainer'>
            <StatList total={total} incomplete={incomplete} completed={completed}/>

            {/* Arrow on left of stats panel */}
            <div
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                animation: "bounce 1.5s infinite",
              }}
            >
              <IconButton
                onClick={() => setShowRight(false)}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          </div>
        )}

        {/* Arrow when stats panel is hidden */}
        {!isSmallScreen && !showRight && (
          <div
            style={{
              position: "absolute",
              right: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              animation: "bounce 1.5s infinite",
            }}
          >
            <IconButton
              onClick={() => setShowRight(true)}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          </div>
        )}

        {isSmallScreen && !drawerOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: '70px',
              left: '49%',
              transform: 'translateX(-50%)',
              animation: 'bounceY 1.5s infinite',
              zIndex: 1300,
            }}
          >
            <IconButton onClick={() => setDrawerOpen(true)}>
              <KeyboardDoubleArrowUpIcon fontSize="large" />
            </IconButton>
          </div>
        )}

        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => {}}
          variant="persistent"
          ModalProps={{
            keepMounted: true,
            disableEscapeKeyDown: true,
          }}
          PaperProps={{
            sx: {
              height: '70%',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              p: 3,
              backgroundColor: '#fad5b2f1',
              pointerEvents: 'auto',
            },
          }}
          sx={{
            '& .MuiBackdrop-root': {
              pointerEvents: 'none', // Prevent backdrop from catching clicks
            },
          }}
        >
          {/* Close arrow inside drawer */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              transform: 'translateX(-48%)',
              animation: 'bounceY 1.5s infinite',
              mb: 2,
              mt: 1.5
            }}
          >
            <IconButton onClick={() => setDrawerOpen(false)}>
              <KeyboardArrowDownIcon fontSize="large" />
            </IconButton>
          </div>

          {/* Drawer Content (same as your right panel) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <StatList total={total} incomplete={incomplete} completed={completed}/>
          </Box>
        </Drawer>
      </div>
      <Footer/>
    </Box>
    </motion.div>
  );
}

export default Dashboard;
