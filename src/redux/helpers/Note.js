import main from './index'
const { genId, now } = main

const create = (text) => {
    const timestamp = now()
    return {
        text,
        id: genId(),
        lastEdit: timestamp,
        createdAt: timestamp,
        colors: { background: '#ffffff', text: '#000000' },
    }
}

const update = (note) => ({ ...note, lastEdit: now() })

const noteHelper = {
    create,
    update,
}

export default noteHelper
