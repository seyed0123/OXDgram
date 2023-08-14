import React from "react";
import Basic from "./basic";
import PostAdd from "./postAdd";

class Setting extends React.Component{
    render() {
        return (
            <div>
                <div className="center" id={'setting_text'}>
                    <h1>
                        Setting
                    </h1>
                </div>
                <Basic content={{username:'seyed0123',name:'seyed',email:'asdfkhg@gmail.com',boi:'this is a boi' , canComment:true , canFollow:false , canSearch:false}}/>
                <PostAdd/>
                <button className="center_b profile_follow" >Logout</button>
            </div>
        );
    }
}

export default Setting