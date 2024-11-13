import { useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordCriteria = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
  const doPasswordsMatch = password === confirmPassword;

  const handleGoogleSignup = () => {
    alert("Google signup initiated");
    const googleUserData = {
      provider: 'Google',
      username: 'googleUser',
      email: 'user@gmail.com',
    };
    handleSignupRequest(googleUserData);
  };

  const handleFacebookSignup = () => {
    alert("Facebook signup initiated");
    const facebookUserData = {
      provider: 'Facebook',
      username: 'facebookUser',
      email: 'user@facebook.com',
    };
    handleSignupRequest(facebookUserData);
  };

  const handleSignupRequest = async (userData) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        onSignup(data);
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isPasswordValid) {
      alert("Password does not meet the criteria.");
      return;
    }
    if (!doPasswordsMatch) {
      alert("Passwords do not match.");
      return;
    }
    const userData = {
      provider: 'Manual',
      username,
      email,
      password,
    };
    handleSignupRequest(userData);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
        
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <label className="inline-flex items-center text-sm mt-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
        </div>
        
        {/* Password criteria display */}
        <ul className="mb-4">
          <li className={passwordCriteria.length ? 'text-green-600' : 'text-red-600'}>
            At least 6 characters
          </li>
          <li className={passwordCriteria.uppercase ? 'text-green-600' : 'text-red-600'}>
            At least 1 uppercase letter
          </li>
          <li className={passwordCriteria.lowercase ? 'text-green-600' : 'text-red-600'}>
            At least 1 lowercase letter
          </li>
          <li className={passwordCriteria.number ? 'text-green-600' : 'text-red-600'}>
            At least 1 number
          </li>
          <li className={passwordCriteria.specialChar ? 'text-green-600' : 'text-red-600'}>
            At least 1 special character
          </li>
        </ul>

        <div className="mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          {!doPasswordsMatch && confirmPassword && (
            <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-medium shadow-md hover:from-green-600 hover:to-green-700 transition-colors mb-6"
          disabled={!isPasswordValid || !doPasswordsMatch}
        >
          Sign Up
        </button>
      </form>

      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-3 text-gray-500 font-semibold">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button
        onClick={handleGoogleSignup}
        className="w-full bg-white text-gray-700 border border-gray-300 py-2 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg hover:bg-gray-100 transition mb-4"
      >
        <FaGoogle className="mr-3 text-red-500" /> Continue with Google
      </button>

      <button
        onClick={handleFacebookSignup}
        className="w-full bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center shadow-md hover:bg-blue-800 transition"
      >
        <FaFacebook className="mr-3 text-white" /> Continue with Facebook
      </button>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
