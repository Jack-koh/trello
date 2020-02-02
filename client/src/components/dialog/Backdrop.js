import React from "react";
function Backdrop() {
  const style = {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#ffffff",
    zIndex: 10
  };

  return <div style={style} />;
}

export default Backdrop;
