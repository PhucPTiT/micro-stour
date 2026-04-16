import { ForgotPasswordForm } from "@workspace/ui/components/forgotpw-form";

export default function ForgotPasswordPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;

        console.log("Forgot password request:", email);

        alert(`Reset link sent to: ${email}`);
    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-sm">
                        <ForgotPasswordForm onSubmit={handleSubmit} />
                    </div>
                </div>
            </div>

            <div className="relative hidden bg-muted lg:block">
                <img
                    alt="Forgot Password"
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
