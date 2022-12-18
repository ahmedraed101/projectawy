import main from './index'
const { genId, now } = main

const create = (title) => {
    const timestamp = now()
    return {
        id: genId(),
        title,
        createdAt: timestamp,
        lastEdit: timestamp,
        description: '',
        status: 'unsolved',
        todos: [],
    }
}

const update = (problem) => ({ ...problem, lastEdit: now() })

const addTodo = (problem, text) => {
    const timestamp = now()
    problem.todos.push({
        id: genId(),
        text,
        createdAt: timestamp,
        done: false,
    })
    problem.lastEdit = timestamp
    return problem
}

const removeTodo = (problem, todoId) => {
    const todoIndex = problem.todos.findIndex((todo) => todo.id === todoId)
    problem.todos.splice(todoIndex, 1)
    problem.lastEdit = now()
    return problem
}

const toggleTodo = (problem, todoId) => {
    const todo = problem.todos.find((todo) => todo.id === todoId)
    todo.done = !todo.done
    problem.lastEdit = now()
    return problem
}

const problemHelper = { create, update, addTodo, removeTodo, toggleTodo }
export default problemHelper
