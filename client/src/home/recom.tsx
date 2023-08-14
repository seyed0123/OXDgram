import React from "react";
interface person{
    content:{
        img:string
        username:string
    }
}
class Recom extends React.Component{
    render() {
        return (
            <div className='right-grid' id='right_grid'>
                <h2>Recommendations</h2>
                <Person content={{img:require('./img1.jpg'),username:'seyed'}}/>
                <Person content={{img:require('./img1.jpg'),username:'seyed'}}/>
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