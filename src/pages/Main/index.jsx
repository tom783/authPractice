import * as React from 'react'
import {Link} from 'react-router-dom'

const Main = () => {
  return (
    <div>
      <h2>main</h2>
      <div>
        <div>
          <Link to="/signin">로그인</Link>
        </div>
        <div>
          <Link to="/signup">회원가입</Link>
        </div>
        <div>
          <Link to="/changePassword">비밀번호 찾기</Link>
        </div>
      </div>
    </div>
  )
}

export default Main