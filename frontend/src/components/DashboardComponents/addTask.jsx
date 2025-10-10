import { useState } from "react";
import React from "react";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {useTheme, useMediaQuery } from '@mui/material';

function AddTask(props) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    function handleClick() {
        props.onAdd(newTaskTitle);
        setNewTaskTitle('');
    }

    const handleKeypress = (e) => {
        if (e.key === "Enter") {
            handleClick();
        }
    }

    return (
        <div className='addTask'>
            <FormControl sx={{ flexGrow: 1, minWidth: 0 }}>
                <TextField
                id="new-task"
                name="new-task-title"
                placeholder="What's your next task?"
                fullWidth
                variant="outlined"
                className='input'
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={handleKeypress}
                InputProps={{
                    sx: {
                    height: '35px',
                    width: '100%',
                    maxWidth: '475px',
                    borderRadius: '17px',
                    padding: '0 14px',
                    }
                }}
                sx={{ marginBottom: 2.5,
                    marginRight: 4,
                    flexGrow: 1
                }}
                />
            </FormControl>

            <Button onClick={handleClick} variant="contained" sx={{
                height: '35px',
                borderRadius: '17px',
                top: '-2.5px'
            }}>{isSmallScreen? <AddIcon/>:  'Add Task'}</Button>
        </div>
    );
}

export default AddTask;