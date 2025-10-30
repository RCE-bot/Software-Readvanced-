// src/services/auth.ts
const API_BASE = "http://localhost:5000/api";

export interface User {
    id: number;
    username: string;
}

export async function logoutUser() {
    const res = await fetch(`/api/logout`, {
        method: "POST",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Logout failed");
    return res.text();
}

export async function login(username: string, password: string): Promise<User> {
    const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Invalid username or password");
    }

    const data = await res.json();
    localStorage.setItem("auth", JSON.stringify({ id: data.id, username: data.username }));
    return data;
}

export async function register(username: string, password: string): Promise<User> {
    const res = await fetch(`/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Registration failed");
    }

    const data = await res.json();
    localStorage.setItem("auth", JSON.stringify({ id: data.id, username: data.username }));
    return data;
}

export async function getCurrentUser(): Promise<User | null> {
    const res = await fetch(`/api/@me`, { credentials: "include" });
    if (res.status === 401) return null;
    if (!res.ok) return null;
    return res.json();
}

export async function logout(): Promise<void> {
    await fetch(`/api/logout`, {
        method: "POST",
        credentials: "include",
    });
    localStorage.removeItem("auth");
}

export function isAuthedLocally(): boolean {
    return !!localStorage.getItem("auth");
}
