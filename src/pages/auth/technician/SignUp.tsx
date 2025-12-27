import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../../components/auth/AuthCard";
import TurnstileWidget from "../../../components/auth/TurnstileWidget";
import Logo from "../../../components/common/Logo";
import OtpInput from "../../../components/auth/OtpInput";
import StepIndicator from "../../../components/auth/StepIndicator";
import toast from "react-hot-toast";

export default function TechnicianSignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [skill, setSkill] = useState("");
  const [idFileName, setIdFileName] = useState<string | null>(null);
  const [about, setAbout] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  const TOTAL_STEPS = 5; // account, professional info, captcha, otp, success

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const handleOtpSubmit = () => {
    if (otp === "123456") {
      toast.success("Account verified!");
      next();
    } else {
      toast.error("Incorrect code");
    }
  };

  const StepContent = () => {
    switch (step) {
      case 0:
        return (
          <form
            className="space-y-4"
            onSubmit={e => {
              e.preventDefault();
              next();
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                className="input"
                required
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last name"
                className="input"
                required
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="input"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="btn-primary w-full">
              Continue
            </button>
          </form>
        );
      case 1:
        return (
          <form
            className="space-y-4"
            onSubmit={e => {
              e.preventDefault();
              next();
            }}
          >
            <input
              type="tel"
              placeholder="Contact number"
              className="input"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <select
              className="input"
              required
              value={skill}
              onChange={e => setSkill(e.target.value)}
            >
              <option value="" disabled>
                Select skill category
              </option>
              <option value="Electrical">Electrical</option>
              <option value="HVAC">HVAC</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Carpentry">Carpentry</option>
            </select>
            <div>
              <label className="text-sm">Government ID upload (PDF/JPG)</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                onChange={e => setIdFileName(e.target.files?.[0]?.name || null)}
                required
              />
              {idFileName && <p className="text-xs mt-1 text-gray-500">{idFileName}</p>}
            </div>
            <textarea
              rows={3}
              className="input"
              placeholder="About you (optional)"
              value={about}
              onChange={e => setAbout(e.target.value)}
            />
            <button type="submit" className="btn-primary w-full">
              Continue
            </button>
          </form>
        );
      case 2:
        return (
          <div className="space-y-6">
            <TurnstileWidget onVerify={token => {
              setCaptchaToken(token);
              toast.success("Captcha passed");
            }} />
            <button
              type="button"
              className="btn-primary w-full"
              disabled={!captchaToken}
              onClick={next}
            >
              Continue
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-600 text-center">Enter the 6-digit code sent to <strong>{email || "your email"}</strong></p>
            <OtpInput value={otp} onChange={setOtp} />
            <button type="button" className="btn-primary w-full" onClick={handleOtpSubmit}>
              Verify
            </button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-semibold">Application submitted!</h2>
            <p className="text-gray-600">We will review your details and notify you.</p>
            <button
              type="button"
              className="btn-primary w-full"
              onClick={() => navigate("/auth/technician/sign-in")}
            >
              Go to Sign-In
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <AuthCard>
        <div className="mb-6 text-center">
          <Logo className="mx-auto mb-3" />
          <h1 className="text-2xl font-semibold">Technician sign-up</h1>
          <p className="text-sm text-gray-600">
            Already a technician?{' '}
            <Link to="/auth/technician/sign-in" className="text-blue-600 underline">
              Sign in
            </Link>
          </p>
        </div>
        <StepIndicator current={step + 1} total={TOTAL_STEPS} />
        {StepContent()}
        {step > 0 && step < TOTAL_STEPS - 1 && (
          <button type="button" className="text-sm mt-4" onClick={prev}>
            ← Back
          </button>
        )}
      </AuthCard>
    </div>
  );
}
