import React, { useState, useEffect } from 'react';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import "./PagesCSS/userProfile.css";
import { useLocation } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import Notification from '../Homepage/Notification';

import carouselImage from '../Homepage/HomepageImages/defaultuser.png';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

import Settings from './Settings';
import WishList from './wishList';
import PersonalInfo from './PersonalInfo';
//import { useUser } from '../context/UserContext';

const UserProfile = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  // //const { user } = useUser();

  // if (!user) {
  //   console.warn("User context is undefined. Redirecting or showing fallback...");
  //   return <div>Please log in to view your profile.</div>;
  // }

  // const [quantities, setQuantities] = useState({});
  // const location = useLocation();
  const [is2FAEnabled, setIs2FAEnabled] = useState(() => {
    return JSON.parse(localStorage.getItem('is2FAEnabled')) || false;
  });
  const [isEmailNotEnabled, setIsEmailNotEnabled] = useState(() => {
    return JSON.parse(localStorage.getItem('isEmailNotEnabled')) || false;
  });

  useEffect(() => {
    localStorage.setItem('is2FAEnabled', JSON.stringify(is2FAEnabled));
  }, [is2FAEnabled]);

  useEffect(() => {
    localStorage.setItem('isEmailNotEnabled', JSON.stringify(isEmailNotEnabled));
  }, [isEmailNotEnabled]);

  const handle2FAToggleClick = () => {
    setIs2FAEnabled(!is2FAEnabled);
  };

  const handleEmailNotToggleClick = () => {
    setIsEmailNotEnabled(!isEmailNotEnabled);
  };

  const handleAddToCart = (item) => {
    const itemWithQuantity = {
      ...item,
      quantity: quantities[item.productId] || 1,
      _id: item.productId
    };

    addToCart(itemWithQuantity);
  };

  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    address: ''
  });

  const [isSaved, setIsSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('personalInformation');

  useEffect(() => {
    if (location.state && location.state.section) {
      setActiveSection(location.state.section);
    }
  }, [location.state]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', { // Replace with your USERS_URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('User details saved successfully:', result);
      setIsSaved(true);
      alert('Details successfully saved!');

    } catch (error) {
      console.error('Error saving user details:', error);
      alert('Error saving details. Please try again.');
    }
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return wishlist.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'personalInformation':
        return (
          <PersonalInfo
            handleSaveDetails={handleSaveDetails}
            userDetails={userDetails} 
            handleInputChange={handleInputChange}
            isSaved={isSaved}
          />
        );
      case 'wishlist':
        return (
          <WishList 
            getCurrentPageItems={getCurrentPageItems}
            handleRemoveFromWishlist={handleRemoveFromWishlist}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        );
      case 'notifications': 
        return <Notification />;
      case 'settings':
        return (
          <Settings 
            handle2FAToggleClick={handle2FAToggleClick}
            handleEmailNotToggleClick={handleEmailNotToggleClick}
            is2FAEnabled={is2FAEnabled}
            isEmailNotEnabled={isEmailNotEnabled}
          />
        );
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div>
      <header><Header /></header>
      <main>
        <div className="sidebar">
          <div className="display-image-container">
            <img src={carouselImage} alt="User Carousel" className="display-image" />
          </div>
          <ul>
            <li
              className={activeSection === 'personalInformation' ? 'active' : ''}
              onClick={() => setActiveSection('personalInformation')}
            >
              <FiUser className='icon' />Personal Information
            </li>
            <li
              className={activeSection === 'wishlist' ? 'active' : ''}
              onClick={() => setActiveSection('wishlist')}
            >
              <MdFavoriteBorder className='icon' />My Wishlist
            </li>
            <li
              className={activeSection === 'notifications' ? 'active' : ''}
              onClick={() => setActiveSection('notifications')}
            >
              <IoMdNotificationsOutline className='icon' />Notifications
            </li>
            <li
              className={activeSection === 'settings' ? 'active' : ''}
              onClick={() => setActiveSection('settings')}
            >
              <IoSettingsOutline className='icon' />Settings
            </li>
          </ul>
        </div>
        <div className="userdetails">
          {activeSection === 'personalInformation' && (
            <div className="top">
              <div className="display-image-container-top">
                <img src={carouselImage} alt="User Carousel" className="display-image-top" />
              </div>
              <button className='edit-button'>Edit Profile</button>
            </div>
          )}
          {renderContent()}
        </div>
      </main>
      <footer><Footer /></footer>
    </div>
  );
};

export default UserProfile;
