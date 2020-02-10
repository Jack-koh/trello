import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "store/actions";

function Board(props) {
  useEffect(() => {
    return () => {
      props.onInitTrelloItem();
    };
  }, []);

  return <div>안녕하세요</div>;
}

const mapDispatchToProp = dispatch => {
  return {
    onInitTrelloItem: () => dispatch(actions.initTrelloItem())
  };
};

export default connect(null, mapDispatchToProp)(Board);
