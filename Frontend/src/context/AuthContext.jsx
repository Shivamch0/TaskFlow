import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_USER } from '../data/initialData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Check if user is logged in
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      //! Local Storage
      const user = window.localStorage.getItem('taskflow_user');
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  });

  // Keep list of registered users in Local Storage (simulated user database)
  const [users, setUsers] = useState(() => {
    try {
      //! Local Storage
      const list = window.localStorage.getItem('taskflow_users_db');
      if (list) {
        return JSON.parse(list);
      } else {
        const initialUsers = [DEFAULT_USER];
        //! Local Storage
        window.localStorage.setItem('taskflow_users_db', JSON.stringify(initialUsers));
        return initialUsers;
      }
    } catch (e) {
      console.error(e);
      return [DEFAULT_USER];
    }
  });

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setCurrentUser(foundUser);
      //! Local Storage
      window.localStorage.setItem('taskflow_user', JSON.stringify(foundUser));
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const register = (name, email, password) => {
    const userExists = users.some(u => u.email === email);
    if (userExists) {
      return { success: false, message: "Email is already registered" };
    }

    const newUser = {
      name,
      email,
      password,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    //! Local Storage
    window.localStorage.setItem('taskflow_users_db', JSON.stringify(updatedUsers));

    // Log the user in immediately
    setCurrentUser(newUser);
    //! Local Storage
    window.localStorage.setItem('taskflow_user', JSON.stringify(newUser));

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    //! Local Storage
    window.localStorage.removeItem('taskflow_user');
  };

  const updateProfile = (name, avatarUrl) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, name, avatar: avatarUrl || currentUser.avatar };
    
    // Update currentUser state & localStorage
    setCurrentUser(updatedUser);
    //! Local Storage
    window.localStorage.setItem('taskflow_user', JSON.stringify(updatedUser));

    // Update users database
    const updatedUsers = users.map(u => u.email === currentUser.email ? { ...u, name, avatar: avatarUrl || u.avatar } : u);
    setUsers(updatedUsers);
    //! Local Storage
    window.localStorage.setItem('taskflow_users_db', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
