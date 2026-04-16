import { LoginForm } from "@workspace/ui/components/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { useState } from "react";
import { ACCESS_TOKEN_KEY } from "@/const";

export default function LoginPage() {
    const [site, setSite] = useState<"admin" | "client">("admin");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting login form for site:", e.currentTarget);
        const formData = new FormData(e.currentTarget);
        const user = formData.get("username") as string;
        const password = formData.get("password") as string;

        console.log(user, password, site);

        // Set fake access token to localStorage
        localStorage.setItem(ACCESS_TOKEN_KEY, "fake-access-token-12345");
        ("/");

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
                                <LoginForm onSubmit={handleSubmit} />
                            </TabsContent>

                            <TabsContent value="client" className="mt-6">
                                <LoginForm onSubmit={handleSubmit} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

            <div className="relative hidden bg-muted lg:block">
                <img
                    alt="Login"
                    src="https://plus.unsplash.com/premium_photo-1677343210638-5d3ce6ddbf85?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
