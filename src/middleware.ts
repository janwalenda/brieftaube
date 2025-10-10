import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from "next/server";
 
let locales = ['en', 'de']
 
//Get the preferred locale, similar to the above or using a library
function getLocale() {
    let headers = { 'accept-language': 'en-US,en;q=0.5' }
    let languages = new Negotiator({ headers }).languages()
    let locales = ['en', 'de']
    let defaultLocale = 'en'

    return match(languages, locales, defaultLocale) // -> 'en-US'
}
 
export function middleware(request: NextRequest) {
  // Check if there are any public files that should be ignored
  // e.g. /favicon.ico, /robots.txt
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  console.log(pathname)

  if(pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico') || pathname.startsWith('/robots.txt')) {
    return NextResponse.next()
  }

  if (pathnameHasLocale) return


 
  // Redirect if there is no locale
  const locale = getLocale()
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}