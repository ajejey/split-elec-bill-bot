'use client';

import { useState } from 'react';

export default function HomePage() {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [response, setResponse] = useState(null);

    const sendEmail = async (event) => {
        event.preventDefault();
        setResponse(null);

        const res = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ to, subject, text })
        });

        const data = await res.json();
        setResponse(data);
    };

    return (
        <div>
            <h1>Send Email</h1>
            <form className="send-email-form" onSubmit={sendEmail}>
                <div className="form-group">
                    <label>To:</label>
                    <input
                        className='form-input'
                        type="email"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Subject:</label>
                    <input
                        className='form-input'
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Message:</label>
                    <textarea
                        className='form-input'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                </div>
                <button className="send-email-button" type="submit">Send Email</button>
            </form>
            {response && <div className="response">{response.error ? `Error: ${response.error}` : `Success: ${response.success}`}</div>}
        </div>
    );
}
