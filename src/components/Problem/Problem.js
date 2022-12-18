import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Todo from './../Todo/Todo'
import GridList from './../../layout/GridList/GridList'
import {
    removeProblem,
    updateProblem,
    addTodo,
} from './../../redux/reducers/ProjectReducer.js'
import './styles.css'

const Problem = ({ id: problemId, title, description, status, todos }) => {
    const [editmode, setEditmode] = useState(false)
    const [currentTitle, setCurrentTitle] = useState(title)
    const [currentDescription, setCurrentDescription] = useState(
        description || ''
    )
    const [todo, setTodo] = useState('')
    const { id: projectId } = useParams()
    const dispatch = useDispatch()

    const handleEditButton = () => {
        if (editmode) {
            if (currentTitle.trim() === '') {
                setCurrentTitle('no title')
            }
            const updates = {
                title: currentTitle,
                description: currentDescription,
            }
            dispatch(updateProblem({ projectId, problemId, updates }))
        }
        setEditmode((prev) => !prev)
    }

    const handleUpdateStatus = () => {
        // const statusArray = ['unsolved', 'current', 'solved']
        let newStatus
        switch (status) {
            case 'unsolved':
                newStatus = 'current'
                break
            case 'current':
                newStatus = 'solved'
                break
            default:
                newStatus = 'unsolved'
        }
        dispatch()
    }

    const handelRemoveproblem = () =>
        dispatch(removeProblem({ projectId, problemId }))

    const submitTodo = (e) => {
        e.preventDefault()
        const newTodo = todo.trim()
        if (newTodo === '') return
        dispatch(addTodo({ projectId, problemId, text: newTodo }))
        setTodo('')
    }

    return (
        <div className={`problem ${status}`}>
            <div className='info'>
                <div className='control'>
                    <p
                        onClick={handleEditButton}
                        className={editmode ? 'save' : 'edit'}
                    >
                        {editmode ? 'save' : 'edit'}
                    </p>
                    <p>{status}</p>
                    <p onClick={handelRemoveproblem} className='remove'>
                        remove
                    </p>
                </div>
                <textarea
                    value={currentTitle}
                    type='text'
                    maxLength='40'
                    className='title'
                    rows='1'
                    onChange={(e) => setCurrentTitle(e.target.value)}
                    disabled={!editmode}
                ></textarea>
                <textarea
                    className='description'
                    value={currentDescription}
                    disabled={!editmode}
                    placeholder='description'
                    maxLength='90'
                    onChange={(e) => setCurrentDescription(e.target.value)}
                ></textarea>
            </div>
            <div className='todos'>
                <div className='todos-area'>
                    <GridList items={todos} projectId={projectId}>
                        <Todo problemId={problemId} />
                    </GridList>
                </div>
                <div className='create-todos'>
                    <form onSubmit={submitTodo}>
                        <input
                            type='text'
                            className='todo-input'
                            value={todo}
                            placeholder='Todo'
                            onChange={(e) => setTodo(e.target.value)}
                        />
                        <button type='submit'>+ todo</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Problem
