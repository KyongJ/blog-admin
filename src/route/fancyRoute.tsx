import * as React from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { Route } from 'react-router-dom';

const FancyRoute = (props: any) => {
    React.useState(nprogress.start());
    React.useEffect(() => {
        nprogress.done();
        return () => nprogress.start();
    });
    return <Route {...props} />;
};

export default FancyRoute