import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: []
    }
  }

  componentDidMount() {
    this.getPlayer()
  }

  getPlayer() {
    let self = this;
    axios({
      url: `/api/v1/players/${this.props.user_id}`,
      headers: {
        "Content-Type": "application/json",
        "api-token": self.props.authToken
      }
    })
    .then(function(response) {
      console.log(response.data)
      self.setState({player: response.data})
    })
    .then(function(error) {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="card" style={{width: '25rem', marginLeft:'20%'}}>
        <div className="card-body">
          <h5 className="card-title">{this.state.player.first_name}</h5>
          <p className="card-text">{this.state.player.ability}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{this.state.player.gender}</li>
          <li className="list-group-item">{this.state.player.dob}</li>
        </ul>
        <div className="card-body">
          <NavLink to="/" className="card-link">Request Game</NavLink>
        </div>
        <div className="card-body">
          <h6 className="card-title">Game Requests</h6>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Game request 1</li>
          <li className="list-group-item">Game request 2</li>
        </ul>
        <div className="card-body">
          <h6 className="card-title">Game Results</h6>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Result 1</li>
          <li className="list-group-item">Result 2</li>
        </ul>
      </div>
    )
  }
}

export default Profile