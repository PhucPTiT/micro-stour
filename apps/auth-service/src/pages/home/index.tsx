import { Button } from "@workspace/ui/components/button";
import { ACCESS_TOKEN_KEY } from "@/const";

export default function HomePage() {
    return (
        <div className="flex items-center justify-center">
            <Button
                onClick={() => {
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
                    window.location.replace("/login");
                }}
            >
                Logout
            </Button>
        </div>
    );
}
