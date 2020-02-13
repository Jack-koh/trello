import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItem.scss";

const NavigationItem = props => {
  console.log("NavigationItem - check");
  return (
    <li className="navigation_item">
      <NavLink to={props.link} exact={props.exact} activeClassName="active">
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
