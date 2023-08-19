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
                <Basic id={4}/>
                <PostAdd id={4}/>
                <button className="center_b profile_follow" >Logout</button>
            </div>
        );
    }
}

export default Setting