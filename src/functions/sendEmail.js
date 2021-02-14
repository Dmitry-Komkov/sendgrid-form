const sgMail = require('@sendgrid/mail')
const {
    SENDGRID_API_KEY,
    SENDGRID_SENDER_EMAIL,
    SENDGRID_SENDER_NAME,
    SENDGRID_TO_EMAIL
} = process.env

exports.handler =  async (event, context, callback) => {

    const payload = JSON.parse(event.body)

    sgMail.setApiKey(SENDGRID_API_KEY)

    // const body = Object.keys(payload).map((k) => {
    //     return `${k}: ${payload[k]}`
    // }).join("<br><br>");

    const attachment = payload[file]

    console.log(attachment)

    const body = `
        Имя: ${payload[name]} <br>
        Телефон: ${payload[email]} <br>
        Инфо: ${payload[info]} <br>
    `

    console.log(body)

    const msg = {
        to: SENDGRID_TO_EMAIL,
        from: {
            email: SENDGRID_SENDER_EMAIL,
            name: SENDGRID_SENDER_NAME
        },
        subject: 'Новая заявка с сайта fasad-stroi.com',
        html: body,
        attachment: {
            content: attachment,
            // filename: "чек.jpg",
            // type: "image/jpeg",
            // disposition: "attachment"
        }
    };

    try{
        await sgMail.send(msg)
        
        return {
            statusCode: 200,
            body: "Message sent"
        }
    } catch(e){
        const statusCode = typeof e.code === 'number' ? e.code : 500;
        return {
            statusCode,
            body: e.message
        }
    }
};