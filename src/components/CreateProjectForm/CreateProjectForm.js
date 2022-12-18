import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SelectStatus from './../SelectStatus/SelectStatus'
import { createProject } from './../../redux/reducers/ProjectReducer'
import './styles.css'

const CreateProjectForm = () => {
    const [error, setError] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [deadLine, setDeadLine] = useState('')
    const [status, setStatus] = useState('will')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title.trim() === '' || description.trim() === '') {
            setError(true)
            return
        }
        setError(false)

        const {
            payload: { id },
        } = dispatch(
            createProject({
                title,
                description,
                status,
                startDate,
                deadLine,
            })
        )
        navigate(`/project/${id}`)
    }
    return (
        <>
            {error && (
                <div className='error'>
                    🐱‍👤 project should have at least title & description.
                </div>
            )}
            <form onSubmit={handleSubmit} className='form'>
                <input
                    type='text'
                    className='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required={true}
                    autoFocus={true}
                    placeholder='Porject Title'
                />
                <textarea
                    type='text'
                    className='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required={true}
                    placeholder='project desctiption'
                />
                <input
                    type='datetime'
                    name='startDate'
                    className='startDate'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type='datetime'
                    name='deadLine'
                    className='deadLine'
                    value={deadLine}
                    onChange={(e) => setDeadLine(e.target.value)}
                />
                <SelectStatus
                    handleOnChange={(value) => setStatus(value)}
                    defaultvalue={'will'}
                />
                <button type='submit'> create project </button>
            </form>
        </>
    )
}

export default CreateProjectForm
