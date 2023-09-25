'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
    const router = useRouter(); // Create a router object

    // Function to go back to the previous page
    const goBack = () => {
        router.back(); // Use router.back() to navigate back
    };

    return (
        <div className="grid h-screen px-4 bg-white place-content-center">
            <div className="text-center">
                <h1 className="font-black text-gray-200 text-9xl">404</h1>
                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Uh-oh!
                </p>
                <p className="mt-4 text-gray-500">Something when wrong.Please try again later.</p>
                <Button className="mt-3" onClick={goBack}>Go back to previous page</Button>
            </div>
        </div>
    );
};

export default ErrorPage;
