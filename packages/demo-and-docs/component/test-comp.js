import PropTypes from 'prop-types'
import React from 'react'

export const TestComp = ({
  name,
  justUpdate
}) => {
  console.log('v-- rendering ', name)
  return <div>{justUpdate ? name : ''}</div>
}

TestComp.propTypes = {
  justUpdate: PropTypes.bool,
  name: PropTypes.string
}
