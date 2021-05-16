const passport = require('passport')
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const User = mongoose.model('users')
passport.serializeUser((user, done) => {
	done(null, user.id)
})
passport.deserializeUser((user_id, done) => {
	User.findById(user_id).then(user => done(null, user))
})

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id })
			if (existingUser) {
				return done(null, existingUser)
			}
			const user = await new User({ googleId: profile.id }).save()
			done(null, user)
		}
	)
)
