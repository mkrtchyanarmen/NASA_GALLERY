import * as React from "react";

const SvgrMock = React.forwardRef((props, ref) => (
  <span ref={ref} {...props} />
));

export default SvgrMock;
