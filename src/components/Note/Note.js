import { useState } from 'react'
import { useDispatch } from 'react-redux'
import InputColor from 'react-input-color'
import { updateNote, removeNote } from './../../redux/reducers/ProjectReducer'
import './styles.css'

const Note = ({ projectId, text, colors, id: noteId }) => {
    const [editmode, setEditmode] = useState(false)
    const [noteText, setNoteText] = useState(text)
    const [out, setOut] = useState('')
    const [textColor, setTextColor] = useState(colors.text)
    const [backgroundColor, setbackgroundColor] = useState(colors.background)
    const dispatch = useDispatch()

    const handleEditButton = () => {
        if (editmode) {
            const updates = {
                text: noteText,
                colors: {
                    background: backgroundColor.hex,
                    text: textColor.hex,
                },
            }
            dispatch(updateNote({ projectId, noteId, updates }))
        }
        setEditmode((prev) => !prev)
    }

    const handelRemoveNote = () => {
        setOut('out')
        setTimeout(() => {
            dispatch(removeNote({ projectId, noteId }))
        }, 500)
    }

    return (
        <div className={`note ${out}`}>
            <div className='control'>
                <div
                    className='back-color'
                    style={{ display: editmode ? 'block' : 'none' }}
                >
                    <InputColor
                        initialValue={colors.background}
                        onChange={setbackgroundColor}
                        placement='top'
                        disabled={!editmode}
                    />
                </div>
                <div
                    className='text-color'
                    style={{ display: editmode ? 'block' : 'none' }}
                >
                    <InputColor
                        initialValue={colors.text}
                        onChange={setTextColor}
                        placement='top'
                        disabled={!editmode}
                    />
                </div>
            </div>
            <textarea
                value={noteText}
                cols='25'
                rows='6'
                maxLength='150'
                disabled={!editmode}
                onChange={(e) => setNoteText(e.target.value)}
                style={{
                    backgroundColor: `${
                        editmode ? backgroundColor.hex : colors.background
                    }`,
                    color: `${editmode ? textColor.hex : colors.text}`,
                    border: `${
                        editmode ? '2px solid #00ff6a' : '2px solid transparent'
                    }`,
                }}
            ></textarea>
            <div className='control'>
                <p
                    onClick={handleEditButton}
                    className={editmode ? 'save' : 'edit'}
                >
                    {editmode ? 'save' : 'edit'}
                </p>
                <p onClick={handelRemoveNote} className='remove'>
                    remove
                </p>
            </div>
        </div>
    )
}

export default Note
