const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '580901955209-d09qf9thmab1epi7069qi3dj6b5g1vlr.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04y-mdiErXfRnCgYIARAAGAQSNwF-L9IrKEMPw9X621y0kJFNmshEsmQPdl32DqT2p-IkLzNDK5YvWkwDmNDO6tKCumf5K4f8NrE'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

module.exports = async function sendMail({ value }) {
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
        console.log(result)
        return result

    }
    catch (error) {
        return error
    }
}

//module.exports = sendMail()
//     .then((result) => console.log('Email send...', result))
//     .catch((error) => console.log(error.message))