import nodemailer from 'nodemailer';

export async function POST(request) {
    const { phoneNumber, carrier, message } = await request.json();

    // Define the carrier SMS gateway (you may need to add more carriers)
    const carrierGateways = {
        'att': 'txt.att.net',
        'tmobile': 'tmomail.net',
        'verizon': 'vtext.com'
    };

    if (!carrierGateways[carrier]) {
        return new Response(JSON.stringify({ error: 'Unsupported carrier' }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: `${phoneNumber}@${carrierGateways[carrier]}`,
        subject: '',
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ success: 'SMS sent successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
