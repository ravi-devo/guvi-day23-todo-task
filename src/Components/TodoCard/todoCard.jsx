import './todoCard.css';
import { useState, useEffect } from 'react';

const TodoCard = (props) => {

    const { todo, editTodo, deleteTodo } = props;
    const [status, setStatus] = useState("");

    useEffect(() => {
        setStatus(todo.status);
    }, [todo.status]);

    const handleEditTodo = () => {
        const editPayload = { ...todo, status: status };

        editTodo(editPayload);
    };
    const handleDeleteTodo = () => {
        deleteTodo({...todo});
        // console.log({...todo})
    };

    return (
        <div className='col-9 col-md-6 col-lg-4 mb-3'>
            <div className="card text-start">
                <div className="card-body">
                    <p className="cart-text">
                        Name: {todo.name}
                    </p>
                    <p className="cart-text">
                        Description: {todo.description}
                    </p>
                    <div className="card-text row">
                        <p className='col'>Status: </p>
                        <select className='col-8' value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option className='completed' value={"COMPLETED"}>COMPLETED</option>
                            <option className='notCompleted' value={"NOT COMPLETED"}>NOT COMPLETED</option>
                        </select>
                    </div>
                    <div>
                        <button className='editBtn' onClick={handleEditTodo}>Edit</button>
                        <button className='deleteBtn' onClick={handleDeleteTodo}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoCard;