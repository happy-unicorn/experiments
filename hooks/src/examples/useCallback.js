import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const ItemsList = ({ getItems }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getItems());
        console.log('render');
    }, [getItems]);

    return(
        <ul>
            {items.map(i => <li key={i}>{i}</li>)}
        </ul>
    );
};

const App = () => {
    const [counter, setCounter] = useState(2);
    const [colored, setColored] = useState(false);

    const styles = useMemo(() => ({
        color: colored ? 'red' : 'gray'
    }), [colored]);

    const generateItemsFromAPI = useCallback(() => {
        return new Array(counter).fill('').map((_, index) => `Элемент ${index + 1}`)
    }, [counter]);

    const increment = () => {
        setCounter((prevCounter) => {
            return prevCounter + 1;
        });
    };

    return (
        <div>
            <h1 style={styles}>Счетчик {counter}</h1>
            <button className="btn btn-success" onClick={increment}>Добавить</button>
            <button className="btn btn-warning" onClick={() => setColored((prev) => !prev)}>F</button>

            <ItemsList getItems={generateItemsFromAPI}/>
        </div>
    );
};

export default App;
