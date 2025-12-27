import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../../components/auth/AuthCard";
import Input from "../../../components/auth/Input";
import PasswordMeter from "../../../components/auth/PasswordMeter";
import TurnstileWidget from "../../../components/auth/TurnstileWidget";
import OtpInput from "../../../components/auth/OtpInput";
import StepIndicator from "../../../components/auth/StepIndicator";
import useCountdown from "../../../hooks/useCountdown";
import Logo from "../../../components/common/Logo";
import toast from "react-hot-toast";

export default function CustomerSignUp() {
  const navigate = useNavigate();
  // wizard state
  const [step, setStep] = useState(0);

  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const { seconds, start: startCountdown } = useCountdown(30);

  const TOTAL_STEPS = 4;
  const labels = ["Account", "Captcha", "OTP", "Done"];

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  // step 3 verification handler
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
              <Input
                type="text"
                placeholder="First name"
                required
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Last name"
                required
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <PasswordMeter value={password} />
            <Input
              type="password"
              placeholder="Confirm password"
              required
              value={confirm}
              error={confirm && confirm !== password ? "Passwords do not match" : null}
              onChange={e => setConfirm(e.target.value)}
            />
            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" required id="terms" />
              <label htmlFor="terms">I agree to the Terms and Privacy Policy</label>
            </div>
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={!firstName || !lastName || !email || !password || confirm !== password}
            >
              Continue
            </button>
          </form>
        );
      case 1:
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
      case 2:
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-600 text-center">Enter the 6-digit code sent to <strong>{email || "your email"}</strong></p>
            <OtpInput value={otp} onChange={setOtp} />
            <button type="button" className="btn-primary w-full" onClick={handleOtpSubmit}>
              Verify
            </button>
            <button
              type="button"
              className="text-xs text-blue-600 underline mt-2"
              disabled={seconds > 0}
              onClick={() => {
                toast.success("OTP resent (demo)");
                startCountdown();
              }}
            >
              {seconds > 0 ? `Resend code in ${seconds}s` : "Resend code"}
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-semibold">Account created!</h2>
            <p className="text-gray-600">You may now sign in.</p>
            <button
              type="button"
              className="btn-primary w-full"
              onClick={() => navigate("/auth/customer/sign-in")}
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
          <h1 className="text-2xl font-semibold">Create customer account</h1>
          <p className="text-sm text-gray-600">
            Already registered?{' '}
            <Link to="/auth/customer/sign-in" className="text-blue-600 underline">
              Sign in
            </Link>
          </p>
        </div>
        <StepIndicator current={step + 1} total={TOTAL_STEPS} labels={labels} />
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
