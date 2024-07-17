import Link from "next/link";
import { FaUsers, FaEnvelope, FaTasks, FaCogs } from "react-icons/fa";
import { MdOutlineBarChart } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";

export default function Home() {
    return (
        <main className="bg-black min-h-screen text-white px-4 py-8">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Email Drip Campaign Management System
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg">
                        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Features</h2>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/campaigns" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <span className="mr-2 flex items-center justify-center w-6 h-6">
                    <FaUsers />
                  </span>
                                    Campaign Management
                                </Link>
                            </li>
                            <li>
                                <Link href="/emails" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <span className="mr-2 flex items-center justify-center w-6 h-6">
                    <FaEnvelope />
                  </span>
                                    Email Tracking
                                </Link>
                            </li>
                            <li>
                                <Link href="/stages" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <span className="mr-2 flex items-center justify-center w-6 h-6">
                    <MdOutlineBarChart />
                  </span>
                                    Campaign Stages
                                </Link>
                            </li>
                  {/*          <li>*/}
                  {/*              <Link href="/timeline" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">*/}
                  {/*<span className="mr-2 flex items-center justify-center w-6 h-6">*/}
                  {/*  <FontAwesomeIcon icon={faStream} />*/}
                  {/*</span>*/}
                  {/*                  Campaign Timeline*/}
                  {/*              </Link>*/}
                  {/*          </li>*/}
                            <li>
                                <Link href="/tasks" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <span className="mr-2 flex items-center justify-center w-6 h-6">
                    <FaTasks />
                  </span>
                                    Task Tracking
                                </Link>
                            </li>
                            <li>
                                <Link href="/subscriptions" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <span className="mr-2 flex items-center justify-center w-6 h-6">
                    <AiOutlineMail />
                  </span>
                                    Subscription Management
                                </Link>
                            </li>
                            <li>
                                <Link href="/settings" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-200">
                  <span className="mr-2 flex items-center justify-center w-6 h-6">
                    <FaCogs />
                  </span>
                                    System Settings
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg">
                        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Getting Started</h2>
                        <p className="mb-4 text-gray-400">
                            Explore the power of our Email Drip Campaign Management System. Start by managing your customers and creating engaging campaigns.
                        </p>
                        <Link
                            href="/campaigns"
                            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                        >
                            Go to Campaigns
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}