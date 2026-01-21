import { BRAND_VOICE } from '@/lib/brand-config';

export function ProductDescription() {
  return (
    <div className='prose prose-lg max-w-none'>
      <p className='text-lg text-gray-700 leading-relaxed'>
        This ultra-premium, organic extra virgin olive oil is crafted from 100% Arbequina olives, grown organically in the USA. Though Arbequina olives originated in Spain, our oil is a celebration of both heritage and quality.
      </p>
      <p className='text-lg text-gray-700 leading-relaxed mt-4'>
        Named in honor of our grandmother Angelica, this is the olive oil she used to bring her dishes to life. With each drizzle, transform your meals and evoke the spirit of togetherness that comes from sharing food with loved ones.
      </p>
      <p className='text-lg text-gray-700 leading-relaxed mt-4'>
        The Arbequina variety is known for its smooth, fruity flavor, making it the perfect finishing touch for any dish. Whether over fresh salads, roasted vegetables, or grilled meats, our olive oil elevates the taste experience.
      </p>
      <p className='text-lg text-gray-700 leading-relaxed mt-4 font-semibold'>
        {BRAND_VOICE.productCharacteristics.process}
      </p>
      <p className='text-lg text-gray-700 leading-relaxed mt-4'>
        Salud!
      </p>
    </div>
  );
}