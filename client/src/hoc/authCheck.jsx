import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'store/actions';

function AuthCheck(props) {
  console.log('AuthCheck - check');
  const { children } = props;
  useEffect(() => {
    props.autoAuthCheck();
    const token = localStorage.getItem('token');
    if (!token) props.history.push('/Login');
  }, []);
  return <>{children}</>;
}

const mapDispatchToProps = dispatch => {
  return {
    autoAuthCheck: () => dispatch(actions.authCheck())
  };
};

export default connect(null, mapDispatchToProps)(withRouter(AuthCheck));
