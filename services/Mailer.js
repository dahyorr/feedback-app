const keys = require('../config/keys')
// const sendgridMailer = require('@sendgrid/mail')
const sendgrid = require('sendgrid')
const helper = sendgrid.mail

class Mailer extends helper.Mail {
	constructor({ subject, recipients }, content) {
		super()
        this.sgApi = sendgrid(keys.sendGridKey)
		this.from_email = new helper.Email('dahyor@outlook.com')
		this.subject = subject
		this.body = new helper.Content('text/html', content)
		this.recipients = this.formatAddresses(recipients)
        this.addContent(this.body)
        this.addClickTracking()
        this.addRecipients()
	}

	formatAddresses(recipients) {
		return recipients.map(({ email }) => new helper.Email(email))
	}

    addClickTracking(){
        const trackingSettings =  new helper.TrackingSettings()
        const ClickTracking =  new helper.ClickTracking(true, true)
        trackingSettings.setClickTracking(ClickTracking)
        this.addTrackingSettings(trackingSettings)
    }

    addRecipients(){
        const personalize = new helper.Personalization()
        this.recipients.forEach(recipient =>{
            personalize.addTo(recipient);
        })
        this.addPersonalization(personalize)
    }

    async send(){
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        })
        const response = await this.sgApi.API(request)
        return response
    }

}
module.exports = Mailer
