import { login as loginUser, signup as signupUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, UserRound, Eye, EyeOff } from "lucide-react";
import { Logo, Button, Card } from "../components/ui";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Field({
  label,
  type = "text",
  icon: Icon,
  placeholder,
  name,
  value,
  onChange,
  showPassword,
  setShowPassword,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </span>
      <span className="flex items-center gap-3 rounded-xl border bg-white px-3.5 py-3 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-indigo-600 dark:focus-within:ring-indigo-950">
        <Icon size={18} className="text-slate-400 dark:text-slate-500" />
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-sm outline-none dark:text-white dark:placeholder-slate-500"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </span>
    </label>
  );
}

function Auth({ signup = false }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { loadUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (signup) {
        if (signup && formData.password !== formData.confirmPassword) {
          return toast.error("Passwords do not match");
        }
        await signupUser(formData);
        navigate("/login");
      } else {
        const data = await loginUser(formData);
        localStorage.setItem("token", data.token);
        await loadUser();
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid email or password");
    }
  };
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,.45),transparent_45%)]" />
        <div className="relative">
          <Logo light />
        </div>
        <div className="relative my-auto max-w-lg">
          <p className="text-sm font-semibold text-indigo-300">
            VOICE INTELLIGENCE, SIMPLIFIED
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight">
            Every conversation holds an idea worth keeping.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Capture it, understand it, and act on it—all in one beautifully
            simple workspace.
          </p>
        </div>
        <p className="relative text-xs text-slate-500">
          Trusted by focused teams and lifelong learners.
        </p>
      </section>
      <main className="relative flex items-center justify-center bg-slate-50 px-5 py-12 dark:bg-slate-900">
        <Link
          to="/"
          className="absolute left-6 top-6 flex items-center gap-2 text-sm text-slate-500 hover:text-brand dark:text-slate-400 dark:hover:text-indigo-400 transition-all duration-100"
        >
          <ArrowLeft size={16} /> Back home
        </Link>
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <Card className="p-7 sm:p-9">
            <h2 className="text-2xl font-bold dark:text-white">
              {signup ? "Create your account" : "Welcome back"}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {signup
                ? "Start turning speech into insight today."
                : "Sign in to continue to VoiceScribe AI."}
            </p>
            <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
              {signup && (
                <Field
                  label="Full Name"
                  name="name"
                  icon={UserRound}
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              )}
              <Field
                label="Email"
                name="email"
                icon={Mail}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              <Field
                label="Password"
                type="password"
                name="password"
                icon={Lock}
                placeholder="********"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                value={formData.password}
                onChange={handleChange}
              />
              {signup && (
                <Field
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  icon={Lock}
                  placeholder="********"
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              )}
              <Button type="submit" className="mt-2 w-full py-3">
                {signup ? "Create Account" : "Log in"}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              {signup ? "Already have an account?" : "New to VoiceScribe?"}{" "}
              <Link
                className="font-semibold text-brand hover:underline dark:text-indigo-400"
                to={signup ? "/login" : "/signup"}
              >
                {signup ? "Log in" : "Create Account"}
              </Link>
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
export const LoginPage = () => <Auth />;
export const SignupPage = () => <Auth signup />;
