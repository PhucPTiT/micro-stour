import { RegisterForm } from "@workspace/ui/components/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { useState } from "react";
import { ACCESS_TOKEN_KEY } from "@/const";

export default function RegisterPage() {
    const [site, setSite] = useState<"admin" | "client">("admin");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitting register form for site:", site);

        const formData = new FormData(e.currentTarget);

        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        console.log({ username, email, password, confirmPassword, site });

        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match!");
            return;
        }

        // Fake register success
        localStorage.setItem(ACCESS_TOKEN_KEY, "fake-access-token-12345");

        window.location.replace("/");
    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-sm">
                        <Tabs
                            defaultValue="admin"
                            onValueChange={(value) => setSite(value as "admin" | "client")}
                            className="w-full"
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger className="py-0" value="admin">
                                    Admin Portal
                                </TabsTrigger>
                                <TabsTrigger className="py-0" value="client">
                                    Stour Client
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="admin" className="mt-6">
                                <RegisterForm onSubmit={handleSubmit} />
                            </TabsContent>

                            <TabsContent value="client" className="mt-6">
                                <RegisterForm onSubmit={handleSubmit} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

            <div className="relative hidden bg-muted lg:block">
                <img
                    alt="Register"
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
