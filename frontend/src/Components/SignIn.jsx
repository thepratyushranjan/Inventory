import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { loginValidation } from "../helper/validate";
import { loginUser, sendPassword } from "../helper/helper";

const SignIn = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const loginPromise = loginUser(values);

        toast.promise(loginPromise, {
          loading: "Logging in...",
          success: <b>Login Successful!</b>,
          error: <b>Invalid email or password.</b>,
        });

        const res = await loginPromise;
        const { token } = res;
        localStorage.setItem("refreshToken", token.refresh);
        localStorage.setItem("accessToken", token.access);
        onLogin();
        navigate("/dashboard");
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
  });

  const handleForgotPassword = async () => {
    const email = formik.values.email;
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      const response = await sendPassword({ email });
      toast.success("Password reset link sent to your email.");
    } catch (error) {
      console.error("Error sending password reset link:", error);
      toast.error("Failed to send password reset link. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-pink-500">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="w-full max-w-md p-8 shadow-lg rounded-2xl bg-white bg-opacity-90">
        <div className="flex justify-center mb-6">
          <img 
            src="/src/assets/DevPOSLogo.webp"
            alt="Instagram Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome To Geneverse</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...formik.getFieldProps("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...formik.getFieldProps("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200">
            Sign In
          </button>
        </form>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;