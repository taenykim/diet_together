import React from 'react'

const NicknameEditForm = () => {
  return (
    <>
      <form>
        <label htmlFor="nickname">닉네임</label>
        <input name="nickname" />
        <button>수정</button>
      </form>
    </>
  )
}

export default NicknameEditForm
