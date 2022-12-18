import React from 'react'
import './styles.css'

const GridList = (payload) => {
    const { children, items, projectId } = payload
    const renderItems = items.map((item) =>
        React.cloneElement(children, { key: item.id, projectId, ...item })
    )
    return <div className='flex'>{renderItems}</div>
}

export default GridList
