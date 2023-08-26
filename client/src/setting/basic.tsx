import React from "react";
import axios from "axios";
interface info{
    id:number
}
class Basic extends React.Component<info>{
    state={
        id:0,
        username:'',
        name:'',
        email:'',
        boi:'',
        canSearch:false,
        canFollow:false,
        canComment:false,
        profile_img:'',
        password:'',
        confirmPassword: '',
        oldPassword:'',
        banner_img:'',
        loading:true,
    }
    profile:any = '';
    constructor(props:any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendBanner = this.sendBanner.bind(this);
        this.sendProfile = this.sendProfile.bind(this);
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
                    email: userData.email,
                    boi: userData.boi,
                    canSearch: userData.can_search,
                    canFollow: userData.can_follow,
                    canComment: userData.can_comment,
                    profile_img: 'http://localhost:8000/media/'+userData.profile_img,
                    banner_img: 'http://localhost:8000/media/'+userData.banner_img,
                    loading :false
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    handleSubmit(event:any) {
        event.preventDefault();


        if (this.state.password !== this.state.confirmPassword) {
            alert('Password and confirm password do not match');
            return;
        }

        let url :string= 'http://localhost:8000/person/setting/'+this.props.id+'/'
        axios.post(url, this.state)
            .then(response => {
                alert(response.data.message)
                if(response.data.message==='Data saved successfully'){
                    this.componentDidMount()
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    sendProfile(event:any){
        event.preventDefault();


        const formData = new FormData();
        formData.append('user_id', String(this.state.id));
        formData.append('profile_img', event.target.files[0]);

        axios.post('http://localhost:8000/person/profile', formData)
            .then((response) => {
                alert(response.data.message);
                this.componentDidMount()
            })
            .catch((error) => {
                console.error(error);
            });
    }
    sendBanner(event:any){
        event.preventDefault();


        const formData = new FormData();
        formData.append('user_id', String(this.state.id));
        formData.append('banner_img', event.target.files[0]);

        axios.post('http://localhost:8000/person/banner', formData)
            .then((response) => {
                alert(response.data.message);
                this.componentDidMount()
            })
            .catch((error) => {
                console.error(error);
            });
    }
    handleChange(event:any) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ [name]: value });
    }
    render() {
        return (
            this.state.loading?
                <main className={'center'}>
                    <svg className="ip" viewBox="0 0 256 128" width="256px" height="128px"
                         xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stop-color="#5ebd3e"/>
                                <stop offset="33%" stop-color="#ffb900"/>
                                <stop offset="67%" stop-color="#f78200"/>
                                <stop offset="100%" stop-color="#e23838"/>
                            </linearGradient>
                            <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                                <stop offset="0%" stop-color="#e23838"/>
                                <stop offset="33%" stop-color="#973999"/>
                                <stop offset="67%" stop-color="#009cdf"/>
                                <stop offset="100%" stop-color="#5ebd3e"/>
                            </linearGradient>
                        </defs>
                        <g fill="none" stroke-linecap="round" stroke-width="16">
                            <g className="ip__track" stroke="#ddd">
                                <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
                                <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
                            </g>
                            <g stroke-dasharray="180 656">
                                <path className="ip__worm1" stroke="url(#grad1)" stroke-dashoffset="0"
                                      d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
                                <path className="ip__worm2" stroke="url(#grad2)" stroke-dashoffset="358"
                                      d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
                            </g>
                        </g>
                    </svg>
                </main> :


            <div className={'setting_form_container_a'}>
                <div className="center">
                    <h3>
                        Basics
                    </h3>
                </div>
                <img  src={this.state.profile_img} className={'center profile_img setting_profile'} width='5%'/>
                <div className={'setting_form_container'}>
                    <div className='setting_form_content'>
                        <p className='setting_text'>Username: {this.state.username}</p>
                        <input className='setting_input input' type='text' value={this.state.username} name="username" onChange={this.handleChange}/>
                    </div>
                    <div className='setting_form_content'>
                        <p className='setting_text'>Name: {this.state.name}</p>
                        <input className='setting_input input' type='text' value={this.state.name} name="name" onChange={this.handleChange}/>
                    </div>
                    <div className='setting_form_content'>
                        <p className='setting_text'>Email: {this.state.email}</p>
                        <input className='setting_input input' type='email' value={this.state.email} name="email" onChange={this.handleChange}/>
                    </div>
                    <div className='setting_form_content'>
                        <p className='setting_text'>Can Comment:</p>
                        <input className='setting_input check' type='checkbox' defaultChecked={this.state.canComment} name="canComment" onChange={this.handleChange}/>
                    </div>
                    <div className='setting_form_content'>
                        <p className='setting_text'>Can Follow: </p>
                        <input className='setting_input check' type='checkbox' defaultChecked={this.state.canFollow} name="canFollow" onChange={this.handleChange}/>
                    </div>
                    <div className='setting_form_content'>
                        <p className='setting_text'>Can Search: </p>
                        <input className='setting_input check' type='checkbox' defaultChecked={this.state.canSearch} name="canSearch" onChange={this.handleChange}/>
                    </div>
                    <div className='setting_form_content'>
                        <p className='setting_text'>Boi: </p>
                        <textarea className='setting_input input' value={this.state.boi} name="boi" onChange={this.handleChange}/>
                    </div>
                    <div className='setting_form_content'>
                        <p className='setting_text'>profile: </p>
                        <input className='setting_input input' type='file' accept=".jpg,.jpeg,.png" onChange={this.sendProfile}/>
                    </div>
                    <div className='setting_form_content'>
                        <p className='setting_text'>password: </p>
                        <input className={'input'} type={'password'} name="oldPassword" placeholder={'oldPassword'} onChange={this.handleChange} />
                        <input className={'input'} type={'password'} name="password" placeholder={'password'} onChange={this.handleChange} />
                        <input className={'input'} type={'password'} name="confirmPassword" placeholder={'confirm password'} onChange={this.handleChange} />
                    </div>
                </div>
                <div className='setting_form_content'>
                    <p className='setting_text'>banner: </p>
                    <img className='center setting_banner' src={this.state.banner_img}/>
                    <input className='setting_input input' type='file' accept=".jpg,.jpeg,.png" onChange={this.sendBanner}/>
                </div>
                <button className="center_b profile_follow" onClick={this.handleSubmit}>submit</button>
            </div>
        );
    }
}

export default Basic