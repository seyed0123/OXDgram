import React from "react";
interface info{
    content:{
        username:string;
        name:string;
        email:string;
        boi:string;
        canSearch:boolean;
        canComment:boolean;
        canFollow:boolean;
    }
}
class Basic extends React.Component<info>{
    state={
        content:this.props.content
    }
    render() {
        return (
            <div className={'setting_form_container_a'}>
                <div className="center">
                    <h3>
                        Basics
                    </h3>
                </div>
                <div className={'setting_form_container'}>
                    <div className='setting_form_content'>
                        <p className='setting_text'>Username: {this.state.content.username}</p>
                        <input className='setting_input' type='text' value={this.state.content.username}/>
                    </div>
                    <div className='setting_form_content'>
                        <p className='setting_text'>Name: {this.state.content.name}</p>
                        <input className='setting_input' type='text' value={this.state.content.name}/>
                    </div>
                    <div className='setting_form_content'>
                        <p className='setting_text'>Email: {this.state.content.email}</p>
                        <input className='setting_input' type='email' value={this.state.content.email}/>
                    </div>
                    <div className='setting_form_content'>
                        <p className='setting_text'>Can Comment:</p>
                        <input className='setting_input' type='checkbox' defaultChecked={this.state.content.canComment}/>
                    </div>
                    <div className='setting_form_content'>
                        <p className='setting_text'>Can Follow: </p>
                        <input className='setting_input' type='checkbox' defaultChecked={this.state.content.canFollow}/>
                    </div>
                    <div className='setting_form_content'>
                        <p className='setting_text'>Can Search: </p>
                        <input className='setting_input' type='checkbox' defaultChecked={this.state.content.canSearch}/>
                    </div>
                </div>
                <button className="center_b profile_follow" >submit</button>
            </div>
        );
    }
}

export default Basic