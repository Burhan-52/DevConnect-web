import React from "react";

const Toast = ({ message, color }) => {
    console.log(color)
  return (
    <div className="toast toast-top toast-center z-10">
      <div className={`alert alert-${color}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
