import React, { useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from 'store/actions'

import SideBar from 'hoc/layout/SideBar'
import Board from 'components/main/boards/Boards'
import Tamplate from 'components/main/template/Tamplate'
import Home from 'components/main/home/Home'
import Layout from 'hoc/layout/MainGnb'

function Main(props) {
    useEffect(() => {
        props.autoAuthCheck()
        const token = localStorage.getItem('token')
        if (!token) props.history.push('/Login');
        if (props.location.pathname === '/main') {
            props.history.push('/main/boards')
        }
    }, [])

    return (
        <Layout>
            <SideBar>
                <Route path="/main/boards" component={Board}></Route>
                <Route path="/main/template" component={Tamplate}></Route>
                <Route path="/main/home" component={Home}></Route>
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