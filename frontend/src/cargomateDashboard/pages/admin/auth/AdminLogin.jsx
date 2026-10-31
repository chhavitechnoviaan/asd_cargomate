import { useState, useRef , useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../../assets/Images/logo.png";
import { FaFacebook, FaArrowLeft, FaLock } from "react-icons/fa";
import { IoCheckmarkCircle,  IoCheckmark } from "react-icons/io5";
import ship3 from '../../../assets/Images/webp/ship3.webp' 
import ship1 from '../../../assets/Images/ship.png' 
import API from "../../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// import {ship1} from '../../../assets/Images/webp/ship3.webp' 

const images = [ship3, ship1, ship3 ]
function ForgetPassword({setTab, Email,  setEmaill}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  

const handleSubmit = async () => {
  if (!email) {
    setError("Email is required");
    return;
  }

  try {
    const res = await API.post("/auth/send-otp", { email });

    setError("");
    setTab("verify");

  } catch (err) {
    setError(err.response?.data?.msg || "Something went wrong");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="flex items-center gap-2 text-gray-600 mb-6 cursor-pointer" onClick={() => setTab("login")}>
          <FaArrowLeft />
          <span>Back</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="logo" className="w-36 mb-5" />

          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            Forget Password?
          </h2>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Enter E-mail Address we’ll send you Reset password code
          </p>

          <div className="w-full mt-6 text-left">
            <label className="text-black font-medium text-sm sm:text-base">
              Email Address
            </label>

            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmaill(e.target.value)
              }}
              placeholder="Enter your registered email"
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-[#0B253F] text-white py-3 rounded-xl font-medium hover:opacity-90"
          >
            Send Reset link
          </button>

          <div className="flex items-center gap-2 text-gray-600 mt-5 cursor-pointer">
            <FaArrowLeft className="text-sm" />
            <span className="text-sm">Back to login</span>
          </div>
        </div>
      </div>
    </div>
  );
}


function VerifyOtp({setTab, Email, setEmaill }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  

const handleSubmit = async () => {
  const enteredOtp = otp.join("");

  if (enteredOtp.length !== 6) {
    setError("Please enter complete OTP");
    return;
  }

  try {
    const res = await API.post("/auth/verify-otp", {
      email: Email,
      otp: enteredOtp,
    });

    setError("");
    setTab("resetPassword");

  } catch (err) {
    setError(err.response?.data?.msg || "Invalid OTP");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="flex items-center gap-2 text-gray-600 mb-6 cursor-pointer" onClick={() => setTab("forget")}>
          <FaArrowLeft />
          <span>Back</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <img
            src={logo}
            alt="logo"
            className="w-36 mb-4"
          />

          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            Verify OTP
          </h2>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            We’ve sent a 6-digit code to your email
          </p>

          <p className="text-blue-600 text-sm mt-1">{Email}</p>

          <div className="flex justify-center gap-2 sm:gap-3 mt-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-10 h-12 sm:w-12 sm:h-14 text-center border rounded-lg text-lg 
                font-semibold outline-none   ${error ? "focus:ring-2 focus:ring-red-500" : 
                  "focus:ring-2 focus:ring-blue-500"}`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-[#0B253F] text-white py-3 rounded-xl font-medium hover:opacity-90"
          >
            Enter Otp
          </button>

          <p className="text-gray-500 text-sm mt-4 cursor-pointer">
            Didn’t Received Code?
          </p>
        </div>
      </div>
    </div>
  );
}

function ResetPassword({setTab, Email}) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
  
    const isLengthValid = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
  
 
    const handleSubmit = async () => {
      if (!password || !confirmPassword) {
        setError("All fields are required");
        return;
      }
    
      try {
        const res = await API.post("/auth/reset-password", {
          email: Email, // 👈 important
          password,
          confirmPassword,
        });
    
        setError("");
        setTab("success");
    
      } catch (err) {
        setError(err.response?.data?.msg || "Reset failed");
      }
    };
  
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center sm:px-4   ">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 sm:p-8">
          
          <div className="flex items-center gap-2 text-gray-600 mb-6 cursor-pointer" onClick={() => setTab("verify")}>
            <FaArrowLeft />
            <span>Back</span>
          </div>
  
          <div className="flex flex-col items-center text-center">
            <img
              src={logo}
              alt="logo"
              className="w-36 sm:mb-5 mb-1"
            />
  
            <h2 className="text-xl sm:text-3xl font-bold text-black">
              Reset Password
            </h2>
  
            <p className="text-gray-500 mt-2 text-xs sm:text-base">
              Create a new secure password for your account
            </p>
  
            <div className="w-full sm:mt-6 mt-2 text-left">
              <label className="text-black font-medium text-xs sm:text-base">
                New Password
              </label>
  
              <div className="flex items-center border rounded-xl mt-2 px-3">
                <FaLock className="text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full sm:px-3 px-2 py-2 sm:py-3 outline-none text-sm sm:text-base"
                />
              </div>
            </div>
  
            <div className="w-full mt-4 text-left">
              <label className="text-black font-medium text-xs sm:text-base">
                Confirm Password
              </label>
  
              <div className="flex items-center border rounded-xl mt-2 px-3">
                <FaLock className="text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full sm:px-3 px-2 py-2 sm:py-3 outline-none text-sm sm:text-base"
                />
              </div>
            </div>
  
            <div className="w-full mt-4 border rounded-xl sm:p-4 p-3 text-left bg-gray-50">
              <p className="text-gray-500 text-[0.7rem] sm:text-sm mb-2">
                Password Requirement:
              </p>
  
              <div className={`flex items-center gap-2 text-[0.7rem] sm:text-xs ${isLengthValid ? "text-green-600" : "text-gray-400"}`}>
                <IoCheckmarkCircle />
                <span>At least 8 characters</span>
              </div>
  
              <div className={`flex items-center gap-2 text-[0.7rem] sm:text-xs mt-1 ${hasUpperCase ? "text-green-600" : "text-gray-400"}`}>
                <IoCheckmarkCircle />
                <span>One uppercase letter</span>
              </div>
  
              <div className={`flex items-center gap-2 text-[0.7rem] sm:text-xs mt-1 ${hasNumber ? "text-green-600" : "text-gray-400"}`}>
                <IoCheckmarkCircle />
                <span>One number</span>
              </div>
            </div>
  
            {error && (
              <p className="text-red-500 text-sm mt-3">{error}</p>
            )}
  
            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-[#0B253F] text-white py-3 rounded-xl font-medium hover:opacity-90"
            >
              Reset password
            </button>
          </div>
        </div>
      </div>
    );
  }

  function PasswordResetSuccess({setTab}) {
    useEffect(() => {
      const timer = setTimeout(() => {
        console.log("Redirect to login");
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          
          <div className="flex items-center gap-2 text-gray-600 mb-3 cursor-pointer" onClick={()=> setTab("resetPassword")}>
            <FaArrowLeft />
            <span>Back</span>
          </div>
  
          <div className="flex flex-col items-center text-center">
            
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#CFE9E5] rounded-full flex items-center justify-center mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center">
                <IoCheckmark className="text-[#1FA97A] text-3xl sm:text-4xl" />
              </div>
            </div>
  
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              Password Reset Successful!
            </h2>
  
            <p className="text-gray-500 mt-3 text-sm sm:text-base leading-relaxed">
              Your password has been reset successfully <br />
              Redirecting to login
            </p>
  
          </div>
        </div>
      </div>
    );
  }



export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const [tab, setTab] = useState("login");
  const [Email , setEmaill] = useState("");
 
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", {
      email,
      password,
      type: "admin"
    });

    // save token
    localStorage.setItem("token", res.data.token);

    // save user (optional)
    localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success("Login Successful ✅");

    setTimeout(() => {
      navigate("/admin-dashboard");
    }, 1500);

  } catch (err) {
    toast.error(err.response?.data?.msg || "Login failed ❌");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100  sm:p-4 md:p-6">

      {( tab === "login") && (
      <div className="w-full sm:max-w-3xl  lg:max-w-4xl xl:max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl  p-5 flex flex-col md:flex-row ">
        {/* Left Panel - Carousel Image */}
        <div
          className="relative flex-shrink-0 w-full md:w-5/12 flex flex-col justify-end rounded-2xl  "
          style={{
            minHeight: "300px",
            minWidth: "300px",
            background:
              `linear-gradient(rgba(10,30,60,0.55), rgba(10,30,60,0.55)),  url(${images[activeDot]}) center/cover no-repeat`,
          }}
        >
          <div className="flex gap-2 justify-center pb-5">
            {[0, 1, 2].map((i) => (
              <button
              key={i}
              onClick={() => setActiveDot(i)}
              className="p-0 border-0 bg-transparent cursor-pointer"
              aria-label={`Slide ${i + 1}`}
            >
              <span
                className="block rounded-full"
                style={{
                  width: 10,
                  height: 10,
                  background: activeDot === i ? "#fff" : "transparent",
                  border: "2px solid rgba(255,255,255,0.85)",
                }}
              />
            </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="max-w-md flex flex-col items-center mx-auto justify-center px-6 py-5 sm:px-5  bg-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} className="w-36 h-14" />
          </div>
          <div> 
          {/* Title */}
          <h1
            className="font-bold text-center mb-1"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#111827" }}
          >
            Internal Team Access
          </h1>
          <p className="text-center text-sm mb-7" style={{ color: "#6b7280" }}>
            Sign in to access admin &amp; operations dashboard
          </p>

          {/* Email Field */}
          <form onSubmit={handleLogin}> 
          <div className="w-full mb-4">
            <label
              className="block font-semibold text-sm mb-2"
              style={{ color: "#111827" }}
            >
              Email / Username
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base"
                style={{ color: "#b0b8c1" }}
              >
                ✉
              </span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
                className="w-full rounded-lg py-3 text-sm bg-white focus:outline-none"
                style={{
                  paddingLeft: "38px",
                  paddingRight: "12px",
                  border: "1.5px solid #e5e7eb",
                  color: "#111827",
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="w-full mb-4">
            <label
              className="block font-semibold text-sm mb-2"
              style={{ color: "#111827" }}
            >
              Password
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base"
                style={{ color: "#b0b8c1" }}
              >
                🔒
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg py-3 text-sm bg-white focus:outline-none"
                style={{
                  paddingLeft: "38px",
                  paddingRight: "12px",
                  border: "1.5px solid #e5e7eb",
                  color: "#111827",
                }}
              />
            </div>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="w-full flex items-center justify-between mb-6">
            <label
              className="flex items-center gap-2 cursor-pointer select-none text-sm"
              style={{ color: "#6b7280" }}
            >
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded"
                style={{ accentColor: "#1a3a5c", width: 15, height: 15 }}
              />
              Remember me
            </label>
            <button
            type="button"
            onClick={() => {
                setTab("forget");
              }}
              className="text-sm font-medium bg-transparent border-0 cursor-pointer"
              style={{ color: "#1a3a5c" }}
            >
              Forget Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            className="w-full py-3 rounded-lg font-semibold text-white text-base transition-opacity hover:opacity-90"
            style={{ background: "#1a3a5c" }}
          >
            Sign in
          </button>
          </form>
          </div>
        </div>
      </div> )}

         {tab === "forget" && <ForgetPassword setTab={setTab} setEmaill={setEmaill} Email={Email} />}

          {tab === "verify" && <VerifyOtp setTab={setTab}  Email={Email} />}

          {tab === "resetPassword" && <ResetPassword setTab={setTab} Email={Email} />}

          {tab === "success" &&  <PasswordResetSuccess setTab={setTab} />}

    </div>
  );
}
