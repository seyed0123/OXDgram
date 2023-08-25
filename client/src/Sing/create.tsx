import React from "react";
import { RouteComponentProps } from 'react-router-dom';
import axios from "axios";
interface Props extends RouteComponentProps {}
class Create extends React.Component<Props>{
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
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

        if (this.state.password !== this.state.confirmPassword) {
            alert('Password and confirm password do not match');
            return;
        }
        console.log(this.state)
        axios.post('http://localhost:8000/person/create/', this.state)
            .then(response => {
                console.log(response.data);
                alert(response.data.message)
                if(response.data.message==='Data saved successfully'){
                    this.handleLoginClick();
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    handleLoginClick = () => {
        this.props.history.push('/login');
        window.scrollTo(0, 0);
    };
    render() {
        return (
            <div className={'sing_in_wrapper create_wrapper'}>
                <h1 className={'butter'}>OXDgram</h1>
                <div className={'sign_in create'}>
                    <h1 className={'fancy'}>Create</h1>
                    <form onSubmit={this.handleSubmit} className={'sign_in'}>
                        <input className={'input'} type={'text'} name="username" placeholder={'username'} onChange={this.handleChange} />
                        <input className={'input'} type={'password'} name="password" placeholder={'password'} onChange={this.handleChange} />
                        <input className={'input'} type={'password'} name="confirmPassword" placeholder={'confirm password'} onChange={this.handleChange} />
                        <input className={'input'} type={'email'} name="email" placeholder={'email'} onChange={this.handleChange} />
                        <button type="submit" className={'profile_follow'}>Submit</button>
                    </form>

                    <h2>OR</h2>
                    <div className="text_container">
                        <h1 className={'multi_color'} onClick={this.handleLoginClick}>Login</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create