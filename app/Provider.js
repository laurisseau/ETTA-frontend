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
      setValue(userCookie);
    } else if (educatorCookie) {
      setValue(educatorCookie);
    }

  }, [value, setValue]);

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
