import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const signInUrl = new URL(`/sign-in`, req.url)
    await auth.protect({
      // `unauthenticatedUrl` is needed to avoid error: "Unable to find `next-intl` locale because the middleware didn't run on this request"
      unauthenticatedUrl: signInUrl.toString(),
    })
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
