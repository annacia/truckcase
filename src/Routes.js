import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const Register = React.lazy(() => import('./pages/Register'));
const List = React.lazy(() => import('./pages/List'));

const Routes = () => (
    <Suspense fallback="Loading...">
        <Switch>
            <Route exact path='/' component={routerProps => <Home {...routerProps} />} />
            
            <Route exact path='/register' component={routerProps => <Register {...routerProps} />} />

            <Route exact path='/register/:driverId' component={routerProps => <Register {...routerProps} />} />
            
            <Route exact path='/list' component={routerProps => <List {...routerProps} />} />
        </Switch>
    </Suspense>
)

export default Routes;