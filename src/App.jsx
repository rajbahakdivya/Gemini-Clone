import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import { Context } from './context/Context'
import Main from './components/Main/Main'

const App = () =>{
    return(
        <>
        <Sidebar/>
        <Main/>
        <Context/>
        
        </>
    )
}

export default App