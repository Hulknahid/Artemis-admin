import { profileConstans } from '../constants'
import { profileService } from '../services'


// Single Profile
export const getSingleProfile = (route, id) => dispatch => {
  // Get Sinlge Agency or Client 
  dispatch({
    type: profileConstans.PROFILE_SINGLE_REQUEST,
    route: route
  })
  profileService.fetchSingleProfile(route, id)
    .then(res => dispatch({
      type: profileConstans.PROFILE_SINGLE_SUCCESS,
      payload: res.data
    }))
    .catch(error => console.log(error.response))

}

// Profile Visible 
export const profileVisible = () => {
  return {
    type: profileConstans.PROFILE_IN
  }
}

// Profile Invisible 
export const profileInvisible = () => {
  return {
    type: profileConstans.PROFILE_OUT
  }
}
