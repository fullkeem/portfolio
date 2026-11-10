'use client';

export function PrintButton({ label = '인쇄 · PDF 저장' }: { label?: string }) {
  return (
    <button type="button" className="button button--ink print-button" onClick={() => window.print()}>
      {label}
    </button>
  );
}
