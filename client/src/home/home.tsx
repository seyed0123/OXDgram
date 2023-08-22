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
        text:'Recommendation'
    }

    constructor(props:Props) {
        super(props);
        this.load = this.load.bind(this)
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
    }
    load(){
        this.setState((prevState:{num:number}) => ({
            num: prevState.num + 5
        }))
    }

    render(){
        return(
            <div>
                <Header content={{path:this.state.profile ,username:this.state.username , id:this.state.id}} />
                <div className='container_body'>
                    <Recom id={this.state.id} text={this.state.text}/>
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