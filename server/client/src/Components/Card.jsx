import React from "react";

const Card = (props) => {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    backgroundColor: props.status === "completed" ? "lightgreen" : "#f9f9f9",
  };

  const buttonStyle = {
    marginRight: "5px",
  };

  const statusStyle = {
    color: props.status ? "green" : "orange",
  };
  const statusText = props.status ? "Complete" : "Pending";

  return (
    <div style={cardStyle}>
      <h2>{props.title}</h2>
      <div>
        <h4>description</h4>
        <p>{props.description}</p>
      </div>
      <div>
        <button style={buttonStyle} onClick={props.onUpdate}>
          Update
        </button>
        <button style={buttonStyle} onClick={props.onDelete}>
          Delete
        </button>
        <span style={statusStyle}>{statusText}</span>
      </div>
    </div>
  );
};

export default Card;
