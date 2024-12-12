import React, { useContext } from "react";
import classes from "./Greeting.module.css";
import { UserContext } from "../../context/userContext";

export default function Greeting({ user }) {
  const { isEditing, setIsEditing } = useContext(UserContext);

  const startEditing = () => {
    setIsEditing(true);
  };

  return (
    <div className={`${classes["greeting-wrapper"]} d-flex flex-col gap-2`} style={{ marginBottom: "5rem" }}>
      <div className="fs-md-4" style={{ fontFamily: "Montserrat, sans-serif", padding: "1.4rem 0" }}>
        <h1 className="fs-1">Hello {user.lastName + " " + user.firstName}</h1>
        <p className={`${classes.text} w-50`}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum explicabo eos voluptatibus facilis? Commodi quis
          obcaecati enim tenetur ea culpa.
        </p>
      </div>
      <div>
        <button onClick={startEditing} className={classes.editBtnUserInfo}>
          Edit your profile
        </button>
      </div>
    </div>
  );
}
