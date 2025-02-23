import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../constant";
import { adduser } from "../utils/slice/userSlice";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const { firstName, lastName, about, email, photoUrl, skills, gender, age } =
    user.data;
  const [profile, setProfile] = useState({
    firstName,
    lastName,
    email,
    photoUrl,
    about,
    skills,
    gender: gender || undefined,
    age: age || undefined,
  });

  console.log(profile);

  const saveDetails = async () => {
    try {
      const filteredProfile = Object.fromEntries(
        Object.entries(profile).filter(([key, value]) => value !== undefined)
      );
      console.log("filteredProfile", filteredProfile);
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        filteredProfile,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(adduser(res.data.data));
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {toast && (
        <div className="toast toast-top toast-center z-10">
          <div className="alert alert-success">
            <span>Profile Updated successfully ✅</span>
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 w-full px-4">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter your first name"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter your last name"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="email"
                  className="grow"
                  placeholder="Enter your email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter your photo URL"
                  value={profile.photoUrl}
                  onChange={(e) =>
                    setProfile({ ...profile, photoUrl: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <span>Gender</span>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  className="radio"
                  checked={profile.gender === "male"}
                  onChange={() => setProfile({ ...profile, gender: "male" })}
                />
                <span>Male</span>
                <input
                  type="radio"
                  name="gender"
                  className="radio"
                  checked={profile.gender === "female"}
                  onChange={() => setProfile({ ...profile, gender: "female" })}
                />
                <span>Female</span>
                <input
                  type="radio"
                  name="gender"
                  className="radio"
                  checked={profile.gender === "others"}
                  onChange={() => setProfile({ ...profile, gender: "others" })}
                />
                <span>Others</span>
              </label>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="About"
                  value={profile.about}
                  onChange={(e) =>
                    setProfile({ ...profile, about: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="List your skills"
                  value={profile.skills}
                  onChange={(e) =>
                    setProfile({ ...profile, skills: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>Age: {profile.age}</label>
              <input
                type="range"
                min={18}
                max="100"
                value={profile.age}
                className="range"
                onChange={(e) =>
                  setProfile({ ...profile, age: e.target.value })
                }
              />
            </div>

            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={saveDetails}>
                Save Details
              </button>
            </div>
          </div>
        </div>
        <div className="w-full max-w-sm lg:max-w-md">
        <h2 className="card-title">Live Preview</h2>
          <UserCard user={profile} />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
