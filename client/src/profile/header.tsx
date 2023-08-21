import React from "react";
import axios from "axios";

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
    id:number;
}
class Header extends React.Component<info>{
    state={
        id:0,
        username:'',
        name:'',
        email:'',
        bio:'',
        follow:0,
        following:0,
        profile:'',
        banner:'',
        posts:0,
        isFollow:0,
        loading:true,
    }
    constructor(props:any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event:any){

    }
    componentDidMount() {
        let url :string= 'http://localhost:8000/person/setting/'+this.props.id+'/'
        axios.get(url)
            .then(response => {
                const userData = response.data;

                this.setState({
                    id: userData.id,
                    username: userData.username,
                    name: userData.name,
                    bio: userData.boi,
                    profile: 'http://localhost:8000/media/'+userData.profile_img,
                    banner: 'http://localhost:8000/media/'+userData.banner_img,
                    loading :false
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    render() {
        return (
            <div className='profile_header'>
                <div className='profile_banner_wrapper'>
                    <img src={this.state.banner} className='profile_banner' alt='Banner' />
                    <div className='profile_content_wrapper'>
                        <img className={'setting_profile'} src={this.state.profile} width='10%' alt='Profile Picture' />
                        <h2 className='profile_username'>{this.state.username}</h2>
                        <div className='profile_content_wrapper_inner'>
                            <h5 className='profile_bio'>I am {this.state.name},{this.state.bio}</h5>
                            <h4 className='profile_posts_num'>{this.state.posts} Posts</h4>
                            <h4 className='follow'>Followers: {this.state.follow}</h4>
                            <h4 className='following'>Following: {this.state.following}</h4>
                        </div>
                        <button className='profile_follow'>{this.state.isFollow? 'follow' :'unfollow'}</button>
                </div>
                </div>
            </div>


        );
    }
}

export default Header