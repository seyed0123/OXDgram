import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./home/home";
import profile from "./profile/profile";
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
            <Route path="/" exact component={Home} />
            <Route path="/profile/:id" component={profile} />
            <Route path="/setting" component={Setting}/>
            <Route path="/login" render={(props) => <SignIn {...props}  />}/>
            <Route path="/create" component={Create}/>
        </Router>

    );
  }
}

export default App;
