// src/components/ProtectedRoute.tsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../../../../enerflo-server/frontend/src/contexts/AuthContext';
//
// interface ProtectedRouteProps {
//     element: React.ReactElement;
// }
//
// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
//     const { isAuthenticated } = useAuth();
//
//     if (!isAuthenticated) {
//         return <Navigate to="/login" replace={true} />;
//     }
//
//     return element;
// };
//
// export default ProtectedRoute;