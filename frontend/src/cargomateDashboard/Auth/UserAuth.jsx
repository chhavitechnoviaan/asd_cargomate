import { useState, useRef , useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { BsPerson } from "react-icons/bs";
import logo from "../assets/Images/logo.png";
import { FaFacebook, FaArrowLeft, FaLock } from "react-icons/fa";
import { IoCheckmarkCircle,  IoCheckmark } from "react-icons/io5";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition";

function LoginForm({setTab}) {
  const [showPass, setShowPass] = useState(false);
 
  const [form, setForm] = useState({ email: "", password: "" });
 
  const navigate = useNavigate();

const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", {
      email: form.email,
      password: form.password,
      type: "user"
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success("Login Successful ✅");

    setTimeout(() => {
      navigate("/user-dashboard");
    }, 1500);

  } catch (err) {
    toast.error(err.response?.data?.msg || "Login failed ❌");
  }
};

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={submitHandler}>
        <p className="text-sm text-gray-500 text-center">
          Log In to continue as User
        </p>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Email / Username{" "}
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
            placeholder="Enter Your Email ID"
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
              placeholder="Enter your password"
              className={inputClass + " pr-10"}
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
          <div className="flex items-end  justify-end pb-5">
            {" "}
            <button type="button" className="text-gray-500 text-sm hover:text-[#0A2540]"
             onClick={() => {
                          setTab("forget");
                        }}>
              {" "} 
              Forget password ?
            </button>
          </div>
        </div>
        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors mt-1">
          Log In
        </button>
      </form>
    </div>
  );
}

function SignupForm() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup-user", {
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        captchaToken: "dummy",
      });

      toast.success("Signup Successful ✅");

setTimeout(() => {
  // optional: auto switch to login
}, 1500);

    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed ❌");
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-3">
      <p className="text-sm text-gray-500 text-center">
        Sign Up to continue as User
      </p>

      {/* Name */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Full Name
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
          required
        />
      </div>

      {/* Mobile */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Mobile Number
        </label>
        <input
          type="tel"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          className={inputClass}
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          E-mail ID
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={inputClass + " pr-10"}
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className={inputClass + " pr-10"}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors mt-1"
      >
        Sign Up
      </button>
    </form>
  );
}

function ForgetPassword({setTab, Email,  setEmaill}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }
  
    try {
      await API.post("/auth/send-otp", { email });
  
      setError("");
      setTab("verify");
  
    } catch (err) {
      setError(err.response?.data?.msg || "Error sending OTP");
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

  const handleSubmit = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    if (enteredOtp !== "123456") {
      setError("Invalid OTP");
      return;
    }

    setError("");
    setTab("resetPassword")
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

function ResetPassword({setTab}) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
  
    const isLengthValid = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
  
    const handleSubmit = () => {
      if (!password || !confirmPassword) {
        setError("All fields are required");
        return;
      }
  
      if (!isLengthValid || !hasUpperCase || !hasNumber) {
        setError("Password does not meet requirements");
        return;
      }
  
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    
      setTab("success")
      setError("");
      
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          
          <div className="flex items-center gap-2 text-gray-600 mb-6 cursor-pointer" onClick={() => setTab("verify")}>
            <FaArrowLeft />
            <span>Back</span>
          </div>
  
          <div className="flex flex-col items-center text-center">
            <img
              src={logo}
              alt="logo"
              className="w-36 mb-5"
            />
  
            <h2 className="text-2xl sm:text-3xl font-bold text-black">
              Reset Password
            </h2>
  
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Create a new secure password for your account
            </p>
  
            <div className="w-full mt-6 text-left">
              <label className="text-black font-medium text-sm sm:text-base">
                New Password
              </label>
  
              <div className="flex items-center border rounded-xl mt-2 px-3">
                <FaLock className="text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 outline-none text-sm sm:text-base"
                />
              </div>
            </div>
  
            <div className="w-full mt-4 text-left">
              <label className="text-black font-medium text-sm sm:text-base">
                Confirm Password
              </label>
  
              <div className="flex items-center border rounded-xl mt-2 px-3">
                <FaLock className="text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-3 outline-none text-sm sm:text-base"
                />
              </div>
            </div>
  
            <div className="w-full mt-4 border rounded-xl p-4 text-left bg-gray-50">
              <p className="text-gray-500 text-sm mb-2">
                Password Requirement:
              </p>
  
              <div className={`flex items-center gap-2 text-sm ${isLengthValid ? "text-green-600" : "text-gray-400"}`}>
                <IoCheckmarkCircle />
                <span>At least 8 characters</span>
              </div>
  
              <div className={`flex items-center gap-2 text-sm mt-1 ${hasUpperCase ? "text-green-600" : "text-gray-400"}`}>
                <IoCheckmarkCircle />
                <span>One uppercase letter</span>
              </div>
  
              <div className={`flex items-center gap-2 text-sm mt-1 ${hasNumber ? "text-green-600" : "text-gray-400"}`}>
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
          
          <div className="flex items-center gap-2 text-gray-600 mb-6 cursor-pointer" onClick={()=> setTab("resetPassword")}>
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


export default function UserAuth() {
  const [tab, setTab] = useState("signup");
  const [Email , setEmaill] = useState("");
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 ">
      {(tab === "signup" || tab === "login") && (
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row p-5">
            <div className="w-full md:w-1/2 px-6 sm:px-8 py-8  flex flex-col">
              <div className="flex flex-col items-center mb-5">
                <div className="flex items-center gap-2 mb-4">
                  <img src={logo} className="w-36 h-14" />
                </div>

                <div className="flex bg-gray-100 rounded-xl p-1 w-full max-w-xs">
                  <button
                    onClick={() => setTab("login")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                      tab === "login"
                        ? "bg-white text-gray-900 shadow"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setTab("signup")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                      tab === "signup"
                        ? "bg-gray-900 text-white shadow"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {tab === "login" ? <LoginForm  setTab={setTab}/> : <SignupForm />}

              <div className="mt-4">
                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">
                    or continue with
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="flex justify-center gap-4">
                  <button className="w-11 h-11 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <FcGoogle size={20} />
                  </button>
                  <button className="w-11 h-11 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <FaFacebook size={20} className="text-blue-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:block w-1/2 min-h-64 relative overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-teal-900/10" />
            </div>
          </div>
        </div>
      )}


          {tab === "forget" && <ForgetPassword setTab={setTab} setEmaill={setEmaill} Email={Email} />}

          {tab === "verify" && <VerifyOtp setTab={setTab}  Email={Email} />}

          {tab === "resetPassword" && <ResetPassword setTab={setTab} />}

          {tab === "success" &&  <PasswordResetSuccess setTab={setTab} />}

    </div>
  );
}
