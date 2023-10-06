import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ color }) => (
    <div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>
); 

export default Loading;