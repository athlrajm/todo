import React, { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import './Body.css'
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

function Body() {
    const [Input, setInput] = useState("");
    const [Description, setDescription] = useState("");
    const [showAddToDo, setShowAddToDo] = useState(false);
    const [Todos, setTodos] = useState([]);
    const [user] = useAuthState(auth);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [filterOption, setFilterOption] = useState("all");

    const addTodo = () => {
        addDoc(collection(db, `user/${user?.uid}/todos`), {
            todoName: Input,
            Description: Description,
            status: 'pending',
        }).then(() => alert("todo added")).catch(err => alert(err.message));
        setDescription("");
        setInput("");
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, `user/${user?.uid}/todos`), (snapshot) => {
            setTodos(snapshot.docs.map((doc) => ({
                id: doc.id,
                todoName: doc.data().todoName,
                Description: doc.data().Description,
                status: doc.data().status,
                favorite: doc.data().favorite,
                deleted: doc.data().deleted
            })));
        });
        return () => unsubscribe(); 
    }, [user]);

    const filteredTodos = Todos.filter(todo => {
        if (filterOption === "all") {
            return todo.todoName.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (filterOption === "completed") {
            return todo.status === "completed";
        } else if (filterOption === "favorites") {
            return todo.favorite === true;
        } else if (filterOption === "deleted") {
            return todo.deleted === true;
        }
    });

    const handleFilterChange = (option) => {
        setFilterOption(option);
    };

    return (
        <div className='container'>
        <div className='left'>
        <div className='flex'>

       <div className='one'>
       <img className="im1" src="https://i.pinimg.com/736x/4e/f5/d8/4ef5d838ba0931d3b920641918b4bbae.jpg" alt="Todo App Image"/>
       <h1 className='lx'>TODO</h1>
       <p className='p1'>Our Todo App is designed to help you organize your tasks efficiently.<br></br> Whether it's managing your daily chores, keeping track of work assignments,<br></br> or simply jotting down ideas, our app provides a seamless experience <br></br>to keep you organized and productive.</p>
       <br></br>
       </div>
       <img className="pf" onClick={()=>auth.signOut()} src={user?.photoURL} alt="User Profile"/>
       <h7 className="lg" onClick={()=>auth.signOut()}>Log Out</h7>

       </div>

        <div className='btx'>
        <button className='btt' onClick={() => setShowAddToDo(true)}>Add Todo</button>
        </div>
       
        {showAddToDo && (
            <div className='inp4'>
                <input className="inp5" value={Input} onChange={(e) => setInput(e.target.value)} type='text' placeholder='Title'></input><br></br>
                <input className="inp5" value={Description} onChange={(e) => setDescription(e.target.value)} type='text' placeholder='Description'></input>
                <div className='btx'>
                <button className='btt' onClick={addTodo}>Add</button>
                </div>
            </div>
            
        )}
        </div>
        <div className='vertical-line'></div> 

        <div className='right'>
        
        <div className='row'>
        <div className='con1'>
            
        <div className='txtf'>
            <h6 className='tl2'>TODO LIST</h6>
            <TextField className='txt3'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type='text'
                placeholder='Search todos...'
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    </div>
    <div className='con2'>
        <div className="select-container">
            <select className="sl" value={filterOption} onChange={(e) => handleFilterChange(e.target.value)}>
                <option value="all">Filter By</option>
                <option value="completed">Completed</option>
                <option value="favorites">Favorites</option>
                <option value="deleted">Deleted</option>
            </select>
        </div>
    </div>
    </div>
    {filteredTodos.length > 0 && (
    <div className='container'>
        <div className="todo-list">
            {filteredTodos.map((todo, index) => (
                <React.Fragment key={todo.id}>
                    <TodoCard
                        key={todo.id}
                        id={todo.id}
                        todoName={todo.todoName}
                        Description={todo.Description}
                        status={todo.status}
                    />
                    {index !== filteredTodos.length - 1 && <hr />} 
                </React.Fragment>
            ))}
        </div>
    </div>
)}
</div>
    </div>
    
    );
}

export default Body;
