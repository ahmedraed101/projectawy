import { createSlice } from '@reduxjs/toolkit'
import projectHelper from './../helpers/Project'
import noteHelper from './../helpers/Note'
import problemHelper from './../helpers/Problem'

const defaultState = localStorage.getItem('projectawy')
    ? JSON.parse(localStorage.getItem('projectawy')).projects
    : []

// const ProjectReducer = (state = defaultState, action) => {
//     switch (action.type) {
//         case CREATE:
//             return [...state, action.project]
//         case UPDATE:
//             let newState = [...state]
//             let index = newState.findIndex(
//                 (project) => project.id === action.project.id
//             )
//             newState[index] = { ...newState[index], ...action.project }
//             return newState

//         case DELETE:
//             return state.filter((project) => project.id !== action.project.id)

//         default:
//             return state
//     }
// }

// export default ProjectReducer

const ProjectsSlice = createSlice({
    name: 'projects',
    initialState: defaultState,
    reducers: {
        createProject: {
            reducer(state, { payload }) {
                state.push(payload)
            },
            prepare(data) {
                return {
                    payload: projectHelper.create(data),
                }
            },
        },

        updateProject: (state, { payload: { projectId, updates } }) => {
            const projectIndex = state.findIndex(
                (project) => project.id === projectId
            )
            if (projectIndex === -1) return
            state[projectIndex] = { ...state[projectIndex], ...updates }
        },

        removeProject: (state, { payload: { projectId } }) => {
            // state = state.filter((project) => project.id !== projectId)
            const projectIndex = state.find(
                (project) => project.id === projectId
            )
            state.splice(projectIndex, 1)
        },

        // Notes reducers

        addNote(state, { payload: { projectId, text } }) {
            const existingProject = state.find(
                (project) => project.id === projectId
            )
            if (!existingProject) return
            const note = noteHelper.create(text)
            existingProject.notes.push(note)
            existingProject.lastEdit = note.lastEdit
        },

        updateNote(state, { payload: { projectId, noteId, updates } }) {
            const existingProject = state.find(
                (project) => project.id === projectId
            )
            if (!existingProject) return

            const noteIndex = existingProject.notes.findIndex(
                (note) => note.id === noteId
            )
            if (noteIndex === -1) return

            const note = existingProject.notes[noteIndex]
            const newNote = noteHelper.update({
                ...note,
                ...updates,
            })
            existingProject.notes[noteIndex] = newNote
            existingProject.lastEdit = newNote.lastEdit
        },

        removeNote(state, { payload: { projectId, noteId } }) {
            const projectIndex = state.findIndex(
                (project) => project.id === projectId
            )
            if (projectIndex === -1) return

            const noteIndex = state[projectIndex].notes.findIndex(
                (note) => note.id === noteId
            )
            if (noteIndex === -1) return

            state[projectIndex].notes.splice(noteIndex, 1)
            state[projectIndex] = projectHelper.update(state[projectIndex])
        },

        // Problems reducers

        addProblem(state, { payload: { projectId, title } }) {
            const existingProject = state.find(
                (project) => project.id === projectId
            )
            if (!existingProject) return
            const problem = problemHelper.create(title)
            existingProject.problems.push(problem)
            existingProject.lastEdit = problem.lastEdit
        },

        updateProblem(state, { payload: { projectId, problemId, updates } }) {
            const existingProject = state.find(
                (project) => project.id === projectId
            )
            if (!existingProject) return

            const problemIndex = existingProject.problems.findIndex(
                (note) => note.id === problemId
            )
            if (problemIndex === -1) return

            const note = existingProject.problems[problemIndex]
            const newProblem = problemHelper.update({
                ...note,
                ...updates,
            })
            existingProject.problems[problemIndex] = newProblem
            existingProject.lastEdit = newProblem.lastEdit
        },

        removeProblem(state, { payload: { projectId, problemId } }) {
            const projectIndex = state.findIndex(
                (project) => project.id === projectId
            )
            if (projectIndex === -1) return

            const problemIndex = state[projectIndex].problems.findIndex(
                (problem) => problem.id === problemId
            )
            if (problemIndex === -1) return

            state[projectIndex].problems.splice(problemIndex, 1)
            state[projectIndex] = projectHelper.update(state[projectIndex])
        },

        // problem's todos
        addTodo(state, { payload: { projectId, problemId, text } }) {
            const projectIndex = state.findIndex(
                (project) => project.id === projectId
            )
            if (projectIndex === -1) return

            const problem = state[projectIndex].problems.find(
                (p) => p.id === problemId
            )
            if (!problem) return

            problemHelper.addTodo(problem, text)
        },

        toggleTodo(state, { payload: { projectId, problemId, todoId } }) {
            const projectIndex = state.findIndex(
                (project) => project.id === projectId
            )
            if (projectIndex === -1) return

            const problem = state[projectIndex].problems.find(
                (p) => p.id === problemId
            )
            problemHelper.toggleTodo(problem, todoId)
        },

        removeTodo(state, { payload: { projectId, problemId, todoId } }) {
            const projectIndex = state.findIndex(
                (project) => project.id === projectId
            )
            if (projectIndex === -1) return

            const problem = state[projectIndex].problems.find(
                (p) => p.id === problemId
            )
            problemHelper.removeTodo(problem, todoId)
        },
    },
})

export const {
    createProject,
    updateProject,
    removeProject,
    addNote,
    updateNote,
    removeNote,
    addProblem,
    updateProblem,
    removeProblem,
    addTodo,
    toggleTodo,
    removeTodo,
} = ProjectsSlice.actions

export default ProjectsSlice
// const example = [
//     {
//         id: '1id',
//         title: 'title',
//         description: 'description',
//         createdAt: 'Date',
//         lastEdit: 'Date',
//         startDate: 'Date', // default is the same as createdAt
//         deadLine: 'Date', // default null
//         status: 'will', // working / done
//         notes: [
//             {
//                 text: '',
//                 createdAt: 'Date',
//                 lastEdit: 'Date',
//                 colors: { text: '#FFFFFF', background: '#000000' },
//             },
//         ],
//         problems: [
//             {
//                 title: 'title',
//                 description: 'description', // or null
//                 createdAt: 'Date',
//                 lastEdit: 'Date',
//                 status: 'will', // working / done
//                 todos: [
//                     {
//                         id: 'id',
//                         text: '',
//                         createdAt: 'Date',
//                         done: false,
//                     },
//                 ],
//             },
//         ],
//     },
// ]

// const exampleEmpty = [
//     {
//         id: '1id',
//         title: 'title',
//         description: 'description',
//         createdAt: 'Date',
//         lastEdit: 'Date',
//         startDate: 'Date', // default is the same as createdAt
//         deadLine: null, // default null
//         status: 'will', // working / done
//         notes: [],
//         problems: [],
//     },
// ]
