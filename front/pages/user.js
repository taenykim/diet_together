import React from 'react'
import proptypes from 'prop-types'

const user = ({ id }) => {
  return <div>id가 {id}인 유저정보</div>
}

user.proptypes = {
  id: proptypes.number.isRequired
}

user.getInitialProps = async context => {
  console.log(context.query.id)
  return { id: parseInt(context.query.id, 10) }
}

export default user
