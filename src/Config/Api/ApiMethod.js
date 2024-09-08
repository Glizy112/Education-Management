import React, {useCallback, useState} from 'react';
import { navigate } from "../Functions/Functions";

export const ApiMethod = async (url, body) => {
  try {
    return await fetch(`${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: body,
    }).then(response => {
      //   console.log('DATA' + JSON.stringify(response));
      if (response.status == 401) {
        navigate(props.navigation, 'LogIn');
      } else {
        return response.json();
      }
    });
  } catch (err) {
    console.log('Error Reading data' + err);
    alert('SomeThing went wrong retry after sometime');
    return false;
  }
};
