import React, { useState, useEffect, useRef } from 'react';

const App = () => {
    // const [renderCounter, setRenderCounter] = useState(1);
    const [value, setValue] = useState('hahaha');
    const renderCounter = useRef(1);
    const inputRef = useRef(null);

    useEffect(() => {
        renderCounter.current++;
        console.log(inputRef.current.value);
    });

    const focus = () => inputRef.current.focus();

    return (
        <div>
            <h1>{renderCounter.current}</h1>
            <input
                ref={inputRef}
                type="text"
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />
            <button className="btn btn-success" onClick={focus}>Focus</button>
        </div>
    );
};

export default App;
