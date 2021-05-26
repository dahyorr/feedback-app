import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { saveForm } from '../../actions'
import fields from  './formFields'

class SurveyForm extends React.Component {
	renderFields = () =>
		fields.map(field => (
			<div key={field.name}>
				<label htmlFor={field.name}>{field.label}</label>
				<Field name={field.name} type="text" />
				<div className="red-text" style={{ marginBottom: '1rem' }}>
					<ErrorMessage name={field.name} />
				</div>
			</div>
		))

	render() {
		const {title, subject, body, recipients} = this.props.form 
		return (
			<Formik
				initialValues={{ 
					title: title || '', 
					subject: subject || '', 
					body: body || '', 
					recipients: recipients || ''
				}}
				onSubmit={values => {
					this.props.saveForm('surveyForm' ,values)
					this.props.onSurveySubmit()
				}}
				validationSchema={Yup.object({
					title: Yup.string().required('You must provide a Title'),
					subject: Yup.string().required(
						'You must provide a Subject'
					),
					body: Yup.string().required('You must provide a Body'),
					recipients: Yup.array()
						.transform((value, originalValue) => {
							if (Yup.array().isType(value) && value !== null)
								return value
							return originalValue
								? originalValue.split(/[\s,]+/)
								: []
						})
						.of(
							Yup.string().email(
								({ value }) => `"${value}" is not a valid email`
							)
						).required('You must provide at least one Email'),
				})}
			>
				<Form>
					{this.renderFields()}
					<Link
						to="/surveys"
						className="red btn-flat left white-text"

					>
						Cancel
					</Link>
					<button
						className="teal btn-flat right white-text"
						type="submit"
					>
						Next <i className="material-icons right">done</i>
					</button>
				</Form>
			</Formik>
		)
	}
}

const mapStateToProps = (state) => ({
	form: state.form.surveyForm
})

export default connect(mapStateToProps, { saveForm })(SurveyForm)
