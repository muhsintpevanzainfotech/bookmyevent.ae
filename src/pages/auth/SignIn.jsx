import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_REQUEST } from "../../features/auth/authTypes";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(s => s.auth);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  });

  if (isAuthenticated) navigate("/dashboard");

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <img src="/menu.svg" className="h-10 mx-auto" />
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch({ type: LOGIN_REQUEST, payload: values });
        }}
      >
        <Form className="space-y-4">

          <div>
            <label className="text-sm font-medium">Email</label>
            <Field
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded px-3 py-2 mt-1"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <Field
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded px-3 py-2 mt-1"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex justify-between text-sm">
            <Link to="/forgot-password" className="text-red-500">
              Forgot password?
            </Link>
            <Link to="/signup" className="text-red-500">
              Register here
            </Link>
          </div>

        </Form>
      </Formik>
    </AuthLayout>
  );
}
