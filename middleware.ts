import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	publicRoutes: ['/', '/api/webhook', '/api/webhooks(.*)', '/questions/:id', '/tags', '/tags/:id', '/profile/:id', '/community', '/jobs'],
	ignoredRoutes: ['/api/webhook', '/api/webhooks(.*)', '/api/chatgpt'],
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
