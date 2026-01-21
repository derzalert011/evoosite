import { BRAND_VOICE } from '@/lib/brand-config';

export function ProductDetails() {
  const { chemicalProfile, tastingNotes } = BRAND_VOICE.productCharacteristics;

  return (
    <div className='space-y-8'>
      {/* Chemical Characteristics */}
      <section>
        <h3 className='text-2xl font-extrabold uppercase text-navy-600 mb-4 tracking-wide'>Chemical Characteristics</h3>
        <p className='text-gray-700 mb-4'>
          {BRAND_VOICE.productCharacteristics.chemicalProfile.benefits.join(' ')}
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div className='p-4 bg-white rounded-lg shadow-sm border border-navy-100'>
            <div className='text-sm text-gray-600 mb-1'>Acidity</div>
            <div className='text-2xl font-bold text-navy-600'>{chemicalProfile.acidity}</div>
            <div className='text-xs text-gray-500 mt-1'>Low acidity level</div>
          </div>
          <div className='p-4 bg-white rounded-lg shadow-sm border border-navy-100'>
            <div className='text-sm text-gray-600 mb-1'>Peroxides</div>
            <div className='text-2xl font-bold text-navy-600'>{chemicalProfile.peroxides}</div>
            <div className='text-xs text-gray-500 mt-1'>meg./kg</div>
          </div>
          <div className='p-4 bg-white rounded-lg shadow-sm border border-navy-100'>
            <div className='text-sm text-gray-600 mb-1'>Polyphenols</div>
            <div className='text-2xl font-bold text-navy-600'>{chemicalProfile.polyphenols}</div>
            <div className='text-xs text-gray-500 mt-1'>High antioxidant content</div>
          </div>
        </div>
      </section>

      {/* Tasting Notes */}
      <section>
        <h3 className='text-2xl font-extrabold uppercase text-navy-600 mb-4 tracking-wide'>Tasting Notes</h3>
        <p className='text-gray-700 mb-2'>{tastingNotes.primary}</p>
        <ul className='list-disc list-inside text-gray-700 space-y-1'>
          {tastingNotes.notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
        <p className='text-gray-700 mt-2'>
          {tastingNotes.texture} with an {tastingNotes.appearance}
        </p>
      </section>
    </div>
  );
}