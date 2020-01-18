import React from 'react'

import SideBar from 'hoc/Layout/SideBar'
import Board from 'components/Boards/Boards'
import Layout from 'hoc/Layout/MainGnb'

function Main() {
    return (
        <Layout>
            <SideBar>
                <Board />
            </SideBar>
        </Layout>
    ) 
} 

export default Main;