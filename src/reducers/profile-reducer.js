import { profileConstans } from '../constants'

const initState = {
  profileIn: false,
  singleProfile: {}
}

const customPopupReducer = (state = initState, action) => {
  switch (action.type) {
    case profileConstans.PROFILE_IN:
      return {
        ...state,
        profileIn: true
      }
    case profileConstans.PROFILE_OUT:
      return {
        ...state,
        profileIn: false,
      }
    case profileConstans.PROFILE_SINGLE_REQUEST:
      return {
        ...state,
        profileLoading: true,
        profileIn: true,
        route: action.route
      }
    case profileConstans.PROFILE_SINGLE_SUCCESS:
      return {
        ...state,
        profileLoading: false,
        singleProfile: action.payload,
        profileIn: true
      }
    default:
      return state;
  }
}

export default customPopupReducer;