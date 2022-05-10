import React, { Fragment } from "react";

function Toggle(props) {
  const { visible, children } = props;

  return visible ? children : <Fragment />;
}

export default Toggle;
