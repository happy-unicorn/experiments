import React, { useState, useEffect, useRef, useMemo } from 'react';

function complexCompute(num) {
    let i = 0;
    console.log('compute...');
    while (i < 100000000) i++;
    console.log(i);
    return num * 2;
}

const App = () => {
    const [counter, setCounter] = useState(() => 42);
    const [colored, setColored] = useState(false);

    const computed = useMemo(() => complexCompute(counter), [counter]);

    const styles = useMemo(() => ({
        color: colored ? 'red' : 'gray'
    }), [colored]);

    useEffect(() => {
        console.log('styles chanded');
    }, [styles]);

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
            <h1 style={styles}>Счетчик {computed}</h1>
            <button className="btn btn-danger" onClick={decrement}>Убрать</button>
            <button className="btn btn-success" onClick={increment}>Добавить</button>
            <button className="btn btn-warning" onClick={() => setColored((prev) => !prev)}>F</button>
        </div>
    );
};

export default App;
