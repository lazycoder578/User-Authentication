import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import auth from "../../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Register() {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name, email, password, accepted);
    //reset error
    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should at least on upper case characters."
      );
      return;
    } else if (!accepted) {
      setRegisterError("Please accept our terms and conditions!");
      return;
    }

    //create User
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("User Created Successfully");
        //update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            console.log("Profile Updated");
          })
          .catch((error) => {
            console.log(error);
          });
        //send varification email
        sendEmailVerification(result.user).then(() => {
          alert("Please check your email and varify your account");
        });
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div className="">
      <div className="mx-auto m: w-1/2">
        <h2 className="text-3xl py-2">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 w-full  px-2 py-4 rounded-lg"
            type="text"
            placeholder="Your Name"
            name="name"
            required
            id=""
          />
          <br />
          <input
            className="mb-4 w-full  px-2 py-4 rounded-lg"
            type="email"
            placeholder="Your Email"
            name="email"
            required
            id=""
          />
          <br />
          <div className="relative mb-2">
            <input
              className="w-full  px-2 py-4 rounded-lg"
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              required
              name="password"
              id=""
            />
            <span
              className="absolute top-5 right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <br />
          <input type="checkbox" name="terms" id="terms" />
          <label className="ml-2" htmlFor="terms">
            Accept our <a href="">Terms and conditions</a>
          </label>
          <input
            className="btn btn-secondary my-4 w-full"
            type="submit"
            value="Register"
          />
        </form>
        {registerError && <p className="text-red-700">{registerError}</p>}
        {success && <p className="text-green-700">{success}</p>}
        <p>
          Already have an account? Please{" "}
          <Link className="text-red-700" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
