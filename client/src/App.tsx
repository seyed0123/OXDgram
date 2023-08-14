import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./home/home";
import profile from "./profile/profile";

class App extends React.Component {
  state:{data:{hello:string}}={
    data:{hello:'seyed'}
  }
  constructor(props: any) {
    super(props);
  }

  // componentDidMount() {
  //   axios.get('http://localhost:8000/api/hello')
  //       .then((response: { data: any; }) => {
  //         this.setState({
  //           data: response.data
  //         });
  //       });
  // }

  render() {
    return (
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={profile} />
        </Router>

    );
  }
}

export default App;
