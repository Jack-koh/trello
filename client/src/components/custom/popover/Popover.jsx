import React, { useState, useRef, Component, Dispatch } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import _ from 'lodash';
import './Popover.scss';

const popOverPositionHandler = ({ props, targetElement, popoverElement }) => {
  const { position, gap } = props;
  const targetRect = targetElement.getBoundingClientRect();

  const d_gap = gap;
  const d_bottom = targetRect.bottom + d_gap;
  const d_top = targetRect.top - popoverElement.clientHeight - d_gap;
  const d_left = targetRect.left - popoverElement.clientWidth - d_gap;
  const d_right = targetRect.right + d_gap;

  const v_center = targetRect.top + targetRect.height / 2 - popoverElement.clientHeight / 2; // prettier-ignore
  const v_top = targetRect.top; // prettier-ignore
  const v_bottom = targetRect.bottom - popoverElement.clientHeight; // prettier-ignore

  const h_center = targetRect.left + targetRect.width / 2 - popoverElement.clientWidth / 2; // prettier-ignore
  const h_left = targetRect.left;
  const h_right = targetRect.right - popoverElement.clientWidth;

  const setPosition = (standard, { direction, align }) => {
    if (standard === 'horizontal') {
      popoverElement.style.left = `${direction + window.pageXOffset}px`;
      popoverElement.style.top = `${align + window.pageYOffset}px`;
    }
    if (standard === 'virtical') {
      popoverElement.style.top = `${direction + window.pageYOffset}px`;
      popoverElement.style.left = `${align + window.pageXOffset}px`;
    }
  };

  // prettier-ignore
  switch (position) {
    case 'left-top': setPosition('horizontal', { direction: d_left, align: v_top }); break;
    case 'left-center': setPosition('horizontal', { direction: d_left, align: v_center }); break;
    case 'left-bottom': setPosition('horizontal', { direction: d_left, align: v_bottom }); break;
    case 'right-top': setPosition('horizontal', { direction: d_right, align: v_top }); break;
    case 'right-center': setPosition('horizontal', { direction: d_right, align: v_center }); break;
    case 'right-bottom': setPosition('horizontal', { direction: d_right, align: v_bottom }); break;
    case 'bottom-left': setPosition('virtical', { direction: d_bottom, align: h_left }); break;
    case 'bottom-center': setPosition('virtical', { direction: d_bottom, align: h_center }); break;
    case 'bottom-right': setPosition('virtical', { direction: d_bottom, align: h_right }); break;
    case 'top-left': setPosition('virtical', { direction: d_top, align: h_left }); break;
    case 'top-center': setPosition('virtical', { direction: d_top, align: h_center }); break;
    case 'top-right': setPosition('virtical', { direction: d_top, align: h_right }); break;
  }
};

export const Popover = ({
  children,
  content,
  position,
  clickOutside,
  clickInside,
  className,
  gap,
  disabled,
  closeOnScroll,
}) => {
  const [toggle, setToggle] = useState(false);
  const targetRef = useRef(null);

  const getChild = () => {
    return typeof children.type === 'function' ? children.type(children.props) : children;
  };

  const _children = getChild();
  const CLONE_CHILD_ELEMENT = React.Children.map(_children, (child) => {
    return React.cloneElement(
      child,
      {
        className: classNames('custom__popover__button', {
          [_children.props.className]: _children.props.className,
          'popover-on': toggle,
        }),
        onClick: () => setToggle(!toggle),
        ref: targetRef,
      },
      _children.props.children
    );
  });

  return (
    <>
      {CLONE_CHILD_ELEMENT}
      {!disabled && toggle && (
        <PopoverPortal
          clickOutside={clickOutside}
          clickInside={clickInside}
          closeOnScroll={closeOnScroll}
          className={className}
          position={position ? position.split(' ').join('-') : 'right-center'}
          target={targetRef.current}
          setToggle={setToggle}
          gap={gap ?? 12}
        >
          {content}
        </PopoverPortal>
      )}
    </>
  );
};

class PopoverPortal extends Component {
  constructor() {
    super();
    this.root = document.getElementById('root');
    this.popoverRoot = document.createElement('div');
    this.setPosition = () => undefined;
    this.setCloseOnScroll = () => undefined;
  }

  componentDidMount() {
    const {
      setToggle,
      target,
      position,
      className,
      clickOutside,
      clickInside,
      closeOnScroll,
    } = this.props;
    this.popoverRoot.classList.add(
      'absolute__popover__wrapper',
      position ? position.split(' ').join('-') : 'right-center',
      'wrapper__popover__custom__class'
    );

    if (className) this.popoverRoot.classList.add(className);

    if (this.root && target) {
      this.root.appendChild(this.popoverRoot);

      // 윈도우 리사이즈시 위치 다시 조정
      this.setPosition = () =>
        popOverPositionHandler({
          props: this.props,
          targetElement: target,
          popoverElement: this.popoverRoot,
        });
      this.setPosition();
      window.addEventListener('resize', this.setPosition);

      // 부모요소 스크롤시 팝오버 닫기
      if (closeOnScroll) {
        this.setCloseOnScroll = (e) => {
          const evTarget = e.target;
          if (evTarget.contains(target)) setToggle(false);
        };
        window.addEventListener('scroll', this.setCloseOnScroll, true);
      }

      if (clickOutside) document.addEventListener('mousedown', this.clickOutsideHandler);
      if (clickInside) {
        const clickInsideHandler = () => _.debounce(() => setToggle(false), 0)();
        this.popoverRoot.addEventListener('click', clickInsideHandler);
      }
    }
  }

  componentWillUnmount() {
    const { closeOnScroll } = this.props;
    this.root.removeChild(this.popoverRoot);
    document.removeEventListener('mousedown', this.clickOutsideHandler);
    window.removeEventListener('resize', this.setPosition);

    if (closeOnScroll) window.removeEventListener('scroll', this.setCloseOnScroll, true);
  }

  clickOutsideHandler = (e) => {
    const { setToggle, clickOutside, target } = this.props;
    if (target?.contains(e.target)) return;

    if (!this.popoverRoot.contains(e.target)) {
      if (typeof clickOutside === 'function') clickOutside();
      setToggle(false);
    }
  };

  render() {
    const { children, setToggle } = this.props;
    return createPortal(<Content content={children} setToggle={setToggle} />, this.popoverRoot);
  }
}

const Content = ({ content, setToggle }) => {
  const getContent = () => {
    return typeof content === 'function'
      ? content({ closeHandler: () => setToggle(false) })
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
        className: classNames({ [child.props.className]: child.props.className }),
      },
      child.props.children
    );
  });

  return <>{CONTENT_ELEMENT}</>;
};
