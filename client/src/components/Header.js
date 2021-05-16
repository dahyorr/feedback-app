import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

class Header extends React.Component {
	renderLogin = () => {
		switch (this.props.auth) {
			case null:
				return null
			case false:
				return (
					<li>
						<a href="/auth/google">Log in with Google</a>
					</li>
				)
			default:
				return <>
					<li style={{padding: '0 0.8rem'}}>
						Credits: {this.props.auth.credits}
					</li>
					<li>
						<Payments/>
					</li>
					<li>
						<a href="/api/logout">Logout</a>
					</li>
				</>
		}
	}
	render() {
		return (
			<div className="Header">
				<nav>
					<div className="nav-wrapper container">
						<Link to={this.props.auth?'/surveys':'/'} className="brand-logo">
							Feedback App
						</Link>
						<ul
							id="nav-mobile"
							className="right hide-on-med-and-down"
						>
							{this.renderLogin()}
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

const mapStateToProps = ({ auth }) => ({
	auth,
})

export default connect(mapStateToProps)(Header)
