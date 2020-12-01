import validator from 'validator'

export const fullNameValidator = (value) => {
  if (value.length === 0) return '필수 사항입니다'
  return ''
}

export const emailValidator = (value) => {
  if (value.length === 0) return ''
  if (!validator.isEmail(value)) return '이메일 형식에 맞지 않습니다'
  return ''
}

export const passwordValidator = (value) => {
  if (value.length === 0) return ''
  if (
    !validator.matches(
      value,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,40}$/i,
    )
  )
    return '비밀번호는 6자 이상, 대소문자, 숫자, 특수문자가 섞여있어야 합니다'
  return ''
}

export const passwordAgainValidator = (originPassword, confirmPassword) => {
  if (originPassword !== confirmPassword)
    return '입력한 비밀번호가 서로 다릅니다'
  return ''
}
