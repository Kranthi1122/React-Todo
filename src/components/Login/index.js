import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', error: false, errorMsg: ''}

  //   componentDidMount() {
  //     this.authantication()
  //   }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({error: true, errorMsg})
  }

  getResults = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  userUpdate = e => {
    this.setState({username: e.target.value})
  }

  passUpdate = e => {
    this.setState({password: e.target.value})
  }

  render() {
    const {username, password, error, errorMsg} = this.state
    return (
      <div className="main-bg">
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={this.getResults}>
            <label htmlFor="username">USERNAME</label>
            <br />
            <input
              type="text"
              id="username"
              placeholder="username"
              value={username}
              onChange={this.userUpdate}
            />
            <br />
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={this.passUpdate}
            />
            <br />
            <button type="submit" className="buttons">
              Login
            </button>
            {error && <p className="error">* {errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
