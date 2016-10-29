import React from 'react';

import DocumentList from '../components/DocumentList.jsx';

export default class Home extends React.Component
{
    render()
    {
        return(
            <div className="page-home">
                <DocumentList />
            </div>
        );
    }
}
