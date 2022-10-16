import React from "react";

interface currentUser {
    apiKey: string;
    setApiKey: Function;
};

const defaultUser: currentUser = {
    apiKey: '',
    setApiKey: () => {}
};

const UserContext = React.createContext(defaultUser);

export { UserContext };