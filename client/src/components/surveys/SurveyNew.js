import React from 'react'
import {connect} from 'react-redux'
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'
import {resetForm} from '../../actions'

class SurveyNew extends React.Component {
	state = { showFormReview: false }
	componentWillUnmount() {
		this.props.resetForm('surveyForm')
	}

	render() {
		return (
			<div>
				{this.state.showFormReview ? (
					<SurveyFormReview 
						onCancel={() =>this.setState({showFormReview:false})}
					/>
				) : (
					<SurveyForm
						onSurveySubmit={() =>
							this.setState({ showFormReview: true })
						}
					/>
				)}
			</div>
		)
	}
}
export default connect(null, {resetForm})(SurveyNew)
