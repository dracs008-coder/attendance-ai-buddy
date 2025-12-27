import { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../../../components/auth/AuthCard";
import Logo from "../../../components/common/Logo";
import SocialButton from "../../../components/auth/SocialButton";
import Input from "../../../components/auth/Input";
import toast from "react-hot-toast";

export default function CustomerSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Fake auth demo delay
    setTimeout(() => {
      toast.success("Signed in (demo)");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <AuthCard>
        <div className="mb-6 text-center">
          <Logo className="mx-auto mb-3" />
          <h1 className="text-2xl font-semibold">Customer Login</h1>
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/auth/customer/sign-up" className="text-blue-600 underline">
              Sign up
            </Link>
          </p>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <SocialButton provider="google" full={true} />
            <SocialButton provider="github" full={true} />
          </div>
          <div className="relative flex items-center justify-center">
            <hr className="flex-1 border-gray-200" />
            <span className="mx-2 text-xs text-gray-500 uppercase">or sign in with email</span>
            <hr className="flex-1 border-gray-200" />
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="relative">
            <Input
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              aria-label="Toggle password visibility"
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setShowPwd(s => !s)}
            >
              {showPwd ? "🙈" : "👁"}
            </button>
          </div>
                    <button type="submit" className="btn-primary w-full" disabled={loading || !email || !password}>
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>
        <div className="space-y-2 text-center mt-6 text-sm">
          <Link to="/auth/reset-password" className="text-blue-600 underline">
            Forgot your password?
          </Link>
          <p>
            New here?{' '}
            <Link to="/auth/customer/sign-up" className="text-blue-600 underline">Create account</Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}
