import React from "react";
interface post{
    img:string,
    text:string,
}
interface posts{
    content:{
        posts:post[]
    }
}
class Posts extends React.Component<posts>{
    render() {
        let jxs = this.props.content.posts.map((element) =>{
            return <Post img={element.img} text={element.text}/>
        });
        return (
            <div className={'profile_post_wrapper'}>
                {jxs}
            </div>
        );
    }
}

class Post extends React.Component<post>
{
    render() {
        return (
            <div className={'profile_post_container'}>
                <img src={this.props.img} className={'profile_post_img'} width={'30%'}/>
                <p className={'profile_post_text'}>{this.props.text}</p>
            </div>
        );
    }
}
export default Posts