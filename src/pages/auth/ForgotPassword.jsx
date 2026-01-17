import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <img src="/menu.svg" className="h-10 mx-auto" />
        <h2 className="text-xl font-semibold mt-4">Forgot Password</h2>
        <p className="text-sm text-gray-500">
          Enter your email to reset password
        </p>
      </div>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Enter email"
          className="w-full border px-3 py-2 rounded"
        />

        <button className="w-full bg-red-500 text-white py-2 rounded font-semibold">
          Send Reset Link
        </button>

        <p className="text-center text-sm">
          Back to{" "}
          <Link to="/signin" className="text-red-500">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
