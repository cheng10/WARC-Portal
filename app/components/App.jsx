import React from 'react';

import Menu from './Menu.jsx';

export default class App extends React.Component
{
    render() {
        return (
            <div className="app-container">
                <div className="row">
                    <Menu/>
                </div>
                <div className="app-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
