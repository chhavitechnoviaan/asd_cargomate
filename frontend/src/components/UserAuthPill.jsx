import Logo from "./Logo";

export default function UserAuthPill({ onSignUp, onLogIn }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm bg-white rounded-full shadow-md px-4 sm:px-5 py-3 flex flex-col items-center gap-1">
        <div className="w-full flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2 text-sm font-semibold">
            <button onClick={onSignUp} className="text-gray-700">
              Sign Up
            </button>
            <span className="text-gray-300">|</span>
            <button onClick={onLogIn} className="text-blue-600">
              Log In
            </button>
          </div>
        </div>
        <span className="mt-1 text-xs font-semibold text-gray-500 border border-gray-200 rounded-full px-3 py-0.5">
          User
        </span>
      </div>
    </div>
  );
}
