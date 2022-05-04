import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home'
import CheckoutGooglePay from './googlepay'
import ErrorPage from './result/errorPage'
import SuccessPage from './result/successPage'
import ReceivedPage from './result/receivedPage'
import RefusedPage from './result/refusedPage'

function App() {

    return (
        <Router>
            <Switch>
                <Route path='/' exact={true} component={Home}/>
                <Route path='/googlepay/:order' component={CheckoutGooglePay}/>
                <Route path='/result/error' exact={true} component={ErrorPage}/>
                <Route path='/result/success' exact={true} component={SuccessPage}/>
                <Route path='/result/received' exact={true} component={ReceivedPage}/>
                <Route path='/result/refused' exact={true} component={RefusedPage}/>
            </Switch>
        </Router>
  );
}

export default App;
