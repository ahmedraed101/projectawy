import { useState } from 'react'
import './styles.css'
const SelectStatus = ({ defaultvalue, handleOnChange }) => {
    const [status, setStatus] = useState(defaultvalue)
    const change = (e) => {
        setStatus(e.target.value)
        handleOnChange(e.target.value)
    }
    return (
        <>
            <select
                name='status'
                className='status'
                value={status}
                onChange={change}
            >
                <option value='will'> Will Start </option>
                <option value='working'> Working </option>
                <option value='hold'> on Hold </option>
                <option value='done'> Done </option>
            </select>
        </>
    )
}

export default SelectStatus
