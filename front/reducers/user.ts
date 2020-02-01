import produce from 'immer'

export const initialState = {
  logInErrorReason: '',
  isSignedUp: false,
  signUpErrorReason: '',
  me: null, // 내 정보
  userInfo: null, // 남의 정보
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트
  editNicknameErrorReason: '', // 이름 변경 실패 사유
  hasMoreFollower: false,
  hasMoreFollowing: false
}

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST' as const
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS' as const
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE' as const

export const WEIGHT_POST_FAILURE = 'WEIGHT_POST_FAILURE' as const
export const WEIGHT_POST_SUCCESS = 'WEIGHT_POST_SUCCESS' as const
export const WEIGHT_POST_REQUEST = 'WEIGHT_POST_REQUEST' as const

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST' as const
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS' as const
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE' as const

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST' as const
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS' as const
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE' as const

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST' as const
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS' as const
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE' as const

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST' as const
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS' as const
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE' as const

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST' as const
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS' as const
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE' as const

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST' as const
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS' as const
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE' as const

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST' as const
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS' as const
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE' as const

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST' as const
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS' as const
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE' as const

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME' as const

export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST' as const
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS' as const
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE' as const

export const WEIGHT_DELETE_REQUEST = 'WEIGHT_DELETE_REQUEST' as const
export const WEIGHT_DELETE_SUCCESS = 'WEIGHT_DELETE_SUCCESS' as const
export const WEIGHT_DELETE_FAILURE = 'WEIGHT_DELETE_FAILURE' as const

export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      // 로그인 // LOG_IN_REQUEST
      case LOG_IN_REQUEST: {
        draft.logInErrorReason = ''
        break
      }
      case LOG_IN_SUCCESS: {
        draft.logInErrorReason = ''
        draft.me = action.data
        break
      }
      case LOG_IN_FAILURE: {
        draft.logInErrorReason = action.reason
        draft.me = null
        break
      }
      // 로그아웃 // LOG_OUT_REQUEST
      case LOG_OUT_REQUEST: {
        break
      }
      case LOG_OUT_SUCCESS: {
        draft.me = null
        break
      }
      case LOG_OUT_FAILURE: {
        break
      }
      // 회원가입 // SIGN_UP_REQUEST // api/user
      case SIGN_UP_REQUEST: {
        draft.isSignedUp = false
        draft.signUpErrorReason = ''
        break
      }
      case SIGN_UP_SUCCESS: {
        draft.isSignedUp = true
        break
      }
      case SIGN_UP_FAILURE: {
        draft.signUpErrorReason = action.error
        break
      }
      // 몸무게 추가 // WEIGHT_POST_REQUEST // api/user/weight
      case WEIGHT_POST_REQUEST: {
        break
      }
      case WEIGHT_POST_SUCCESS: {
        draft.me.Weights.push(action.data)
        break
      }
      case WEIGHT_POST_FAILURE: {
        break
      }
      case LOAD_USER_REQUEST: {
        break
      }
      case LOAD_USER_SUCCESS: {
        if (action.me) {
          draft.me = action.data
          break
        }
        draft.userInfo = action.data
        break
      }
      case LOAD_USER_FAILURE: {
        break
      }
      // 팔로우 // FOLLOW_USER_REQUEST // api/user/:id/follow
      case FOLLOW_USER_REQUEST: {
        break
      }
      case FOLLOW_USER_SUCCESS: {
        draft.me.Followings.unshift({ id: action.data })
        break
      }
      case FOLLOW_USER_FAILURE: {
        break
      }
      // 언팔로우 // UNFOLLOW_USER_REQUEST // api/user/:id/follow
      case UNFOLLOW_USER_REQUEST: {
        break
      }
      case UNFOLLOW_USER_SUCCESS: {
        const index = draft.me.Followings.indexOf(action.data)
        draft.me.Followings.splice(index, 1)
        const index2 = draft.followingList.indexOf(action.data)
        draft.followingList.splice(index2, 1)
        break
      }
      case UNFOLLOW_USER_FAILURE: {
        break
      }
      // 게시글 작성시 내 게시글 작성 수 업데이트
      case ADD_POST_TO_ME: {
        draft.me.Posts.unshift({ id: action.data })
        break
      }
      // 게시글 삭제시 내 게시글 작성 수 업데이트
      case REMOVE_POST_OF_ME: {
        const index = draft.me.Posts.findIndex(v => v.id === action.data)
        draft.me.Posts.splice(index, 1)
        break
      }
      case LOAD_FOLLOWERS_REQUEST: {
        draft.followerList = !action.offset ? [] : draft.followerList
        draft.hasMoreFollower = action.offset ? draft.hasMoreFollower : true // 처음 데이터를 가져올 때는 더보기 버튼을 보여주는 걸로
        break
      }
      case LOAD_FOLLOWERS_SUCCESS: {
        action.data.forEach(d => {
          draft.followerList.push(d)
        })
        draft.hasMoreFollower = action.data.length === 3
        break
      }
      case LOAD_FOLLOWERS_FAILURE: {
        break
      }
      case LOAD_FOLLOWINGS_REQUEST: {
        draft.followingList = !action.offset ? [] : draft.followingList
        draft.hasMoreFollowing = action.offset ? draft.hasMoreFollowing : true // 처음 데이터를 가져올 때는 더보기 버튼을 보여주는 걸로
        break
      }
      case LOAD_FOLLOWINGS_SUCCESS: {
        action.data.forEach(d => {
          draft.followingList.push(d)
        })
        draft.hasMoreFollowing = action.data.length === 3
        break
      }
      case LOAD_FOLLOWINGS_FAILURE: {
        break
      }
      case REMOVE_FOLLOWER_REQUEST: {
        break
      }
      case REMOVE_FOLLOWER_SUCCESS: {
        const index = draft.me.Followers.findIndex(v => v.id === action.data)
        draft.me.Followers.splice(index, 1)
        const index2 = draft.followerList.findIndex(v => v.id === action.data)
        draft.followerList.splice(index2, 1)
        break
      }
      case REMOVE_FOLLOWER_FAILURE: {
        break
      }
      // 닉네임 수정 // EDIT_NICKNAME_REQUEST // api/user/nickname
      case EDIT_NICKNAME_REQUEST: {
        draft.editNicknameErrorReason = ''
        break
      }
      case EDIT_NICKNAME_SUCCESS: {
        draft.me.nickname = action.data
        break
      }
      case EDIT_NICKNAME_FAILURE: {
        draft.editNicknameErrorReason = action.error
        break
      }
      // 몸무게 삭제 // WEIGHT_DELETE_REQUEST // api/user/weight/:id
      case WEIGHT_DELETE_REQUEST: {
        break
      }
      case WEIGHT_DELETE_SUCCESS: {
        const index = draft.me.Weights.indexOf(action.data)
        draft.me.Weights.splice(index, 1)
        break
      }
      case WEIGHT_DELETE_FAILURE: {
        break
      }
      default: {
        break
      }
    }
  })
}
