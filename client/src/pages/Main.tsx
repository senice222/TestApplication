import React from 'react'
import upgrade from '../assets/upgrade.png'
import test from '../assets/search.png'
import '../styles/Main.scss'
const Main = () => {
    return (
        <div className='main'>
            <div className='mainPageBlock'>
                <img className='mainPageImg' src={upgrade} alt=''></img>
                <p className='mainPageDescr'>On our site you can take tests that will help you develop yourself</p>
            </div>
            <hr className='hr'/>
            <div className='mainPageBlock'>
                <p style={{textAlign: 'right', marginRight: '6px'}} className='mainPageDescr'>On our site you can take
                    tests that will help you develop yourself</p>
                <img className='mainPageImg' src={test} alt=''></img>
            </div>
        </div>
    )
}

export default Main