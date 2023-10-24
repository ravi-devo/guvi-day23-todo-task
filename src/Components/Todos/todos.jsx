import './todos.css';
import TodoCard from '../TodoCard/todoCard';
import { useState, useEffect } from 'react';

const Todos = () => {

    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({
        id: null,
        name: '',
        description: '',
        status: 'NOT COMPLETED'
    });
    const [filteredTodos, setFilteredTodos] = useState([]);

    const [filterBy, setFilterBy] = useState("ALL");

    function addTodo(e) {
        e.preventDefault();
        // const fieldReset = document.querySelector('#text')
        if (todo.name && todo.description) {
            console.log('Todo: ', todo.name);
            setTodos((todos) => {
                // fieldReset.reset();
                return [...todos, todo];
            })
        }
        
    }

    function handleTodo(value) {
        let todoData = { ...value, id: todos.length + 1 };
        setTodo((todo) => {
            return { ...todo, ...todoData }
        })
    }

    const editTodo = (editPayload) => {
        setTodos((todo_list) =>
            todo_list.map((todo_item) => {
                if (todo_item.id === editPayload.id) {
                    return {
                        ...todo_item,
                        ...editPayload,
                    };
                }
                return todo_item;
            })
        );
    };

    const deleteTodo = (itemToDel) => {
        console.log(itemToDel);
        setTodos((todo_list) => {
            return todo_list.filter((item) => item.id !== itemToDel.id)
        })
    };

    useEffect(() => {
        setFilteredTodos(todos);
    }, [todos]);

    useEffect(() => {
        if (filterBy !== "ALL") {
            let filtered = todos.filter((item) => item.status === filterBy);
            setFilteredTodos(filtered);
        } else {
            setFilteredTodos(todos);
        }
        console.log("Filter By: ", filterBy);
    }, [filterBy, todos]);

    return (
        <div className="container">
            <h2 className='title'>My todo</h2>
            <form onSubmit={addTodo} className='mb-5' id='form'>
                <div className="row">
                    <div className='col'>
                        <input type="text" id='text' value={todo.name} placeholder='ToDoName' onChange={(e) => handleTodo({ name: e.target.value })} className="form-control" />
                    </div>
                    <div className="col">
                        <input type="text" id='text' value={todo.description} placeholder='ToDoDescription' onChange={(e) => handleTodo({ description: e.target.value })} className="form-control col" />
                    </div>
                    <button type='submit' className="col submitBtn">Add Todo</button>
                </div>
            </form>
            <div className='row'>
                <h5 className='col text-start'>My Todos</h5>
                <div className='col text-end'>
                    <span>Status filter: </span>
                    <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                        <option value={"ALL"}>All</option>
                        <option value={"COMPLETED"}>Completed</option>
                        <option value={"NOT COMPLETED"}>Not Completed</option>
                    </select>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                {filteredTodos.length ? filteredTodos.map((todo, index) => {
                    return <TodoCard todo={todo} editTodo={editTodo} deleteTodo={deleteTodo} key={index} />
                }) : <div> No Todos Available </div>}
            </div>
        </div>
    );
}

export default Todos;