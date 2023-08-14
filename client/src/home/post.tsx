import React from "react";
interface PostInter{
    content:{
        imgOwner:string,
        img:string,
        owner:string,
        text:string,
        comments:string[],
    }
}
class Posts extends React.Component{
    render() {
        return (
            <div className="left-grid" id='left_grid'>
                <Post content={{imgOwner:require('./img1.jpg'),img:require('./img1.jpg'),owner:'seyed',text:'this is a post',comments:['good','bad']}}/>
                <Post content={{imgOwner:require('./img1.jpg'),img:require('./img1.jpg'),owner:'seyed', text:'this is a post' ,comments:['good','bad']}}/>
                <Post content={{imgOwner:require('./img1.jpg'),img:require('./img1.jpg'),owner:'seyed',text:'this is a post',comments:['good','bad']}}/>
            </div>
        );
    }
}

class Post extends React.Component<PostInter>{
    render() {
        return (
            <div className="box">
                <img className={'profile_img profile_post'} src={this.props.content.imgOwner} width='3%'/>
                <img className={'img_post'} src={this.props.content.img} width='40%'/>
                <header className={'name_post'}>{this.props.content.owner}</header>
                <p className={'name_post'}>{this.props.content.text}</p>
                <ul>
                    {this.props.content.comments.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <input type={'text'} placeholder={'post comment'}/>
            </div>
        );
    }
}

export default Posts