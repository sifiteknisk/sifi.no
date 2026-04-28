import PdfPreview from '../components/PdfReview';

const Siifra = () => {
  return (
    <div className="w-full py-6 md:py-8">
      <div className="surface-panel p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left">
          Varsling i SIFI
        </h1>
        <p className="text-center md:text-left text-sm md:text-base max-w-2xl mb-5 text-slate-700 dark:text-gray-300">
        I SIFI ønsker vi å ivareta alle studenter ved vår linjeforening.
              Dersom du opplever noe upassende kan du kontakte leder eller
              nestleder av SIFI. Under kan du se en varslingsplakat med mer
              utfyllende informasjon.
        </p>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 items-start">
          <article className="surface-card p-3">
            <h2 className="text-lg md:text-xl font-semibold mb-1">Varslingsplakat</h2>
            <div className="w-full max-w-[430px] mx-auto">
              <PdfPreview pdfUrl="Varslingsplakat_sifi.pdf"></PdfPreview>
            </div>
          </article>

          <article className="surface-card p-3">
            <h2 className="text-lg md:text-xl font-semibold mb-1">Etiske retningslinjer</h2>
            <div className="w-full max-w-[430px] mx-auto">
              <PdfPreview pdfUrl="Etiske_retningslinjer_for_SIFI.pdf"></PdfPreview>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Siifra;
