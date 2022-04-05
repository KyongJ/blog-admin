import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
interface Props {}

const Error: React.FC<Props> = props => {
    const history  = useHistory();
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={()=>{
                history.replace({pathname:'/'})
            }}>Back Home</Button>}
        />
    );
};

export default Error;
