import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers';
import { NextResponse } from 'next/server';


export async function GET(request){
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    if (code){
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({cookies: () => cookieStore})
        await supabase.auth.exchangeCodeForSession(code);
    }
    return NextResponse.redirect(requestUrl.origin)
}