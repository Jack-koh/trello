import React from "react";
import { connect } from "react-redux";
import "./template.scss";

function Template() {
  console.log("Template - check");
  return (
    <div className="template-wrap">
      <div className="template-inner-area">Template</div>
    </div>
  );
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Template);
