import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    // Token yoksa KESİNLİKLE logine şutla
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}