const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '580901955209-d09qf9thmab1epi7069qi3dj6b5g1vlr.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//046NeSXEdgj6oCgYIARAAGAQSNwF-L9IrvNlByHvTWe9QlpRstgMuosjAwG1ECc8Ddf9eiWCDqnstEFHgb8wAdr2An1uLVImwTgo'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

async function sendMail({ value }) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'trithuc23232@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            }
        })
        // const mailOption = {
        //     from: 'flanerapplication <trithuc23232@gmail.com>',
        //     to: '19522321@gm.uit.edu.vn',
        //     subject: "hello",
        //     text: 'thuc ne',
        //     html: '<h1>thuc ne html</h1>'
        // }
        const mailOption = {
            from: 'Flaner Application <trithuc23232@gmail.com>',
            to: value.to,
            subject: value.subject,
            text: value.text,
            html: value.html
        }
        const result = await transport.sendMail(mailOption)
        return result
    }
    catch (error) {
        return error
    }
}
const value = {
    from: 'flanerapplication <trithuc23232@gmail.com>',
    to: '19522321@gm.uit.edu.vn',
    subject: "hello",
    text: 'thuc ne',
    html: '<h1>thuc ne html</h1>'
}
sendMail({ value })
    .then((result) => console.log('Email send...', result))
    .catch((error) => console.log(error.message))