import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {submitSurvey} from '../../actions'
import fields from './formFields'

const SurveyFormReview = ({onCancel, form, submitSurvey, history}) =>{
    const renderFields = () =>
		fields.map(field => (

			<div key={field.name} style={{marginBottom: '1rem'}}>
                <label htmlFor="">{field.label}</label>
                <div>{form[field.name]}</div>
            </div>

		))
    return(
        <div>
            <h5>Please Confirm your entries</h5>
            <div style={{marginBottom: '2rem'}}>
                {renderFields()}
            </div>
            <button className={'yellow darken-3 btn-flat white-text left'} onClick={onCancel}>
                Back
            </button>
            <button onClick={() => submitSurvey(form, history)} className={'green btn-flat white-text right'} >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

const mapStateToProps = (state) => ({
	form: state.form.surveyForm
})

export default connect(mapStateToProps, {submitSurvey})(withRouter(SurveyFormReview))
