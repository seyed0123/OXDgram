import React from "react";
import Header from "./header";
import Posts from "./Posts";
import axios from "axios";
import { RouteComponentProps } from 'react-router-dom';
interface MatchParams {
    id: string;
}
class Profile extends React.Component<RouteComponentProps<MatchParams>>{
    state ={
        content:[],
        id:Number(this.props.match.params.id),
        loading:true
    }
    constructor(props:any) {
        super(props);

    }

    componentDidMount(){

        let url :string= 'http://localhost:8000/post/user/'+this.state.id+'/'
        axios.get(url)
            .then(response => {
                const userData = response.data;
                console.log(userData.message)
                if ((userData.message === 'No posts found for the owner.' )||(userData.message === 'Person with the given ID does not exist' )){
                    alert(userData.message)
                }
                else
                    this.setState({
                    content:userData.map((post: { id: number; owner: number; img: string; text: any; }) => ({
                        id: post.id,
                        owner: post.owner,
                        img: 'http://localhost:8000/media/' + post.img,
                        text: post.text
                    })),
                    loading :false
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <div >
                <Header id={Number(this.state.id)} num_post={this.state.content.length}content={{prof:require('./img1.jpg'),banner:require('./back.jpg') , bio:'this is a bio' ,username:'username',follow:0,following:0,posts:0,isFollow:true}}/>
                {this.state.loading ? <div className="book center">
                    <div className="book__pg-shadow"></div>
                    <div className="book__pg"></div>
                    <div className="book__pg book__pg--2"></div>
                    <div className="book__pg book__pg--3"></div>
                    <div className="book__pg book__pg--4"></div>
                    <div className="book__pg book__pg--5"></div>
                </div>:<Posts content={{posts:this.state.content}}/>}
            </div>
        );
    }
}

export default Profile