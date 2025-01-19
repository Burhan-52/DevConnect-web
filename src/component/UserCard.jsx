import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, skills, about, gender, photoUrl } = user;
  console.log("photoUrl", photoUrl);
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <h4 className="card-title">{age + ", " + gender}</h4>}
        <p>{about}</p>
        <div className="card-actions justify-center ">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
