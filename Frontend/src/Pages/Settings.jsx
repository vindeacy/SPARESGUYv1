import React from 'react'
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";
const Settings = ({handle2FAToggleClick,handleEmailNotToggleClick, is2FAEnabled, isEmailNotEnabled}) => {
  return (
    <div className="settings">
    <div className="appearance">
      <h3>Appearance</h3>
      <p>Customize your theme looks on your device</p>
    </div>
    <div className="language">
      <h3>Language</h3>
      <p>Select your language</p>
    </div>
    <div className="2FA">
      <h3>Two-factor Authentication</h3>
      <p>Keep your account secure by enabling 2FA</p>
      {is2FAEnabled ? (
        <BsToggleOn className="toggle-button" onClick={handle2FAToggleClick} />
      ) : (
        <BsToggleOff className="toggle-button" onClick={handle2FAToggleClick} />
      )}
    </div>
    <div className="email-not">
      <h3>Email Notifications</h3>
      <p>Receive email notifications</p>
      {isEmailNotEnabled ? (
        <BsToggleOn className="toggle-button" onClick={handleEmailNotToggleClick} />
      ) : (
        <BsToggleOff className="toggle-button" onClick={handleEmailNotToggleClick} />
      )}
    </div>
  </div>
  )
}

export default Settings