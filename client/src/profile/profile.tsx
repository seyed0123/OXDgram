import React from "react";
import Header from "./header";
import Posts from "./Posts";
class Profile extends React.Component{
    render() {
        return (
            <div >
                <Header content={{prof:require('./img1.jpg'),banner:require('./back.jpg') , bio:'this is a bio' ,username:'username',follow:0,following:0,posts:0,isFollow:true}}/>
                <Posts content={{posts:[{img:require('./img1.jpg'),text:'This is a post'},{img:require('./img1.jpg'),text:'This is a post'}]}}/>
            </div>
        );
    }
}

export default Profile