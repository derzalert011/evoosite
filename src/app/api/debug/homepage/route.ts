import { NextResponse } from 'next/server';

import { getProducts } from '@/features/pricing/controllers/get-products';
import { productMetadataSchema } from '@/features/pricing/models/product-metadata';
import { BRAND_VOICE } from '@/lib/brand-config';

export async function GET() {
  try {
    console.log('🔍 Testing homepage dependencies...');
    
    // Test 1: Brand config
    console.log('1. Testing brand config...');
    const brandName = BRAND_VOICE.identity.businessName;
    console.log(`   Brand name: ${brandName}`);
    
    // Test 2: Get products
    console.log('2. Testing getProducts...');
    const products = await getProducts();
    console.log(`   Found ${products.length} products`);
    
    // Test 3: Product metadata parsing
    console.log('3. Testing product metadata parsing...');
    const product = products[0];
    let metadata = null;
    if (product) {
      metadata = productMetadataSchema.parse(product.metadata || {});
      console.log(`   Metadata parsed: stockCount=${metadata.stockCount}`);
    }
    
    return NextResponse.json({
      success: true,
      tests: {
        brandConfig: { success: true, brandName },
        getProducts: { success: true, count: products.length },
        metadataParsing: { success: true, metadata },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('❌ Homepage debug error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
