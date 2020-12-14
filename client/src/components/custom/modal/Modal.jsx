import React, { useState } from 'react';
import classNames from 'classnames';
import ModalPortal from './portal/ModalPortal';
import './Modal.scss';

// Modal ####################################################

export const Modal = ({ children, content, clickOutside, disabled }) => {
  const [toggle, setToggle] = useState(false);

  const getChild = () => {
    return typeof children.type === 'function' ? children.type(children.props) : children;
  };

  const _children = getChild();
  const CLONE_CHILD_ELEMENT = React.Children.map(_children, (child) => {
    return React.cloneElement(
      child,
      {
        className: classNames('custom__modal__target', {
          [_children.props.className]: _children.props.className,
        }),
        onClick: () => {
          if (!disabled) setToggle(true);
        },
      },
      _children.props.children
    );
  });

  return (
    <>
      {CLONE_CHILD_ELEMENT}
      {toggle && (
        <ModalPortal clickOutside={clickOutside} setToggle={setToggle}>
          {content}
        </ModalPortal>
      )}
    </>
  );
};
