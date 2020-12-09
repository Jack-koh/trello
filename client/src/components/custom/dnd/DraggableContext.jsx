import React, { Component } from 'react';

const Context = React.createContext();

export class DragDropContext extends Component {
  constructor(props) {
    super(props);
    this.source = null;
    this.destination = null;
    this.placeholder = React.createElement('div');
    this.state = {
      provided: [],
    };
  }

  static contextType = Context;

  addProvided = (provided) => {
    this.setState({ provided: [...this.state.provided, provided] });
  };

  render() {
    return (
      <Context.Provider value={{ state: this.state, addProvided: this.addProvided }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export class Droppable extends Component {
  constructor(props) {
    super(props);
    this.innerRef = React.createRef();
  }
  static contextType = Context;

  componentDidMount() {
    const { droppableId, type } = this.props;
    this.context.addProvided({ droppableId, type, innerRef: this.innerRef });
    const { children } = this.props;
    if (typeof children !== 'function') throw new Error('Should be a funtion');
  }

  componentDidUpdate() {
    this.innerRef.current.ondragover = (e) => {
      // console.log(e.dataTransfer.getData('text/plain'));
      e.preventDefault();
    };
    const children = Array.from(this.innerRef.current.children);
    children.forEach((child) => {
      const draggComp = child.getAttribute('data-draggable');
      if (!draggComp) throw new Error('Should be a draggable component <Draggable>');
    });
  }

  render() {
    const { droppableId } = this.props;
    const provided = this.context.state.provided.find((item) => item.droppableId === droppableId);
    const child = this.props.children(provided);
    const cloneChild = React.cloneElement(child, { id: droppableId, ref: this.innerRef });
    return provided ? <>{cloneChild}</> : <></>;
  }
}

export class Draggable extends Component {
  constructor(props) {
    super(props);
    this.sourceRef = React.createRef();
    this.source = null;
    this.drag;
  }

  static contextType = Context;

  componentDidMount() {
    this.source = this.sourceRef.current;
  }

  dragStartHandler = (e) => {
    console.log(e);
    e.dataTransfer.setData('text/plain', this.source.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  dragEnterHandler = (e) => {
    console.log(e.currentTarget);
    // if (e.currentTarget.id !== this.source.id) {
    //   const destination = document.getElementById(e.currentTarget.id);
    //   const destIndex = this.draggableElements.indexOf(destination);
    //   const sourceIndex = this.draggableElements.indexOf(this.source);
    //   destination.insertAdjacentElement('afterend', this.placeholder);
    //   if (destIndex > sourceIndex) {
    //     destination.insertAdjacentElement('afterend', this.placeholder);
    //   } else {
    //     destination.insertAdjacentElement('beforebegin', this.placeholder);
    //   }
    //   this.draggableElements[destIndex] = this.source;
    //   this.draggableElements[sourceIndex] = destination;
    //   // this.source.insertAdjacentElement('afterend', destination);
    // }
  };

  render() {
    const { draggableId } = this.props;
    return (
      <div ref={this.sourceRef} id={draggableId}>
        {this.props.children({
          dragHandleProps: {
            dragHandleProps: {
              draggable: true,
              onDragStart: this.dragStartHandler,
              onDragEnter: this.dragEnterHandler,
            },
          },
        })}
      </div>
    );
  }
}

// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// const Content: React.FC<{
//   content: T_Content_Function | JSX.Element;
//   setToggle: Dispatch<boolean>;
// }> = ({ content, setToggle }) => {
//   const getContent = (): JSX.Element => {
//     return typeof content === 'function' ? content({ closeHandler: () => setToggle(false) }) : content;
//   };
//   const _content = getContent();
//   const getSecondContent = (): JSX.Element => {
//     return typeof _content.type === 'function' ? _content.type(_content.props) : _content;
//   };
//   const peeledContent = getSecondContent();
//   const CONTENT_ELEMENT = React.Children.map(
//     peeledContent,
//     (child: JSX.Element): JSX.Element => {
//       return React.cloneElement(
//         child,
//         {
//           className: classNames({
//             [child.props.className]: child.props.className,
//           }),
//         },
//         child.props.children
//       );
//     }
//   );

//   return <>{CONTENT_ELEMENT}</>;
// };
