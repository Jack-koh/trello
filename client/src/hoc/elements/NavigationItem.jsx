import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.scss';

const NavigationItem = props => {
  console.log('NavigationItem - check');
  const { children, link, exact } = props;
  return (
    <li className="navigation_item">
      <NavLink to={link} exact={exact} activeClassName="active">
        {children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
