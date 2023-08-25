import React from 'react';
import img from './img1.jpg'
import { Link } from 'react-router-dom';
interface headerProps{
    content:{
        path:string;
        username:string;
        id:number;
        search:any;
    };
}
class Header extends React.Component<headerProps>{
    state={
        username:''
    }
    constructor(props:headerProps) {
        super(props);
    }
    handleSearch = () => {
        this.props.content.search(this.state.username);
    }
    render() {
        return (
            <header>
                <div  id='header'>
                        <input name={'username'} className={'input'} type={'text'} placeholder={'username'} onChange={e => this.setState({ username: e.target.value })} value={this.state.username}/>
                    <button  className={'buttons'} onClick={this.handleSearch}>search</button>
                        <Link to={`/profile/${this.props.content.id}`}>
                            <img src={this.props.content.path} className={'img-rounded profile_img'} width='7%' alt={'profile'}/>
                        </Link>

                        <h6><Link to={'/setting'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="feather feather-settings">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path
                                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                        </Link>   login as: {this.props.content.username}</h6>

                </div>
        </header>
        );
    }
}

export default Header