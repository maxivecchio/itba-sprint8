import {NextResponse} from 'next/server';

export async function POST() {
    const response = NextResponse.json({message: 'Logout successful'});

    response.headers.set('Set-Cookie', `user=; Path=/; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; Max-Age=0`);

    return response;
}
