import React from "react";
import { connect } from "react-redux";
import "./template.scss";

function Template() {
  console.log("Template - check");
  return (
    <section className="template_wrap">
      <div className="template_inner_area">Template</div>
    </section>
  );
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Template);
