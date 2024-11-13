import React from "react";
import classes from "./Greeting.module.css";

export default function Greeting({ user }) {
  return (
    <div
      className={`${classes["greeting-wrapper"]} d-flex flex-col gap-2`}
      style={{ marginBottom: "5rem" }}
    >
      <div
        className="fs-md-4"
        style={{ fontFamily: "Montserrat, sans-serif", padding: "1.4rem 0" }}
      >
        <h1 className="fs-1">Hello {user.lastName}</h1>
        <p className={`${classes.text} w-50`}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum
          explicabo eos voluptatibus facilis? Commodi quis obcaecati enim
          tenetur ea culpa.
        </p>
      </div>
      <div>
        <button className={classes.editBtnUserInfo}>Edit your profile</button>
      </div>
    </div>
  );
}
