import React from "react";
import axios from "axios";
interface person{
    content:{
        img:string
        username:string
        id_user:number
        id:number
    }
}

interface info {
    id:number;
    text:string
}
class Recom extends React.Component<info>{
    constructor(props:any) {
        super(props);

    }
    render() {
        return (
            <div className='right-grid' id='right_grid'>
                <h2>{this.props.text}</h2>
            </div>
        );
    }
}
class Person extends React.Component<person>{
    render() {
        return (
            <div className="box">
                <img className={'profile_img'} src={this.props.content.img} width='7%'/>
                <h3 className='recom_name'>{this.props.content.username}</h3>
                <button className='recom_button ' type={'submit'}>Follow</button>
            </div>
        );
    }
}
export default Recom