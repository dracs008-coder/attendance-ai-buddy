import PageHeader from "../../components/common/PageHeader";
import Logo from "../../components/common/Logo";

const ResetPassword = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="container mx-auto flex justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="text-center">
          <Logo className="mx-auto mb-3" />
          <PageHeader
          title="Reset password"
          subtitle="Design the recovery flow now; plug it into the real API later."
        />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Account email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Send reset link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
