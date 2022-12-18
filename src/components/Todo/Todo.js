import { useDispatch } from 'react-redux'
import { removeTodo, toggleTodo } from './../../redux/reducers/ProjectReducer'
import './styles.css'
const Todo = ({ projectId, problemId, id: todoId, text, done }) => {
    const dispatch = useDispatch()

    const handleRemoveTodo = () => {
        dispatch(removeTodo({ projectId, problemId, todoId }))
    }

    const handleToggleTodo = () => {
        dispatch(toggleTodo({ projectId, problemId, todoId }))
    }

    return (
        <div className={`todo ${done ? 'todo-done' : ''}`}>
            <p onClick={handleToggleTodo}> {text} </p>
            <p onClick={handleRemoveTodo} className='remove'>
                {' '}
                remove{' '}
            </p>
        </div>
    )
}

export default Todo
