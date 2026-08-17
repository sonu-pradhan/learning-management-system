import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isCheckingAuth } = useSelector(store => store.auth);

    if (isCheckingAuth) {
        return <h1 className="mt-24">Loading...</h1>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children;
}
export const AuthenticatedUser = ({ children }) => {
    const { isAuthenticated } = useSelector(store => store.auth);

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return children;
}

export const AdminRoute = ({ children }) => {
    const { user, isAuthenticated, isCheckingAuth } = useSelector(store => store.auth);

    if (isCheckingAuth) {
        return <h1>Loading...</h1>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (user?.role !== "instructor") {
        return <Navigate to="/" />
    }

    return children;
}