import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import './stylesheets/main.scss';
import { reducers } from './reducers/index';
import { sagas } from './sagas/index';
import App from './components/App.jsx';
import Home from './pages/Home.jsx';
import Images from './pages/Images.jsx'
import NotFound from './pages/NotFound.jsx';
import DocumentList from './components/DocumentList.jsx'


// create the store
const sagaMiddleware = createSagaMiddleware();
let middleware = applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware);
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
    middleware = compose(middleware, window.devToolsExtension());
}
const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);
sagaMiddleware.run(sagas);


// render the main component
ReactDOM.render (
    <Provider store={store}>
        <Router history={history}>
            <Route path ="/" component={App}>
                <IndexRedirect to="search" />
                <Route path="search" component={DocumentList} />
                <Route path="images" component={Images} />
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
