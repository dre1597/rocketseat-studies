import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  //check auth or other things
  // return new Response('Hello, world!');
  // return NextResponse.next();
  return NextResponse.redirect('http://localhost:3000/');
}
