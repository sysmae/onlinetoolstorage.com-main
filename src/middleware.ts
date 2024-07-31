import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  if (
    req.nextUrl.locale === 'default' ||
    (req.nextUrl.locale !== 'ko' && req.nextUrl.locale !== 'en')
  ) {
    let locale = req.cookies.get('NEXT_LOCALE')?.value || 'ko' // default locale

    // If the locale is not valid, set the default locale
    if (locale !== 'ko' && locale !== 'en') {
      locale = 'ko'
    }

    const response = NextResponse.redirect(
      new URL(
        `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
        req.url,
      ),
    )

    // Set the cookie in the response
    response.cookies.set('NEXT_LOCALE', locale)

    return response
  }
}
