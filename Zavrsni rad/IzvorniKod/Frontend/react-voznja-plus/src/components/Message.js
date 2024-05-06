import React, { useState, useEffect } from 'react';

function Message() {
    const [initialValue, setInitialValue] = useState('');

    useEffect(() => {
        console.log('Component mounted');

        fetch('/api/initial', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/text',
            }
        })
        .then(response => {
            if (response.ok) {
                console.log("Response ok!");
                console.log("Response: ", response.text())
                return response.text(); // Expecting a text response
            } else {
                console.error('Server error:', response.status, response.statusText);
                throw new Error('Server error');
            }
        })
        .then(data => {
            setInitialValue(data); // Set the received text as initialValue
            console.log('Data: ', data);
        })
        .catch(error => {
            console.error('Error: ' + error);
        });
    }, []);

    return <h1>{initialValue}Hello World!</h1>;
}

export default Message;
