import React, { useState, useEffect } from 'react';

import { Text, background } from '@chakra-ui/react';

import style from './Message.module.css';

function Message() {
  const textStyle = {
    fontSize: '6xl',
    color: 'blue',
    background: 'grey',
    ':hover': {
      color: 'black',
      background: 'blue',
      filter: 'blur'
    }
  };

  const [initialValue, setInitialValue] = useState('');

  useEffect(() => {
    console.log('Component mounted');

    fetch('/api/initial', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/text'
      }
    })
      .then((response) => {
        if (response.ok) {
          console.log('Response ok!');
          // Return the result of response.text()
          return response.text(); // Expecting a text response
        } else {
          console.error('Server error:', response.status, response.statusText);
          throw new Error('Server error');
        }
      })
      .then((data) => {
        // Set the initial value after resolving the promise
        setInitialValue(data);
        console.log('Data: ', data);
      })
      .catch((error) => {
        console.error('Error: ' + error);
      });
  }, []);

  return (
    /**
     <Text className={style.text} fontSize="6xl">
      {initialValue}
    </Text>
     */
    <Text sx={textStyle}>{initialValue}</Text>
  );
}

export default Message;
