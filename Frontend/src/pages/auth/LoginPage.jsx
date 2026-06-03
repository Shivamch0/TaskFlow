import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">
          Sign in to TaskFlow
        </h1>
        <p className="text-sm text-slate-500">
          Enter your credentials to access your workspace.
        </p>
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Password should be at least 8 characters")
            .required("Password is required"),
        })}
        onSubmit={(values) => {
          console.log("login values", values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className="space-y-5">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="hello@taskflow.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
            />
            <div className="flex items-center justify-between text-sm text-slate-500">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="font-semibold text-slate-900 hover:text-slate-700"
              >
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </Form>
        )}
      </Formik>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        New to TaskFlow?{" "}
        <Link
          to="/register"
          className="font-semibold text-slate-900 hover:text-slate-700"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
