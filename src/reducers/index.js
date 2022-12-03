import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'


// Import All Reducer 
import auth from './auth-reducer'
import profile from './profile-reducer';
import jobs from './job-reducer'
import appointmentName from './appointmentReducer';
import agencies from './agency-reducer';
import clients from './client-reducer';
import contacts from './contact-reducer';
import candidates from './candidate-reducer';
import applyReducer from './job-apply-reducer';
import modal from './modal-reduces';
import skills from './skill-reducer';


const rootReducer = combineReducers({
  auth,
  profile,
  jobs,
  appointmentName,
  agencies,
  clients,
  contacts,
  candidates,
  applyReducer,
  modal,
  skills
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));


export default store;