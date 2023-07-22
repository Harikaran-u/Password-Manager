import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem/index'
import './index.css'

class PasswordManager extends Component {
  state = {
    websiteName: '',
    userName: '',
    password: '',
    savedPwdList: [],
    searchInput: '',
    showPassword: false,
  }

  addWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  addUserName = event => {
    this.setState({userName: event.target.value})
  }

  addPassword = event => {
    this.setState({password: event.target.value})
  }

  addNewPwd = event => {
    event.preventDefault()

    const {websiteName, userName, password} = this.state

    const newPwdList = {
      id: uuidv4(),
      websiteName,
      userName,
      password,
    }
    this.setState(prevState => ({
      savedPwdList: [...prevState.savedPwdList, newPwdList],
      websiteName: '',
      userName: '',
      password: '',
    }))
  }

  showPwd = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  deleteSavedPwd = id => {
    const {savedPwdList} = this.state
    const newPwdList = savedPwdList.filter(eachItem => eachItem.id !== id)
    this.setState({savedPwdList: newPwdList})
  }

  searchInputData = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      websiteName,
      userName,
      password,
      savedPwdList,
      showPassword,
      searchInput,
    } = this.state

    console.log(savedPwdList)

    const filteredData = savedPwdList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const isDataAvailable = filteredData.length === 0

    const listOfData = (
      <ul className="saved-pwd-list-cont">
        {filteredData.map(eachItem => (
          <PasswordItem
            newList={eachItem}
            key={eachItem.id}
            isSeen={showPassword}
            deleteSavedPwd={this.deleteSavedPwd}
          />
        ))}
      </ul>
    )

    const noData = (
      <div className="no-passwords-cont">
        <img
          className="no-pwd-img"
          alt="no passwords"
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        />
        <p className="no-password">No Passwords</p>
      </div>
    )

    const mainApp = (
      <div className="home-cont">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="top-level-cont">
          <div className="data-entry-cont">
            <h1 className="entry-head">Add New Password</h1>
            <form className="form-cont" onSubmit={this.addNewPwd}>
              <div className="data-entry-card">
                <img
                  className="input-logo"
                  alt="website"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                />
                <input
                  type="text"
                  className="input-data"
                  placeholder="Enter Website"
                  onChange={this.addWebsite}
                  value={websiteName}
                />
              </div>
              <div className="data-entry-card">
                <img
                  className="input-logo"
                  alt="username"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                />
                <input
                  type="text"
                  className="input-data"
                  placeholder="Enter Username"
                  onChange={this.addUserName}
                  value={userName}
                />
              </div>
              <div className="data-entry-card">
                <img
                  className="input-logo"
                  alt="password"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                />
                <input
                  type="password"
                  className="input-data"
                  placeholder="Enter Password"
                  onChange={this.addPassword}
                  value={password}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="pwd-mn-img"
          />
        </div>
        <div className="bottom-level-cont">
          <div className="your-pwd-search-cont">
            <div className="password-count-cont">
              <h1 className="your-password">Your Passwords</h1>
              <p className="count">{savedPwdList.length}</p>
            </div>
            <div className="search-input-cont">
              <img
                className="input-logo"
                alt="search"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              />
              <input
                type="search"
                className="input-data"
                placeholder="Search"
                onChange={this.searchInputData}
              />
            </div>
          </div>
          <hr size="3" className="hr-line" />
          <div className="show-pwd-cont">
            <input
              type="checkbox"
              id="show-pwd"
              className="checkBox"
              onChange={this.showPwd}
            />
            <label
              htmlFor="show-pwd"
              name="Show Passwords"
              className="show-pwd-label"
            >
              Show Passwords
            </label>
          </div>

          {isDataAvailable ? noData : listOfData}
        </div>
      </div>
    )
    return mainApp
  }
}

export default PasswordManager
