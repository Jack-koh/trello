import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'store/actions';

function AuthCheck(props) {
  console.log('AuthCheck - check');
  const { children, autoAuthCheck, history } = props;
  useEffect(() => {
    autoAuthCheck();
    const token = localStorage.getItem('token');
    if (!token) history.push('/Login');
  }, [autoAuthCheck, history]);
  return <>{children}</>;
}

const mapDispatchToProps = dispatch => {
  return {
    autoAuthCheck: () => dispatch(actions.authCheck())
  };
};

export default connect(null, mapDispatchToProps)(withRouter(AuthCheck));
