"use client";

export function FillTemplatePreview({ html }: { html: string }) {
  return (
    <div className="sm:mockup-window bg-base-100 sm:border border-base-200 mt-4">
      <div className="sm:p-4">
        <iframe
          srcDoc={html}
          className="w-full h-[50vh] border-0"
          title="Vorlage Vorschau"
        />
      </div>
    </div>
  );
}
