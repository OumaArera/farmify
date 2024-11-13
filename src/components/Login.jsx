import { useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    alert("Google login initiated");
    const googleUserData = {
      provider: 'Google',
      email: 'user@gmail.com',
    };
    handleLoginRequest(googleUserData);
  };

  const handleFacebookLogin = () => {
    alert("Facebook login initiated");
    const facebookUserData = {
      provider: 'Facebook',
      email: 'user@facebook.com',
    };
    handleLoginRequest(facebookUserData);
  };

  const handleLoginRequest = async (userData) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        onLogin(data);
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      provider: 'Manual',
      email,
      password,
    };
    handleLoginRequest(userData);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit}>
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

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-medium shadow-md hover:from-green-600 hover:to-green-700 transition-colors mb-6"
        >
          Login
        </button>
      </form>

      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-3 text-gray-500 font-semibold">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full bg-white text-gray-700 border border-gray-300 py-2 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg hover:bg-gray-100 transition mb-4"
      >
        <FaGoogle className="mr-3 text-red-500" /> Continue with Google
      </button>

      <button
        onClick={handleFacebookLogin}
        className="w-full bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center shadow-md hover:bg-blue-800 transition"
      >
        <FaFacebook className="mr-3 text-white" /> Continue with Facebook
      </button>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
