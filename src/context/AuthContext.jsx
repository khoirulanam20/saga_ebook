import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USERS = {
    'admin@saga.id': { id: 1, name: 'Admin SAGA', email: 'admin@saga.id', role: 'admin', password: 'admin123' },
    'user@saga.id': { id: 2, name: 'Budi Santoso', email: 'user@saga.id', role: 'user', password: 'user123' },
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('saga_user');
        if (stored) {
            try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem('saga_user'); }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const found = DEMO_USERS[email];
        if (found && found.password === password) {
            const { password: _, ...userWithoutPass } = found;
            setUser(userWithoutPass);
            localStorage.setItem('saga_user', JSON.stringify(userWithoutPass));
            return { success: true, user: userWithoutPass };
        }
        return { success: false, error: 'Email atau password salah' };
    };

    const register = (name, email, password) => {
        const newUser = { id: Date.now(), name, email, role: 'user' };
        setUser(newUser);
        localStorage.setItem('saga_user', JSON.stringify(newUser));
        return { success: true, user: newUser };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('saga_user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
