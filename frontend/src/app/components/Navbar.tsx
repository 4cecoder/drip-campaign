// components/Navbar.tsx
'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faEnvelope,
    faUsers,
    faTasks,
    faEnvelopeCircleCheck,
    faCogs, faBarsProgress,
} from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-50 shadow-md backdrop-filter backdrop-blur-lg border-t border-gray-700">
            <div className="container mx-auto px-4">
                <div className="flex justify-around items-center py-4">
                    <Link href="/">
                        <div className={`flex flex-col items-center ${
                            pathname === "/" ? "text-blue-500" : "text-white"
                        }`}>
                            <FontAwesomeIcon icon={faHome} className="text-2xl" />
                            <span className="text-xs mt-1">Home</span>
                        </div>
                    </Link>
                    <Link href="/customers">
                        <div className={`flex flex-col items-center ${
                            pathname === "/customers" ? "text-blue-500" : "text-white"
                        }`}>
                            <FontAwesomeIcon icon={faUsers} className="text-2xl" />
                            <span className="text-xs mt-1">Customers</span>
                        </div>
                    </Link>
                    <Link href="/emails">
                        <div className={`flex flex-col items-center ${
                            pathname === "/emails" ? "text-blue-500" : "text-white"
                        }`}>
                            <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
                            <span className="text-xs mt-1">Emails</span>
                        </div>
                    </Link>
                    <Link href="/stages">
                        <div className={`flex flex-col items-center ${
                            pathname === "/stages" ? "text-blue-500" : "text-white"
                        }`}>
                            <FontAwesomeIcon icon={faBarsProgress} className="text-2xl" />
                            <span className="text-xs mt-1">Stages</span>
                        </div>
                    </Link>
                    <Link href="/tasks">
                        <div className={`flex flex-col items-center ${
                            pathname === "/tasks" ? "text-blue-500" : "text-white"
                        }`}>
                            <FontAwesomeIcon icon={faTasks} className="text-2xl" />
                            <span className="text-xs mt-1">Tasks</span>
                        </div>
                    </Link>
                    <Link href="/subscriptions">
                        <div className={`flex flex-col items-center ${
                            pathname === "/subscriptions" ? "text-blue-500" : "text-white"
                        }`}>
                            <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="text-2xl" />
                            <span className="text-xs mt-1">Subscriptions</span>
                        </div>
                    </Link>
                    <Link href="/settings">
                        <div className={`flex flex-col items-center ${
                            pathname === "/settings" ? "text-blue-500" : "text-white"
                        }`}>
                            <FontAwesomeIcon icon={faCogs} className="text-2xl" />
                            <span className="text-xs mt-1">Settings</span>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;