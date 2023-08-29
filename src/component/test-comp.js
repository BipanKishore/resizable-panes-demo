import PropTypes from 'prop-types'
import React from 'react'

export const TestComp = ({

    name
}) => {

    console.log('v-- rendering ', name)
    return <div>{name}</div>

}

TestComp.propTypes = {
    name: PropTypes.string
}