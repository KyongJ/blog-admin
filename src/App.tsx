import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './pages/login';
import MyLayout from './component/Layout';
import FancyRoute from './route/fancyRoute';

function App() {
    return (
        <div className="App" style={{height:'100%'}}>
            <Router>
                <Switch>
                    <FancyRoute exact path="/login" component={Login}></FancyRoute>
                    <FancyRoute
                        path="/"
                        key="layout"
                        render={(props: any) => <MyLayout {...props} />}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
