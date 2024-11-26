import React from 'react'

const PersonalInfo = ({handleSaveDetails, userDetails, handleInputChange, isSaved}) => {
  return (
    <form className="details" onSubmit={handleSaveDetails}>
    <div>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        placeholder="Enter your first name"
        value={userDetails.firstName}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        placeholder="Enter your last name"
        value={userDetails.lastName}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label htmlFor="phoneNumber">Phone Number:</label>
      <input
        type="text"
        id="phoneNumber"
        name="phoneNumber"
        placeholder="Enter your phone number"
        value={userDetails.phoneNumber}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label htmlFor="emailAddress">Email Address:</label>
      <input
        type="email"
        id="emailAddress"
        name="emailAddress"
        placeholder="Enter your email address"
        value={userDetails.emailAddress}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="Enter your address"
        value={userDetails.address}
        onChange={handleInputChange}
      />
    </div>
    {!isSaved && (
      <button type="submit" className='save-button'>Save Details</button>
    )}
  </form>
  )
}

export default PersonalInfo