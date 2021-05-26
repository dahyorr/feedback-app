import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header'
import { fetchUser } from '../actions'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'

class App extends React.Component {
	componentDidMount() {
		this.props.fetchUser()
	}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Header />
					<div className="container">
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

export default connect(null, { fetchUser })(App)
