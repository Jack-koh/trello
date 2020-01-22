import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from 'store/actions/index'

import SideBar from 'hoc/Layout/SideBar'
import Board from 'components/Boards/Boards'
import Layout from 'hoc/Layout/MainGnb'

function Main(props) {
    useEffect(() => {
        props.autoAuthCheck()
        const token = localStorage.getItem('token')
        if (!token) props.history.push('/Login');
    }, [])

    return (
        <Layout>
            <SideBar>
                <Board />
            </SideBar>
        </Layout>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        autoAuthCheck: () => dispatch(actions.authCheck())
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Main));