import React from 'react';

import Menu from './Menu.jsx';

export default class App extends React.Component
{
    render()
    {
        return (
            <div className="container">
                <div className="row">
                    <Menu/>
                </div>
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
