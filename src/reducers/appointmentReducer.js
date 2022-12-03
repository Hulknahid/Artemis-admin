
import { appointmentConstants } from '../constants/appointment-constants'

const initState = {}

const appointmentName = (state = initState, action) => {
  switch (action.type) {
    case appointmentConstants.APPOINTMENT_NAME:
      return {
        ...initState,
        name: action.payload
      }
    case appointmentConstants.APPOINTMENT_ADD_TIME:
      return {
        ...initState,
        start: action.start,
        end: action.end
      }

    default:
      return state;
  }
}

export default appointmentName;