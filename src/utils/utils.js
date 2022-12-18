import { v4 as uuidv4 } from 'uuid'
export const createTodo = (text) => ({
    text,
    id: uuidv4(),
    createdAt: new Date().getTime(),
    done: false,
})
