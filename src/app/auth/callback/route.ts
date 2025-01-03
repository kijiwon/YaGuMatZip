import { createServerSideClient } from '@/app/utils/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

console.log('>>code', code);
console.log('>>>next', next);

if (code) {
    const supabase =await createServerSideClient();

    const {  error } =await supabase.auth.exchangeCodeForSession(code);

    console.log('>>error',error)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) { 
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    };
  }


  return NextResponse.redirect(`${origin}/auth`);
}