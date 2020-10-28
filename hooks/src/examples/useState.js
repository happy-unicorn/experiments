import React, { useState } from 'react';

function computeInitialCounter() {
    console.log('Some calculations...');
    return Math.trunc(Math.random() * 20);
}

const App = () => {
    const [counter, setCounter] = useState(() => computeInitialCounter());

    const [state, setState] = useState({
        title: "Счетчик",
        date: Date.now()
    });

    const decrement = () => {
        setCounter(prevCounter => {
            return prevCounter - 1;
        });
    };
    const increment = () => {
        setCounter((prevCounter) => {
            return prevCounter + 1;
        });
    };

    return (
        <div>
            <h1>Счетчик {counter}</h1>
            <button className="btn btn-danger" onClick={decrement}>Убрать</button>
            <button className="btn btn-success" onClick={increment}>Добавить</button>
            <pre>
                {JSON.stringify(state)}
            </pre>
        </div>
    );
};

export default App;
