import React from 'react';
import img from './img1.jpg'
interface headerProps{
    content:{
        path:string;
    };
}
class Header extends React.Component<headerProps>{
    render() {
        console.log(this.props.content.path)
        return (
            <header>
                <div  id='header'>
                        <input className={'input'} type={'text'} placeholder={'username'}/>
                        <button type={'submit'} className={'buttons'}>search</button>
                        <img src={this.props.content.path} className={'img-rounded profile_img'} width='7%' alt={'profile'}/>
                </div>
        </header>
        );
    }
}

export default Header