import { useState } from 'react';

const useFormField = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  function onChange(e) {
    setValue(e.target.value);
  };
  function reset(){
    setValue("")
  }  
  

  return { value, onChange, reset };
};

export default useFormField;
