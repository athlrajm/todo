import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function TodoCard({ todoName, Description, id, status }) {
    const [user] = useAuthState(auth);
    const [isFavorite, setIsFavorite] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteTodo = () => {
        deleteDoc(doc(db, `user/${user?.uid}/todos/${id}`))
            .then(() => alert("Todo Deleted"))
            .catch((error) => alert(error.message));
    };

    const updateTodo = () => {
        updateDoc(doc(db, `user/${user?.uid}/todos/${id}`), {
            status: 'completed'
        })
        .then(() => alert("Todo Updated"))
        .catch((error) => alert(error.message));
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        
        updateDoc(doc(db, `user/${user?.uid}/todos/${id}`), {
            favorite: !isFavorite
        })
        .then(() => alert("Favorite Updated"))
        .catch((error) => alert(error.message));
    };

    return (
        <div style={{ width: '300px' }}>
            <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    {todoName} 
                    <MoreVertIcon />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={updateTodo}>Completed</MenuItem>
                    <MenuItem onClick={deleteTodo}>Delete</MenuItem>
                    <MenuItem onClick={toggleFavorite}>
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </MenuItem>
                </Menu>
                <p style={{ marginLeft: '20px' }}>{Description}</p>
            </div>
        </div>
    );
}

export default TodoCard;
