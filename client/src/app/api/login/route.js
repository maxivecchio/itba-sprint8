import { NextResponse } from 'next/server';

export async function POST(request) {
    const { username, password } = await request.json();

    try {
        const apiResponse = await fetch('http://localhost:8000/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (apiResponse.ok) {
            const data = await apiResponse.json();

            const response = NextResponse.json({ message: 'Login successful', user: data });

            response.headers.set(
                'Set-Cookie',
                `user=${JSON.stringify(data)}; Path=/; HttpOnly; Secure=${
                    process.env.NODE_ENV === 'production'
                }; Max-Age=86400`
            );

            return response;
        } else {
            const errorData = await apiResponse.json();
            return NextResponse.json({ message: errorData.detail || 'Invalid credentials' }, { status: apiResponse.status });
        }
    } catch (error) {
        console.error('Error connecting to the API:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
