import React from "react";
import { RouteComponentProps } from 'react-router-dom';
interface Props extends RouteComponentProps {}
class SignIn extends React.Component<Props>{
    handleCreateClick = () => {
        this.props.history.push('/create');
        window.scrollTo(0, 0);
    };
    render() {
        return (
            <div className={'sing_in_wrapper'}>
                <div className={'sign_in'}>
                    <h1 className={'fancy'}>login</h1>
                    <h1 className={'butter'}>OXDgram</h1>
                    <div className="style-input">
                        <input type={'text'} placeholder={'username'}/>
                    </div>
                    <div className="style-input">
                        <input type={'password'} placeholder={'password'}/>
                    </div>
                    <button className={'profile_follow'}>login</button>
                    <h2>OR</h2>
                    <div className="container">
                        <h1 className={'multi_color'} onClick={this.handleCreateClick}>create account</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn