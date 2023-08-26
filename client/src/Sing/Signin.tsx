import React from "react";
import { RouteComponentProps } from 'react-router-dom';
import axios from "axios";
interface SignInProps extends RouteComponentProps {

}
class SignIn extends React.Component<SignInProps>{
    state = {
        username: '',
        password: '',
    };
    constructor(props:any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event:any) {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(event:any) {
        event.preventDefault();

        axios.post('http://localhost:8000/person/login', this.state)
            .then(response => {
                console.log(response)
                if (response.data.message !== undefined)
                    alert(response.data.message)
                else
                    localStorage.setItem('token', response.data.token);
                    window.location.reload()
            })
            .catch(error => {
                console.error(error);
            });
    }

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
                        <input type={'text'} placeholder={'username'} name={'username'} onChange={this.handleChange}/>
                    </div>
                    <div className="style-input">
                        <input type={'password'} placeholder={'password'} name={'password'} onChange={this.handleChange}/>
                    </div>
                    <button className={'profile_follow'} onClick={this.handleSubmit}>login</button>
                    <h2>OR</h2>
                    <div className="text_container">
                        <p className={'multi_color'} onClick={this.handleCreateClick}>Sign_up</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn