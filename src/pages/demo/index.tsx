import React, { FC, useState } from 'react';
import {CSVLink} from '@/common/react-csv';

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
        }, 1000);
    };

    const headers = [
        { label: 'First Name', key: 'firstname' },
        { label: 'Last Name', key: 'lastname' },
        { label: 'Email', key: 'email' },
    ];
    const data = [
        { firstname: 'Ahmed', lastname: '"Tomi","Kyong"', email: 'ah@smthing.co.com' },
        { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
        { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
    ];
    return (
        <div>
            {console.log('render')}
            <div>count:{count}</div>
            <button onClick={handleClickAsync}>Increase async</button>
            {/* <button onClick={handleClickSync}>Increase sync</button> */}
            <CSVLink data={data} headers={headers} filename={'demo.csv'}>
                Download me
            </CSVLink>
            ;
        </div>
    );
};

export default Demo;
