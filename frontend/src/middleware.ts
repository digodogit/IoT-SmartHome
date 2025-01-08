import { auth } from '@/lib/auth';
import axios from 'axios';

import { NextResponse, NextRequest } from 'next/server';

export default auth(async function middleware(req) {
	const { nextUrl } = req;
	const x = req.auth;

	const isProtectedRoute = nextUrl.pathname.startsWith('/dashboard');
	// redirect to signin if on a protected route and user is not authenticated
	if (isProtectedRoute && !req.auth?.accessToken) {
		return NextResponse.redirect(new URL('/login', nextUrl));
	}
	if (!isProtectedRoute && req.auth?.accessToken) {
		return NextResponse.redirect(new URL('/dashboard', nextUrl));
	}
	return NextResponse.next();
});

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
