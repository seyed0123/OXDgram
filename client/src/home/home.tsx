import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import Header from "./header";
import Recom from "./recom";
import Posts from "./post";

interface Props extends RouteComponentProps {
    id:number
}
class Home extends React.Component<Props>
{
    state={
        username :'',
        profile:'',
        loading:true,
        num:5,
        id:0,
        text:'Recommendation',
        persons:[{}],
    }

    constructor(props:Props) {
        super(props);
        this.load = this.load.bind(this)
        this.searchUsername = this.searchUsername.bind(this);
    }

    componentDidMount() {
        let url :string= 'http://localhost:8000/person/setting/'+this.props.id+'/'
        axios.get(url)
            .then(response => {
                const userData = response.data;
                this.setState({
                    id:userData.id,
                    username: userData.username,
                    profile: 'http://localhost:8000/media/'+userData.profile_img,
                    loading :false
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
        let form = {
            id: this.props.id
        };
        let url2 = 'http://localhost:8000/person/recom/';
        axios.post(url2, form)
            .then(response => {
                const userData = response.data;
                console.log(userData)
                this.setState({
                    persons: userData.map((user: { id: string; user: string; imgOwner: string; }) => ({
                        id: user.id,
                        user: user.user,
                        imgOwner: 'http://localhost:8000/media/' + user.imgOwner,
                    }))
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    load(){
        this.setState((prevState:{num:number}) => ({
            num: prevState.num + 5
        }))
    }
    searchUsername = (username:string) => {
        let form = {
            search: username
        };
        let url = 'http://localhost:8000/person/search/';
        axios.post(url, form)
            .then(response => {
                const userData = response.data;
                this.setState({
                    text:'Results',
                    persons: userData.map((user: { id: string; username: string; profile: string; }) => ({
                        id: user.id,
                        user: user.username,
                        imgOwner: 'http://localhost:8000/media/' + user.profile,
                    }))
                });

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    render(){
        return(
            <div>
                <Header content={{path:this.state.profile ,username:this.state.username , id:this.state.id , search:this.searchUsername}} />
                <div className='container_body'>
                    <Recom id={this.state.id} text={this.state.text} persons={this.state.persons}/>
                    <Posts num={this.state.num}/>
                </div>
                <div style={{justifyContent:'center' , display:'flex'}}>
                    <button className={'profile_follow'} onClick={this.load}>Load more</button>
                </div>
            </div>
        )
    }
}

export default Home