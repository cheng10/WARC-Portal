import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';

export class UserListElement extends React.Component
{
    constructor(props)
    {
        super(props);

        // bind <this> to the event method
        this.modalDeleteShow = this.modalDeleteShow.bind(this);
    }

    static get propTypes()
    {
        return {
            id: React.PropTypes.number.isRequired,
        };
    }

    render()
    {
        // get the user element data
        let user;
        for (const val of this.props.users) {
            if (val.id === Number(this.props.id)) {
                user = val;
                break;
            }
        }

        // render
        return (
            <tr>
                <td>#{user.id}</td>
                <td>{user.username}</td>
                <td>{user.drink}</td>
                <td>
                    <Button bsSize="xsmall" className="user-delete" data-id={user.id} data-username={user.username}
                        onClick={this.modalDeleteShow}>
                        Delete <Glyphicon glyph="remove-circle"/>
                    </Button>
                </td>
            </tr>
        );
    }

    modalDeleteShow(event)
    {
        const user_id = Number(event.target.dataset.id);
        const username = event.target.dataset.username;
        this.props.dispatch({
            type: 'users.modalDeleteShow',
            id: user_id,
            username: username,
        });
    }
}

// export the connected class
function mapStateToProps(state, own_props) {
    return {
        users: state.users.list || [],
        id: own_props.id,
    }
}
export default connect(mapStateToProps)(UserListElement);
