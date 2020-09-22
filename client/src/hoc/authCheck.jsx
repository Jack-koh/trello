import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as action from 'store/actions';

function AuthCheck(props) {
  const dispatch = useDispatch();
  const autoAuthCheck = useCallback(() => dispatch(action.authCheck()), [dispatch]);

  const { children, history } = props;
  useEffect(() => {
    autoAuthCheck();
    const token = localStorage.getItem('token');
    if (!token) history.push('/Login');
  }, [autoAuthCheck, history]);
  return <>{children}</>;
}

export default withRouter(AuthCheck);
