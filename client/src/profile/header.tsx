import React from "react";

interface info{
    content:{
        prof:string;
        banner:string;
        bio:string;
        username:string;
        follow:number;
        following:number
        posts:number;
        isFollow:boolean
    }
}
class Header extends React.Component<info>{
    render() {
        return (
            <div className='profile_header'>
                <div className='profile_banner_wrapper'>
                    <img src={this.props.content.banner} className='profile_banner' alt='Banner' />
                    <div className='profile_content_wrapper'>
                        <img  src={this.props.content.prof} width='10%' alt='Profile Picture' />
                        <h2 className='profile_username'>{this.props.content.username}</h2>
                        <h4 className='profile_bio'>{this.props.content.bio}</h4>
                        <h4 className='profile_posts_num'>{this.props.content.posts} Posts</h4>
                        <h4 className='follow'>Followers: {this.props.content.follow}</h4>
                        <h4 className='following'>Following: {this.props.content.following}</h4>
                        <button className='profile_follow'>{this.props.content.isFollow? 'follow' :'unfollow'}</button>
                    </div>
                </div>
            </div>


        );
    }
}

export default Header