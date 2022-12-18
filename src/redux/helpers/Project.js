import main from './index'
const { genId, now } = main

const create = ({
    title,
    description,
    startDate = 0,
    deadLine = 0,
    status = 'will',
}) => {
    const timestamp = now()
    return {
        id: genId(),
        createdAt: timestamp,
        lastEdit: timestamp,
        title,
        description,
        startDate,
        deadLine,
        status,
        notes: [],
        problems: [],
    }
}

const update = (project) => ({ ...project, lastEdit: now() })

const projectHelper = { create, update }
export default projectHelper
