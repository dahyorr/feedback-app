import React from 'react'
import {connect} from 'react-redux'
import {fetchSurveys} from '../../actions'

class SurveyList extends React.Component {
    componentDidMount(){
        this.props.fetchSurveys()
    }
    renderSurveys(){
        return this.props.surveys.reverse().map(survey =>(
            <div className="card grey darken-1" key={survey._id}>
                <div className="card-content">
                    <span className="card-title">{survey.title}</span>
                    <p>{survey.body}</p>
                    <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
                </div>
                <div className="card-action">
                    <a href="#">yes: {survey.yes}</a>
                    <a href="#">no: {survey.no}</a>
                </div>
            </div>
        ))
    }
    render() {
        return(
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}

const mapStateToProps = ({surveys}) =>({surveys})

export default connect(mapStateToProps, {fetchSurveys})(SurveyList)