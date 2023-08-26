import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
interface ProfileProps extends RouteComponentProps {}
class Profile extends React.Component<ProfileProps>{

    handleHomeButtonClick = () => {
        this.props.history.push('/');
    };
    render(){
        return(
            <div>
                <h1>Hello</h1>
                <button onClick={this.handleHomeButtonClick}>Go to Home</button>
            </div>
        )
    }
}

export default Profile