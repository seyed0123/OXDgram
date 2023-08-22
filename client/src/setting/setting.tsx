import React from "react";
import Basic from "./basic";
import PostAdd from "./postAdd";
import axios from "axios";
import {RouteComponentProps} from "react-router-dom";
interface Props extends RouteComponentProps {
    id:number
}
class Setting extends React.Component<Props>{
    logout(){
        let url :string= 'http://localhost:8000/person/logout/'
        axios.post(url)
    }
    render() {
        return (
            <div>
                <div className="center" id={'setting_text'}>
                    <h1>
                        Setting
                    </h1>
                </div>
                <Basic id={this.props.id}/>
                <PostAdd id={this.props.id}/>
                <button className="center_b profile_follow" onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

export default Setting