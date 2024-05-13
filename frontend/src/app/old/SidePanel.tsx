// src/components/SidePanel.tsx

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faHome,
//     faEnvelope,
//     // faFileAlt,
//     faTasks,
//     faUsers,
//     faSignInAlt,
//     faSignOutAlt,
//     faBarsProgress,
//     faStream,
//     faBars,
//     faTimes, faCogs,
// } from '@fortawesome/free-solid-svg-icons';
// import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons/faEnvelopeCircleCheck';
//
// interface SidePanelProps {
//     isMobileMenuOpen: boolean;
//     toggleMobileMenu: () => void;
// }
//
// const SidePanel: React.FC<SidePanelProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
//     const location = useLocation();
//
//     const isCurrentPage = (path: string): boolean => {
//         return location.pathname === path;
//     };
//
//     const isLoggedIn = () => {
//         return localStorage.getItem('token') !== null;
//     };
//
//     return (
//         <>
//             <div className="md:hidden fixed top-4 left-4 z-50">
//                 <button
//                     className="text-gray-600 hover:text-blue-500 focus:outline-none"
//                     onClick={toggleMobileMenu}
//                 >
//                     <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="2x" />
//                 </button>
//             </div>
//             <div
//                 className={`w-64 h-screen bg-gray-200 fixed top-0 p-6 transition-transform duration-300 ease-in-out transform ${
//                     isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
//                 } md:translate-x-0 md:left-0`}
//             >
//                 <h2 className="text-2xl font-bold text-blue-800 mb-6 mt-6">Dashboard</h2>
//                 <nav>
//                     <ul className="space-y-4">
//                         {[
//                             { to: '/', icon: faHome, text: 'Home' },
//                             { to: '/customers', icon: faUsers, text: 'Customers' },
//                             { to: '/emails', icon: faEnvelope, text: 'Emails' },
//                             { to: '/stages', icon: faBarsProgress, text: 'Stages' },
//                             { to: '/tasks', icon: faTasks, text: 'Tasks' },
//                             { to: '/subscriptions', icon: faEnvelopeCircleCheck, text: 'Subscriptions' },
//                             { to: '/settings', icon: faCogs, text: 'Settings' },
//                             {
//                                 to: isLoggedIn() ? '/logout' : '/login',
//                                 icon: isLoggedIn() ? faSignOutAlt : faSignInAlt,
//                                 text: isLoggedIn() ? 'Sign Out' : 'Sign In',
//                             },
//                         ].map((link, index) => (
//                             <li key={index}>
//                                 <Link
//                                     to={link.to}
//                                     className={`flex items-center ${
//                                         isCurrentPage(link.to) ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'
//                                     }`}
//                                     onClick={toggleMobileMenu}
//                                 >
//                                     <FontAwesomeIcon icon={link.icon} className="mr-2" /> {link.text}
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>
//             </div>
//         </>
//     );
// };
//
// export default SidePanel;