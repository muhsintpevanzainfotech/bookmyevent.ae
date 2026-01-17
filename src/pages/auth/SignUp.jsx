import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER_REQUEST } from "../../features/auth/authTypes";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(s => s.auth);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    phone: Yup.string().required("Phone required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6, "Min 6 characters").required("Password required"),
  });

  if (isAuthenticated) navigate("/dashboard");

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <img src="/menu.svg" className="h-10 mx-auto" />
      </div>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch({ type: REGISTER_REQUEST, payload: values });
        }}
      >
        <Form className="space-y-4">

          <Field name="firstName" placeholder="First Name" className="w-full border px-3 py-2 rounded" />
          <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />

          <Field name="lastName" placeholder="Last Name" className="w-full border px-3 py-2 rounded" />
          <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />

          <Field name="phone" placeholder="Phone" className="w-full border px-3 py-2 rounded" />
          <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />

          <Field name="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

          <Field name="password" type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded font-semibold"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-red-500">
              Login
            </Link>
          </p>

        </Form>
      </Formik>
    </AuthLayout>
  );
}
