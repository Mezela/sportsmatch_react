import React from 'react'
import axios from 'axios'
import SingleResult from './SingleResult'
import './css/Results.css'

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opponentResults: [],
      organiserResults: [],
      resultEdit: false
    }
    this.getOpponentResultsRequest = this.getOpponentResultsRequest.bind(this)
    this.getOrganiserResultsRequest = this.getOrganiserResultsRequest.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    this.getOpponentResultsRequest()
    this.getOrganiserResultsRequest()
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.resultEdit !== prevState.resultEdit) {
      this.getRequest()
    }
  }

  getOpponentResultsRequest() {
    let self = this;
    axios({
      url: "/api/v1/games/opponent",
      headers: {
        "Content-Type": "application/json",
        "api-token": localStorage.getItem('jwtToken')
      }
    })
      .then(function(response) {
        self.setState({
          opponentResults: response.data
        })
        console.log(response.data)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  getOrganiserResultsRequest() {
    let self = this;
    axios({
      url: "/api/v1/games/organiser",
      headers: {
        "Content-Type": "application/json",
        "api-token": localStorage.getItem('jwtToken')
      }
    })
      .then(function(response) {
        self.setState({
          organiserResults: response.data
        })
        console.log(response.data)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  handleEdit() {
    this.setState(prevState => {
      return {resultEdit: !prevState.resultEdit}
    })
  }

  render() {
      return (
      <div>
        <h2 align="center">My Results</h2>
        <div class="container">
          <div class="row">
            <div class="col-sm">
            <h3>I'm the organiser</h3>
            <ul className="list-group list-group-flush">
              {this.state.organiserResults.map(game => (
              <SingleResult
                key={game.id}
                id={game.id}
                game_id={game.game_id}
                winner_id={game.winner_id}
                loser_id={game.loser_id}
                organiser_id={game.organiser_id}
                opponent_id={game.opponent_id}
                game_date={game.game_date}
                handleEdit={game.handleEdit}
              />
              ))}
            </ul>
            </div>
            <div class="col-sm">
            <h3>I'm the opponent</h3>
              <ul className="list-group list-group-flush">
                {this.state.opponentResults.map(game => (
                  <SingleResult
                    key={game.id}
                    id={game.id}
                    result_id={game.game_id}
                    winner_id={game.winner_id}
                    loser_id={game.loser_id}
                    organiser_id={game.organiser_id}
                    opponent_id={game.opponent_id}
                    game_date={game.game_date}
                    handleEdit={game.handleEdit}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      )
    }
  }


export default Results
