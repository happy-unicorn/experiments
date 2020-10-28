import React, { useState, useEffect } from 'react';

const App = () => {
    const [type, setType] = useState('users');
    const [data, setData] = useState([]);
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });

    useEffect(() => {
        console.log('render');
    });
    useEffect(() => {
        console.log('only on types');
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(response => response.json())
            .then(json => setData(json));
    }, [type]);

    const mouseMoveHandler =  event => {
        setPosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    useEffect(() => {
        console.log('Component did mount');
        window.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            console.log('Component will unmount');
            window.removeEventListener('mousemove', mouseMoveHandler);
        }
    }, []);

    return (
        <div>
            <h1>
                Type: {type}
            </h1>
            <button onClick={() => setType('users')}>Users</button>
            <button onClick={() => setType('todos')}>TODO</button>
            <button onClick={() => setType('posts')}>Posts</button>
            {/*<pre>*/}
            {/*    {JSON.stringify(data, null, 2)}*/}
            {/*</pre>*/}
            <pre>
                {JSON.stringify(position, null, 2)}
            </pre>
        </div>
    );
};

export default App;
