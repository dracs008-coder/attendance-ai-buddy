import AuthCard from "../../../components/auth/AuthCard";
import Logo from "../../../components/common/Logo";
import Input from "../../../components/auth/Input";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminSignIn() {
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Admin signed in (demo)");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <AuthCard className="bg-gray-900 text-white ring-1 ring-primary-600/50">
        <div className="mb-6 text-center">
          <Logo dark className="mx-auto mb-3" />
          <h1 className="text-2xl font-semibold">Admin Technician Login</h1>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="admin@company.dev"
            className="bg-gray-800 text-white placeholder-gray-500"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="relative">
            <Input
              type={showPwd ? "text" : "password"}
              placeholder="admin1234"
              className="bg-gray-800 text-white placeholder-gray-500 pr-10"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              aria-label="Toggle password visibility"
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-200"
              onClick={() => setShowPwd(s => !s)}
            >
              {showPwd ? "🙈" : "👁"}
            </button>
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading || !email || !password}>
            {loading ? "Signing in..." : "Continue"}
          </button>
        <p className="text-xs text-gray-400 mt-2 text-center">Default credentials shown as placeholders; this page is for development only.</p>
        </form>
      </AuthCard>
    </div>
  );
}
