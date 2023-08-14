import React from "react";

class SignIn extends React.Component{
    render() {
        return (
            <div className={'sing_in_wrapper'}>
                <div className={'sign_in'}>
                    <h1 className={'fancy'}>login</h1>
                    <h1 className={'butter'}>OXDgram</h1>
                    <input type={'text'} placeholder={'username'}/>
                    <input type={'password'} placeholder={'password'}/>
                    <button className={'profile_follow'}>login</button>
                    <h2>OR</h2>
                    <div className="container">
                        <h1 className={'multi_color'}>create account</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn