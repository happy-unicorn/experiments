import React, {useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer} from 'react';

const AlertContext = React.createContext();
// const AlertToggleContext = React.createContext();
const useAlert = () => {
    return useContext(AlertContext);
};
// const useAlertToggle = () => {
//     return useContext(AlertToggleContext);
// };

const reducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return {
                ...state,
                alert: true
            };
        case 'HIDE':
            return {
                ...state,
                alert: false
            };
        default:
            return { ...state }
    }
};

const AlertProvider = ({ children }) => {
    // const [alert, setAlert] = useState(false);
    // const toggle = () => setAlert((prev) => !prev);
    const [state, dispatch] = useReducer(reducer, {
        alert: false
    });

    const show = () => dispatch({
        type: 'SHOW'
    });
    const hide = () => dispatch({
        type: 'HIDE'
    });

    return (
        <AlertContext.Provider value={{
            alert: state.alert,
            show,
            hide
        }}>
            {/*<AlertToggleContext.Provider value={toggle}>*/}
                {children}
            {/*</AlertToggleContext.Provider>*/}
        </AlertContext.Provider>
    );
};

const Main = () => {
    const { show } = useAlert();
    return(
        <>
            <h1>Привет в примере с Context</h1>
            <button className="btn btn-success" onClick={show}>Alert</button>
        </>
    )
};
const Alert = () => {
    const { alert, hide } = useAlert();

    if (!alert) return null;

    return (
        <div className={'alert alert-danger'} onClick={hide}>
            Это очень важно
        </div>
    );
};

const App = () => {
    return (
        <AlertProvider value={alert}>
            <div className={'container pt-3'}>
                <Alert/>
                <Main/>
            </div>
        </AlertProvider>
    );
};

export default App;
