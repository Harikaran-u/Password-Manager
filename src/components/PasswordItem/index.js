import './index.css'

const PasswordItem = props => {
  const {newList, isSeen, deleteSavedPwd} = props
  const {websiteName, userName, password, id} = newList

  const deleteItem = () => {
    deleteSavedPwd(id)
  }

  const passwordList = (
    <li className="pwd-list-cont">
      <p className="profile">{userName[0]}</p>
      <div className="pwd-main-cont">
        <p className="website">{websiteName}</p>
        <p className="user-name">{userName}</p>
        {isSeen ? (
          <p className="user-pwd">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            className="stars-img"
            alt="stars"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={deleteItem}
        data-testid="delete"
      >
        <img
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delete-icon"
        />
      </button>
    </li>
  )
  return passwordList
}

export default PasswordItem
