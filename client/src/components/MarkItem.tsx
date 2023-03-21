import React from 'react'
import '../styles/MarkItem.scss'
interface MarkItemI {
    name: string,
    mark: number | string,
    maxMark: number | string
}

const MarkItem: React.FC<MarkItemI> = ({name, mark, maxMark}) => {
    return (
        <div className='MarkItem'>
            <p>{name}</p>
            <h1>{mark}/{maxMark}</h1>
        </div>
    )
}

export default MarkItem