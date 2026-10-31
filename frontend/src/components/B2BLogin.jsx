import { useState } from "react";
import { ArrowLeft, Building2, Eye, EyeOff } from "lucide-react";

export default function B2BLogin({ onBack, onSignUp }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessEmail: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/b2b/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-md p-5 sm:p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-semibold text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex flex-col items-center mt-4">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="mt-3 text-xl font-bold text-gray-900">
            Welcome Back!
          </h1>
          <p className="mt-1 text-sm text-gray-500 text-center">
            Log in into your B2B account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-900">
              Business Email
            </label>
            <input
              type="email"
              name="businessEmail"
              value={formData.businessEmail}
              onChange={handleChange}
              placeholder="Enter Your Business Email"
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300"
              />
              Remember me
            </label>
            <a href="#" className="text-sm text-green-600 font-semibold">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg py-2.5 disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't Have an account?{" "}
          <button onClick={onSignUp} className="text-green-600 font-semibold">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
