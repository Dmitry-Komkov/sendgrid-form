const client = require("@sendgrid/mail")

function sendEmail(client, message, senderEmail, senderName, sendTo) {
    return new Promise((fulfill, reject) => {
        const data = {
            from: {
                email: senderEmail,
                name: senderName
            },
            subject: 'Заявка с сайта',
            text: 'and easy to do anywhere, even with Node.js',
            to: sendTo,
            html: `${message}`
        }

        client
            .send(data)
            .then(([response, body]) => {
                fulfill(response)
            })
            .catch(error => reject(error))
    })
}

exports.handler = function(event, context, callback) {
    const {
        SENDGRID_API_KEY,
        SENDGRID_SENDER_EMAIL,
        SENDGRID_SENDER_NAME,
        SENDGRID_TO_EMAIL
    } = process.env

    const body = JSON.parse(event.body)
    const message = body.message

    client.setApiKey(SENDGRID_API_KEY)

    sendEmail(
        client,
        message,
        SENDGRID_SENDER_EMAIL,
        SENDGRID_SENDER_NAME,
        SENDGRID_TO_EMAIL
    )
    .then(response => callback(null, { statusCode: response.statusCode }))
    .catch(err => callback(err, null))
}