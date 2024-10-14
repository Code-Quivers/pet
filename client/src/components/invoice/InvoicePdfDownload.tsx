"use client";

import { getBaseUrl } from "@/helpers/config/envConfig";
import { useState } from "react";

const InvoicePdfDownload = ({ orderId }: { orderId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const downloadInvoicePdf = async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(
        `${getBaseUrl()}/orders/invoice/${orderId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if the response is not ok
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `invoice-${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      setIsError(
        // @ts-ignore
        err?.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={downloadInvoicePdf}
        type="button"
        className="border px-4 bg-slate-50 py-1 rounded-full"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Download PDF"}
      </button>

      {isError && <p className="text-red-500">Error: {isError}</p>}
    </div>
  );
};

export default InvoicePdfDownload;
