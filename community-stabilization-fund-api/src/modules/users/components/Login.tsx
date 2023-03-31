import { Button, TextInput } from "carbon-components-react";
import React, { useRef, useState } from "react";

interface LoginProps {
    handleLogin: (apiKey: string) => void;
}

const Login = ({handleLogin}: LoginProps) => {
  const [warn, setWarn] = useState(false);
  const apiKeyRef = useRef('');
  
  const changeWarn = (e: React.ChangeEvent<HTMLInputElement>) => {
    apiKeyRef.current = e.target.value;
    const shouldWarn = !apiKeyRef.current.includes(':');
  
    if(shouldWarn !== warn) {
      setWarn(shouldWarn);
    }
  };

  const handleClick = (_: any) => {
    if(warn) return;
    handleLogin(apiKeyRef.current);
  };

  return (
    <div
      style={{
        width: 300,
        margin: '300px auto',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <TextInput
        className="login-input"
        helperText="Helper text"
        id="login-input-1"
        invalidText="Invalid api key. Try again."
        labelText="Enter your api key: (i.e. user:key)"
        onChange={changeWarn}
        size="lg"
        type="text"
        warnText="Must include a colon."
        warn={warn}
      />
      <Button onClick={handleClick}/>
    </div>
  );
};

export { Login };