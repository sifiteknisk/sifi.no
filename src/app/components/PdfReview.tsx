'use client';

type PdfPreviewProps = {
  pdfUrl: string;
};

const PdfPreview = ({ pdfUrl }: PdfPreviewProps) => {
  return (
    <div className="mt-2 w-full">
      <a
        href={pdfUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block mb-2 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Åpne i ny fane
      </a>
      <iframe
        className="w-full h-[60vh] min-h-[520px] rounded-md border border-gray-300 dark:border-gray-600 bg-white"
        src={`${pdfUrl}#view=FitV&toolbar=1&navpanes=0`}
        title="PDF Preview"
      />
    </div>
  );
};

export default PdfPreview;
