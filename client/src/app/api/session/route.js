import { NextResponse } from 'next/server';

export async function GET(req) {
    const cookies = req.headers.get('cookie');

    if (cookies) {
        const parsedCookies = Object.fromEntries(
            cookies.split('; ').map(c => c.split('='))
        );

        const userCookie = parsedCookies['user'];

        if (userCookie) {
            const user = JSON.parse(decodeURIComponent(userCookie));
            return NextResponse.json({ user });
        }
    }

    return NextResponse.json({ message: 'No active session' }, { status: 401 });
}
