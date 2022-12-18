import { v4 as uuidv4 } from 'uuid'
import { CREATE, UPDATE, DELETE } from './types'

// Project actions
export const createProject = (
    title,
    description,
    startDate = null,
    deadLine = null,
    status = 'will'
) => {
    const now = new Date().getTime()
    return {
        type: CREATE,
        project: {
            id: uuidv4(),
            title,
            description,
            createdAt: now,
            lastEdit: now,
            startDate: startDate || now,
            deadLine: deadLine,
            status: status,
            notes: [],
            problems: [],
        },
    }
}

export const updateProject = (project, updates) => {
    return {
        type: UPDATE,
        project: {
            ...project,
            ...updates,
            lastEdit: new Date().getTime(),
        },
    }
}

export const deleteProject = (project) => ({ type: DELETE, project })

// Notes actions
export const addNote = (project, text) => {
    const now = new Date().getTime()
    const notes = [...project.notes]
    notes.push({
        text,
        id: uuidv4(),
        createdAt: now,
        lastEdit: now,
        colors: { text: '#FFFFFF', background: '#000000' },
    })
    return {
        type: UPDATE,
        project: { ...project, notes, lastEdit: now },
    }
}

export const updateNote = (project, newNote) => {
    const now = new Date().getTime()
    newNote.lastEdit = now
    const notes = [...project.notes]
    const noteIndex = notes.findIndex((note) => note.id === newNote.id)
    notes[noteIndex] = newNote
    return {
        type: UPDATE,
        project: {
            ...project,
            notes,
            listEdit: now,
        },
    }
}

export const removeNote = (project, noteId) => {
    const now = new Date().getTime()
    const notes = [...project.notes]
    const noteIndex = notes.findIndex((note) => note.id === noteId)
    notes.splice(noteIndex, 1)
    return {
        type: UPDATE,
        project: {
            ...project,
            notes,
            lastEdit: now,
        },
    }
}

// problems actions
export const addProblem = (project, title, description) => {
    const now = new Date().getTime()
    const problems = [...project.problems]
    problems.push({
        title,
        description,
        id: uuidv4(),
        createdAt: now,
        lastEdit: now,
        todos: [],
    })
    return {
        type: UPDATE,
        project: { ...project, problems, lastEdit: now },
    }
}

export const updateProblem = (project, newProblem) => {
    const now = new Date().getTime()
    newProblem.lastEdit = now
    const problems = [...project.problems]
    const newProblemIndex = problems.findIndex(
        (problem) => problem.id === newProblem.id
    )
    problems[newProblemIndex] = newProblem
    return {
        type: UPDATE,
        project: {
            ...project,
            problems,
            lastEdit: now,
        },
    }
}

export const removeProblem = (project, problemId) => {
    const now = new Date().getTime()
    const problems = [...project.problems]
    const problemIndex = problems.findIndex(
        (problem) => problem.id === problemId
    )
    problems.splice(problemIndex, 1)
    return {
        type: UPDATE,
        project: {
            ...project,
            problems,
            lastEdit: now,
        },
    }
}
