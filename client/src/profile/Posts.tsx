import React from "react";
interface post{
    content:{
        img:string,
        text:string,
    }
}
class Posts extends React.Component{
    render() {
        return (
            <div className={'profile_post_wrapper'}>
                <Post content={{img:require('./img1.jpg'),text:'this is a post'}}/>
                <Post content={{img:require('./img1.jpg'),text:'this is a post'}}/>
                <Post content={{img:require('./img1.jpg'),text:'this is a post'}}/>
                <Post content={{img:require('./img1.jpg'),text:'this is a post'}}/>
            </div>
        );
    }
}

class Post extends React.Component<post>
{
    render() {
        return (
            <div className={'profile_post_container'}>
                <img src={this.props.content.img} className={'profile_post_img'} width={'30%'}/>
                <p className={'profile_post_text'}>{this.props.content.text}</p>
            </div>
        );
    }
}
export default Posts