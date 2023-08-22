import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./home/home";
import Profile from "./profile/profile";
import Setting from "./setting/setting";
import SignIn from "./Sing/Signin";
import Create from "./Sing/create";

class App extends React.Component {
  state={
    id:0
  }
  constructor(props: any) {
    super(props);
    this.getId = this.getId.bind(this);
  }
  getId(){
      let url :string= 'http://localhost:8000/person/check/'
      axios.get(url)
          .then(response => {
              const userData = response.data;
              console.log(userData)
              this.setState({
                  id: userData.id,
              });
          })
          .catch(error => {
              console.error('Error:', error);
          });
  }
    componentDidMount() {
      this.getId()
    }

    render() {
    return (
        this.state.id === 0 ? <Router>
                <Route render={(props) => <SignIn {...props}  />}/>
            </Router>:
        <Router>
            <Route path="/" exact  render={(props) => <Home {...props} id={this.state.id}/> }/>
            <Route path="/profile/:id"  render={(props) => <Profile {...props} />}/>
            <Route path="/setting"  render={(props) => <Setting {...props} id={this.state.id} />}/>
            <Route path="/login" render={(props) => <SignIn {...props}  />}/>
            <Route path="/create"  render={(props) => <Create {...props}  />}/>
        </Router>

    );
  }
}

export default App;
