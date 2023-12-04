'use client';
import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const Context = createContext();

export function Provider(props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const userCookie = Cookies.get('user');
    const educatorCookie = Cookies.get('educator');

    if (userCookie) {
      setValue(JSON.parse(userCookie));
    } else if (educatorCookie) {
      setValue(JSON.parse(educatorCookie));
    }
  }, []);

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
