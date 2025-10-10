import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';

function Task(props) {
    const [editTaskTitle, setEditTaskTitle] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);

    function handleSave() {
        props.clickSave(editTaskId, editTaskTitle);
        setEditTaskId(null);
        setEditTaskTitle('');
    }

    const handleKeypress = (e) => {
        if (e.key === "Enter") {
            handleSave();
        }
    }
    
    return (
        <div>
            <div className='list-div'>
            {/* Checkbox and Title */}
            <FormControlLabel control={<Checkbox onClick={() => props.clickCheckBox(props.id, props.completed)} checked={props.completed}  />} label={editTaskId === props.id ? (
                <input
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                    onKeyDown={handleKeypress}
                    style={{ padding: 5, width: '85%' }}
                />
                ) : (
                props.title
                )} sx={{ width: '85%' }}/>
            
            {/* Edit or save */}
            {editTaskId === props.id ? (
                <Tooltip title="Save">
                <IconButton size="small" className='list-button' onClick={handleSave}>
                    <SaveIcon color='primary' className='list-icon' />
                </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Edit">
                <IconButton size="small" className='list-button' onClick={() => {
                    setEditTaskId(props.id);
                    setEditTaskTitle(props.title);
                    }}>
                    <EditIcon color='primary' className='list-icon' />
                </IconButton>
                </Tooltip>
            )}  
            
            {/* Delete */}
            <Tooltip title="Delete">
            <IconButton size="small" className='list-button' onClick={() => props.clickDelete(props.id)}>
                <DeleteIcon color='primary' className='list-icon' />
            </IconButton>
            </Tooltip>
            
            </div>
            <Divider />
        </div>
    );
}

export default Task;