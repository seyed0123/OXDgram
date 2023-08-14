import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import Header from "./header";
import Recom from "./recom";
import Posts from "./post";

interface Props extends RouteComponentProps {}
class Home extends React.Component<Props>
{
    state:{data:{hello:string}}={
        data:{hello:'seyed'}
    }

    handleProfileButtonClick = () => {
        this.props.history.push('/profile');
    };
    // componentDidMount() {
    // axios.get('http://localhost:8000/api/hello')
    //     .then((response: { data: any; }) => {
    //         this.setState({
    //             data: response.data
    //         });
    //     });
    // }
    render(){
        return(
            <div>
                <Header content={{path:require('./img1.jpg')}} />
                <div className='container_body'>
                    <Recom/>
                    <Posts/>
                </div>
                <div style={{justifyContent:'center' , display:'flex'}}>
                    <button type={'submit'}>Load more</button>
                </div>
            </div>
        )
    }
}

export default Home