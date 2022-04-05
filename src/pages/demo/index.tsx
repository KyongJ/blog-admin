import React, { FC, useState } from 'react';

const Demo: FC = () => {
    const [count, setCount] = useState<number>(0);
    // const [name, setName] = useState<string>('');
    console.log('count', count);
    // console.log('name', name);
    const handleClickAsync = () => {
        console.log('异步执行');
        setTimeout(() => {
            setCount(count => count + 1);
            console.log(count);
        },1000);
    };
    return (
        <div>
            {console.log('render')}
            <div>count:{count}</div>
            <button onClick={handleClickAsync}>Increase async</button>
            {/* <button onClick={handleClickSync}>Increase sync</button> */}
        </div>
    );
};

export default Demo;
