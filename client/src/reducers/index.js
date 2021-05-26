import { combineReducers } from 'redux'
import { FETCH_USER, FETCH_SURVEYS,  SAVE_FORM, RESET_FORM } from '../actions/types'

const authReducer = (state = null, action) => {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false
		default:
			return state
	}
}

const formReducer = (state = {surveyForm:{}}, action) => {
	switch (action.type) {
		
		case RESET_FORM:
		case SAVE_FORM:
			return { ...state, ...action.payload }
		default:
			return state
	}
}

const surveyReducer = (state=[], action) =>{
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload
		default:
			return state
	}
}

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	surveys: surveyReducer,
})
