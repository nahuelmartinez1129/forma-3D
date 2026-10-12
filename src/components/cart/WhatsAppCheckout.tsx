"use client";

import { Check, Copy, MessageCircle } from "lucide-react";
import { useState } from "react";
import { WhatsAppPendingNotice } from "@/components/whatsapp/WhatsAppLink";
import { BRAND, WHATSAPP_PHONE } from "@/config/brand";
import type { ResolvedCartLine } from "@/lib/types";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppCheckout({ lines }: { lines: ResolvedCartLine[] }) {
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const message = buildOrderMessage(lines, BRAND.name);
  const url = buildWhatsAppUrl(WHATSAPP_PHONE, message);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-3">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpened(true)}
          className="btn btn-whatsapp w-full"
        >
          <MessageCircle aria-hidden="true" className="size-5" />
          Enviar consulta por WhatsApp
          <span className="sr-only">(se abre WhatsApp en una pestaña nueva)</span>
        </a>
      ) : (
        <>
          <button type="button" disabled className="btn btn-whatsapp w-full">
            <MessageCircle aria-hidden="true" className="size-5" />
            Enviar consulta por WhatsApp
          </button>
          <WhatsAppPendingNotice />
        </>
      )}

      <div role="status" aria-live="polite">
        {opened ? (
          <p className="rounded-xl bg-mint-soft px-3 py-2 text-xs leading-relaxed text-graphite">
            Abrimos WhatsApp con tu consulta. Tu carrito se conserva: podés volver a enviarla o vaciarlo cuando quieras.
            El pedido queda pendiente hasta que el comercio lo confirme.
          </p>
        ) : null}
      </div>

      <details className="group rounded-xl border border-graphite/10 bg-paper">
        <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-semibold text-graphite [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Ver el mensaje que se enviará</span>
          <span className="hidden group-open:inline">Ocultar mensaje</span>
        </summary>
        <div className="border-t border-graphite/10 p-3">
          <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words font-sans text-xs leading-relaxed text-graphite/85">
            {message}
          </pre>
          <button
            type="button"
            onClick={copyMessage}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-graphite/15 px-3 py-1.5 text-xs font-semibold hover:border-graphite/40"
          >
            {copied ? <Check aria-hidden="true" className="size-3.5" /> : <Copy aria-hidden="true" className="size-3.5" />}
            {copied ? "Mensaje copiado" : "Copiar mensaje"}
          </button>
        </div>
      </details>
    </div>
  );
}
