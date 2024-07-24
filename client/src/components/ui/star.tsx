"use client"
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave, disabled }:any) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? 'gold' : 'none'}
    stroke={disabled ? 'gold' : 'gold'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={!disabled ? onClick : null}
    onMouseEnter={!disabled ? onMouseEnter : null}
    onMouseLeave={!disabled ? onMouseLeave : null}
    style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
  >
    <polygon points="12 2 15 10 22 10 17 14 19 21 12 17 5 21 7 14 2 10 9 10 12 2" />
  </svg>
);

Star.propTypes = {
  filled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const StarRating = ({ totalStars, disabled }:any) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <Star
            key={starNumber}
            filled={starNumber <= (hoverRating || rating)}
            onClick={() => !disabled && setRating(starNumber)}
            onMouseEnter={() => !disabled && setHoverRating(starNumber)}
            onMouseLeave={() => !disabled && setHoverRating(0)}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  totalStars: PropTypes.number,
  disabled: PropTypes.bool,
};

StarRating.defaultProps = {
  totalStars: 5,
  disabled: false,
};

export default StarRating;
