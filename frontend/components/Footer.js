import React from 'react';
import { AiOutlineTwitter, AiFillInstagram} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 Boat Headphones All rights reserverd</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer