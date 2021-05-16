import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import 'materialize-css/dist/css/materialize.min.css'
import App from './components/App'
import reducers from './reducers'

const store = createStore(reducers, applyMiddleware(reduxThunk))

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
console.log('stripe kty', process.env.REACT_APP_STRIPE_KEY)
console.log('node', process.env.NODE_ENV)