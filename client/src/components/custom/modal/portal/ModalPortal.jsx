import React, { Component } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';

// MinimizePortal ###############################################

class ModalPortal extends Component {
  constructor() {
    super();
    this.root = document.getElementById('root');
    this.modalRoot = document.createElement('div');
  }

  componentDidMount() {
    const { clickOutside } = this.props;
    this.modalRoot.classList.add('absolute__modal__wrapper');
    if (this.root) this.root.appendChild(this.modalRoot);

    if (clickOutside) document.addEventListener('mousedown', this.clickOutsideHandler);
  }

  componentWillUnmount() {
    this.root.removeChild(this.modalRoot);
    document.removeEventListener('mousedown', this.clickOutsideHandler);
  }

  clickOutsideHandler = (e) => {
    const { setToggle, clickOutside } = this.props;
    const backScreen = document.getElementById('modal__background__screen');
    if (e.target === backScreen) {
      if (typeof clickOutside === 'function') clickOutside();
      setToggle(false);
    }
  };

  render() {
    const { children, setToggle } = this.props;
    return createPortal(<Content content={children} setToggle={setToggle} />, this.modalRoot);
  }
}

// MinimizeContent ###############################################
const Content = ({ content, setToggle }) => {
  const getContent = () => {
    return typeof content === 'function'
      ? content({
          closeHandler: () => setToggle(false),
          minimizeHandler: () => false,
        })
      : content;
  };
  const _content = getContent();
  const getSecondContent = () => {
    return typeof _content.type === 'function' ? _content.type(_content.props) : _content;
  };
  const peeledContent = getSecondContent();
  const CONTENT_ELEMENT = React.Children.map(peeledContent, (child) => {
    return React.cloneElement(
      child,
      {
        className: classNames('modal__portal', {
          [child.props.className]: child.props.className,
        }),
      },
      child.props.children
    );
  });

  return (
    <>
      {CONTENT_ELEMENT}
      <div id="modal__background__screen" />
    </>
  );
};

export default ModalPortal;
