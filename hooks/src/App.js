import React, { useState, useEffect } from 'react';

function useLogger(value) {
    useEffect(() => {
        console.log('Value changed: ', value);
    }, [value])
}

function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const onChange = event => {
        setValue(event.target.value);
    };
    return {
        value,
        onChange
    }
}

const App = () => {
    const { value: name, onChange } = useInput('');
    useLogger(name);

    return (
        <div className={'container pt-3'}>
            <h1>{name}</h1>
            <input type="text" value={name} onChange={onChange} />
        </div>
    );
};

export default App;
