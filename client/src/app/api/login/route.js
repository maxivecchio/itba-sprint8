import { NextResponse } from 'next/server';
import users from '@/db/users.json';

export async function POST(request) {
    const { username, password } = await request.json();

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const response = NextResponse.json({ message: 'Login successful', user});

        response.headers.set('Set-Cookie', `user=${JSON.stringify(user)}; Path=/; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; Max-Age=86400`);

        return response;
    } else {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
}
