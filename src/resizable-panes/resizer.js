import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

export const Resizer = forwardRef((props, ref) => {
  const { onMouseDown, resizerSize } = props;
  return (
    <div
      style={{
        height: `${resizerSize}px`,
      }}
      className="resizer vertical-cursur"
      onMouseDown={onMouseDown}
      ref={ref}
    />
  );
})

Resizer.propTypes = {
  resizerSize: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func.isRequired,
};
