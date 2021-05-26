const { Path } = require('path-parser')
const { URL } = require('url')
const _ = require('lodash')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Survey = mongoose.model('surveys')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplates')

module.exports = app => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false,
		})
		res.send(surveys)
	})

	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:surveyId/:choice')
		const events = req.body
			.map(({ url, email }) => {
				const match = p.test(new URL(url).pathname)
				if (match) return { email, ...match }
			})
			.filter(event => event)
		_.uniqBy(events, 'email', 'surveyId').forEach(
			({ email, choice, surveyId }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email, responded: false },
						},
					},
					{
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date(),
					}
				).exec()
			}
		)
		res.send({})
	})

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, body, subject, recipients } = req.body
		const survey = new Survey({
			title,
			body,
			subject,
			recipients: recipients
				.split(/[\s,]+/)
				.map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now(),
		})

		const mailer = new Mailer(survey, surveyTemplate(survey))
		try {
			await mailer.send()
			await survey.save()
			req.user.credits -= 1
			const user = await req.user.save()
			res.send(user)
		} catch (err) {
			res.status(422).send(err)
		}
	})

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for your feedback!')
	})
}
