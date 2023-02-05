import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Note from './../Note/Note'
import Problem from './../Problem/Problem'
import SelectStatus from './../SelectStatus/SelectStatus'
import GridList from './../../layout/GridList/GridList'
import {
    updateProject,
    removeProject,
    addNote,
    addProblem,
} from './../../redux/reducers/ProjectReducer.js'

import './styles.css'

const ProjectPage = () => {
    const [note, setNote] = useState('')
    const [problem, setProblem] = useState('')
    const dispatch = useDispatch()
    const { id } = useParams()
    const projects = useSelector((state) => state.projects)
    const project = projects.find((project) => project.id === id)
    const projectId = id

    const navigate = useNavigate()

    const submitNote = (e) => {
        e.preventDefault()
        if (note.trim() === '') return
        dispatch(addNote({ projectId, text: note }))
        setNote('')
    }

    const submitProblem = (e) => {
        e.preventDefault()
        if (problem.trim() === '') return
        dispatch(addProblem({ projectId, title: problem }))
        setProblem('')
    }

    const handleRemoveProject = () => {
        dispatch(removeProject(projectId))
        navigate('/')
    }

    return (
        <>
            <h1>{project.title}</h1>
            <h3>{project.description}</h3>
            <button onClick={handleRemoveProject}>remove</button>
            <SelectStatus
                defaultvalue={project.status}
                handleOnChange={(status) => {
                    const updates = { status }
                    dispatch(updateProject({ projectId, updates }))
                }}
            />

            <div className='notes-section'>
                <GridList items={project.notes} projectId={projectId}>
                    <Note />
                </GridList>
                <form onSubmit={submitNote}>
                    <textarea
                        type='text'
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder='Create Note'
                    />
                    <button type='submit'> create Note</button>
                </form>
            </div>

            <div className='problems-section'>
                <GridList items={project.problems} projectId={projectId}>
                    <Problem />
                </GridList>
                <form onSubmit={submitProblem}>
                    <input
                        type='text'
                        placeholder='Problem title'
                        maxLength='40'
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                    />
                    <button type='submit'>create</button>
                </form>
            </div>
        </>
    )
}

export default ProjectPage
