import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">
          Create your account
        </h1>
        <p className="text-sm text-slate-500">
          Start organizing tasks, projects, and team workflows.
        </p>
      </div>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Password should be at least 8 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
        })}
        onSubmit={(values) => {
          console.log("register values", values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className="space-y-5">
            <Input
              label="Full name"
              name="name"
              type="text"
              placeholder="Alex Morgan"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name}
            />
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
              placeholder="Create a password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
            />
            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && errors.confirmPassword}
            />
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </Form>
        )}
      </Formik>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-slate-900 hover:text-slate-700"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
