import React from "react";
import { RouteComponentProps } from 'react-router-dom';
interface Props extends RouteComponentProps {}
class Create extends React.Component<Props>{
    handleLoginClick = () => {
        this.props.history.push('/login');
        window.scrollTo(0, 0);
    };
    render() {
        return (
            <div className={'sing_in_wrapper create_wrapper'}>
                <div className={'sign_in'}>
                    <h1 className={'fancy'}>Create</h1>
                    <input className={'input'} type={'text'} placeholder={'username'}/>
                    <input className={'input'} type={'password'} placeholder={'password'}/>
                    <input className={'input'} type={'password'} placeholder={'confirm password'}/>
                    <input className={'input'} type={'email'} placeholder={'email'}/>
                    <button className={'profile_follow'}>Create</button>
                    <h2>OR</h2>
                    <div className="container">
                        <h1 className={'multi_color'} onClick={this.handleLoginClick}>Login</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create