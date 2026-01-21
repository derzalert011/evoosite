import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import { getProducts } from '@/features/pricing/controllers/get-products';

export async function GET() {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const envCheck = {
      hasUrl: !!supabaseUrl,
      hasAnonKey: !!supabaseAnonKey,
      urlLength: supabaseUrl?.length || 0,
      keyLength: supabaseAnonKey?.length || 0,
    };

    // Test direct Supabase query
    const supabase = await createSupabaseServerClient();
    const { data: directData, error: directError } = await supabase
      .from('products')
      .select('id, name, active')
      .eq('active', true)
      .limit(5);

    // Test getProducts function
    const products = await getProducts();

    return NextResponse.json({
      success: true,
      environment: envCheck,
      directQuery: {
        data: directData,
        error: directError ? {
          message: directError.message,
          code: directError.code,
          details: directError.details,
        } : null,
      },
      getProductsResult: {
        count: products.length,
        products: products.map(p => ({
          id: p.id,
          name: p.name,
          priceCount: p.prices.length,
        })),
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: {
        message: error.message,
        stack: error.stack,
      },
    }, { status: 500 });
  }
}
