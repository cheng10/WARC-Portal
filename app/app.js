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
import Images from './pages/Images.jsx'
import NotFound from './pages/NotFound.jsx';
import DocumentList from './components/DocumentList.jsx'
import Collections from './pages/Collections.jsx';
import Content from './components/Content.jsx'


const sagaMiddleware = createSagaMiddleware();
let middleware = applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware);
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
    middleware = compose(middleware, window.devToolsExtension());
}
const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);
sagaMiddleware.run(sagas);


/**
 * Root of everything. Given to index.html to 
 * render our app
 */
ReactDOM.render (
    <Provider store={store}>
        <Router history={history}>
            <Route path ="/" component={App}>
                <IndexRedirect to="search" />
                <Route path="/" component={Content}>
                    <Route path="search" component={DocumentList} />
                    <Route path="images" component={Images} />
                </Route>
                <Route path="collections" component={Collections}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
