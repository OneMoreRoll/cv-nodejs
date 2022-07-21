import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class App extends Component {
  state = {
    message: []
  }

  componentDidMount() {
    axios.get('/api')
      .then(res => {
        const message = res.data.message;
        this.setState({ message });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="homepage">
        <div className="bottom_left_face_wrapper image_wrapper">
          <img src={`${process.env.PUBLIC_URL}/img/homepage/looking_bottom_left.png`} className="bottom_left_face_wrapper" alt="Visage en 3D regardant vers le bas et la gauche." />
        </div>

        <div className="text_wrapper">
          <h1>{this.state.message}</h1>

          <Link to="/login" className="link">Se connecter</Link>
          <Link to="/register" className="link">S'inscrire</Link>
        </div>
        
        <div className=" image_wrapper">
          <img src={`${process.env.PUBLIC_URL}/img/homepage/looking_top_right.png`} className="top_right_face_wrapper" alt="Visage en 3D regardant vers le haut et la droite." />
        </div>
      </div>
    )
  }
}
