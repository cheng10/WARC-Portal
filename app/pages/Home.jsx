import React from 'react';

import UserList from '../components/UserList.jsx';

export default class Home extends React.Component
{
    render()
    {
        return(
            <div className="page-home">
                <UserList/>
            </div>
        );
    }
}
