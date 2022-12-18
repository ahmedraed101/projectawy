import { v4 as uuidv4 } from 'uuid'

const now = () => new Date().getTime()

const main = { genId: uuidv4, now }

export default main
