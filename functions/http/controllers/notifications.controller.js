const functions = require('firebase-functions');
const lodash = require('lodash');
const twilio = require('twilio');
const Joi = require('@hapi/joi');

const functionsConfig = functions.config();

const accountSid = lodash.get(functionsConfig, 'twilio.accountsid') || process.env.TWILIO_ACCOUNT_SID; 
const authToken = lodash.get(functionsConfig, 'twilio.authtoken') || process.env.TWILIO_AUTH_TOKEN;
const FROM = lodash.get(functionsConfig, 'twilio.fromphonenumber') || process.env.TWILIO_FROM_PHONE_NUMBER;

const twilioClient = twilio(accountSid, authToken); 

const TYPES = {
    WHATSAPP: 'whatsapp',
    SMS: 'sms'
}

module.exports = async (req, res, next) => {
    const params = req.body;
    const type = TYPES.SMS;

    const {error} = paramsSchema.validate(params);

    if(error) return next({code: 'VALIDATION_ERROR', error});

    let to = '+34';
    if(type === TYPES.SMS) {
        to = '+34' + params.to;
    } else if(type === TYPES.WHATSAPP) {
        to = `whatsapp:+34${params.to}`
    }

    try {
        await twilioClient.messages.create({
            body: params.text,
            to,
            from: FROM
        });
    } catch(e) {
        return next({code: 'TWILIO_ERROR', error: e});
    }

    return res.status(204).end();
}

const paramsSchema = Joi.object({
    to: Joi.string().required(),
    text: Joi.string().required()
});
