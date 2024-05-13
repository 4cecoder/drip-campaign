import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faEnvelope,
    faTasks,
    faStream,
    faBarsProgress,
    faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons/faEnvelopeCircleCheck";

export default function Home() {
    return (
        <main className="bg-black min-h-screen text-white px-4 py-8">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">
                    Email Drip Campaign Management System
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-900 rounded-lg p-6 shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Features</h2>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/customers" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <span className="mr-2 flex items-center justify-center w-6 h-6">
                    <FontAwesomeIcon icon={faUsers} />
                  </span>
                                    Customer Management
                                </Link>
                            </li>
                            <li>
                                <Link href="/emails" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <span className="mr-2 flex items-center justify-center w-6 h-6">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                                    Email Tracking
                                </Link>
                            </li>
                            <li>
                                <Link href="/stages" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <span className="mr-2 flex items-center justify-center w-6 h-6">
                    <FontAwesomeIcon icon={faBarsProgress} />
                  </span>
                                    Campaign Stages
                                </Link>
                            </li>
                            <li>
                                <Link href="/timeline" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <span className="mr-2 flex items-center justify-center w-6 h-6">
                    <FontAwesomeIcon icon={faStream} />
                  </span>
                                    Campaign Timeline
                                </Link>
                            </li>
                            <li>
                                <Link href="/tasks" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <span className="mr-2 flex items-center justify-center w-6 h-6">
                    <FontAwesomeIcon icon={faTasks} />
                  </span>
                                    Task Tracking
                                </Link>
                            </li>
                            <li>
                                <Link href="/subscriptions" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <span className="mr-2 flex items-center justify-center w-6 h-6">
                    <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
                  </span>
                                    Subscription Management
                                </Link>
                            </li>
                            <li>
                                <Link href="/settings" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <span className="mr-2 flex items-center justify-center w-6 h-6">
                    <FontAwesomeIcon icon={faCogs} />
                  </span>
                                    System Settings
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-6 shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                        <p className="mb-4 text-gray-400">
                            Explore the power of our Email Drip Campaign Management System. Start by managing your customers and creating engaging campaigns.
                        </p>
                        <Link
                            href="/customers"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                        >
                            Go to Customers
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}