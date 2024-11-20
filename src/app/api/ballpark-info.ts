'use client'

import { createSupabaseBrowserClient } from "../lib/client/supabase"

export const getBallparkInfo = async(id:string)=>{
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.from('ballpark-info').select('*').eq('id',id);

    return result.data
}