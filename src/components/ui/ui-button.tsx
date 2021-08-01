import React from "react";
import { Button } from "react-bootstrap";

function UIButton<T>() {
    return ();
  }
  
  const PureUIButton = React.memo(UIButton);
  
  export { PureUIButton as UIButton };
  