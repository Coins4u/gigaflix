"use client";

import { useCallback, useState } from "react";

type Props = {
  label: string;
  value: string;
  mono?: boolean;
};

export default function CopyableField({ label, value, mono = true }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [value]);

  return (
    <div className="pay-field">
      <div className="pay-field__top">
        <span className="pay-field__label">{label}</span>
        <button type="button" className="pay-field__copy" onClick={onCopy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className={`pay-field__value${mono ? " pay-field__value--mono" : ""}`}>
        {value}
      </p>
    </div>
  );
}
