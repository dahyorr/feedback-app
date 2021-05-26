import axios from 'axios'
import { FETCH_USER, SAVE_FORM, RESET_FORM, FETCH_SURVEYS } from './types'

export const fetchUser = () => async dispatch => {
	const response = await axios.get('/api/current_user')
	dispatch({
		type: FETCH_USER,
		payload: response.data,
	})
}

export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token)
	dispatch({
		type: FETCH_USER,
		payload: res.data,
	})
}

export const saveForm = (formTitle, values) =>{
	const action = {type: SAVE_FORM, payload: {}}
	action.payload[formTitle] = values
	return action
}

export const resetForm = (formTitle, values) =>{
	const action = {type: RESET_FORM, payload: {}}
	action.payload[formTitle] = {}
	return action
}

export const submitSurvey = (values, history) => async dispatch =>{
	const response = await axios.post('/api/surveys', values)
	history.push('/surveys');
	dispatch({
		type: FETCH_USER,
		payload: response.data,
	})
}

export const fetchSurveys = () => async dispatch =>{
	const response = await axios.get('/api/surveys')
	dispatch({
		type: FETCH_SURVEYS,
		payload: response.data
	})
}