import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
interface person{
    content:{
        img:string
        username:string
        id_user:string
    }
}

interface info {
    id:number;
    text:string;
    persons:any;
}
class Recom extends React.Component<info>{
    constructor(props:any) {
        super(props);
    }
    render() {
        let jsx = this.props.persons.map((user: { id: string; imgOwner: any; user: any; }) => {
            console.log(user)
            return <Person key={user.id} content={{img:user.imgOwner , id_user:user.id , username:user.user}}/>
        })
        return (
            <div className='right-grid' id='right_grid'>
                <h2>{this.props.text}</h2>
                {jsx}
            </div>
        );
    }
}
class Person extends React.Component<person>{
    render() {
        // console.log(this.props.content)
        return (
            this.props.content.id_user===undefined?<div/>:
            <div className="box">
                <Link to={`/profile/${this.props.content.id_user}`}>
                <img className={'profile_img recom_img'} src={this.props.content.img} width='7%'/>
                </Link>
                <h3 className='recom_name'>{this.props.content.username}</h3>
            </div>
        );
    }
}
export default Recom