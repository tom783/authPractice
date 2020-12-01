import * as React from 'react'

const SignIn = (props) => {
  console.log("??", props)
  const onClick = e => {
    console.log("click")
    props.setState('click')
  }

  return (
    <div>
      SignIn
      <div>
        <button onClick={onClick}>click</button>
      </div>
    </div>
  )
}

export default SignIn