import React from 'react';

export const SubmitButton = ({ isLoading, text = 'NEXT', onClick, ...props }) => {
  return (
    <button className={`submit-button submit-btn ${isLoading ? 'loading' : ''}`} onClick={onClick} {...props}>
      {isLoading
      ? <div className='lds-spinner'>
        {[...Array(12).keys()].map(() => <span />)}
      </div>
      : text}
    </button>
  );
};