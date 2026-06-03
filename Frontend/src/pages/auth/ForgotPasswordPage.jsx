import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">
          Reset your password
        </h1>
        <p className="text-sm text-slate-500">
          Enter your email and we’ll send you a link to reset your password.
        </p>
      </div>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required"),
        })}
        onSubmit={(values) => {
          console.log("forgot password values", values);
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
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </Form>
        )}
      </Formik>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        Remembered your password?{" "}
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

export default ForgotPasswordPage;
