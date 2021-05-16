import React from 'react'
import { connect } from 'react-redux'
import {handleToken} from '../actions'
import StripeCheckout from 'react-stripe-checkout';

class Payments extends React.Component {
    render() {
        return (
            <StripeCheckout
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                name={'Feedback App'}
                description={'$5 for 5 credits'}
            ><button className="btn">Add Credits</button></StripeCheckout>
        )
    }
}
export default connect(null, {handleToken})(Payments)