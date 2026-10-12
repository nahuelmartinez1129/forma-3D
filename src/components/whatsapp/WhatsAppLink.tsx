import { MessageCircle, TriangleAlert } from "lucide-react";
import { WHATSAPP_PHONE } from "@/config/brand";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppLinkProps {
  message: string;
  label: string;
  className?: string;
  /** Oculta el aviso de configuración pendiente (por ejemplo, si ya se muestra en otro lugar). */
  hidePendingNotice?: boolean;
}

/**
 * Enlace a WhatsApp con el mensaje codificado. Si el teléfono todavía es el marcador,
 * no genera un enlace inválido: muestra el botón deshabilitado y un aviso.
 */
export function WhatsAppLink({ message, label, className = "btn btn-whatsapp", hidePendingNotice }: WhatsAppLinkProps) {
  const url = buildWhatsAppUrl(WHATSAPP_PHONE, message);

  if (!url) {
    return (
      <div className="flex flex-col gap-2">
        <button type="button" className={className} disabled>
          <MessageCircle aria-hidden="true" className="size-5" />
          {label}
        </button>
        {hidePendingNotice ? null : <WhatsAppPendingNotice />}
      </div>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      <MessageCircle aria-hidden="true" className="size-5" />
      {label}
      <span className="sr-only">(se abre WhatsApp en una pestaña nueva)</span>
    </a>
  );
}

export function WhatsAppPendingNotice() {
  return (
    <p
      className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900"
    >
      <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>
        <strong>Configuración pendiente:</strong> el número de WhatsApp todavía no está definido, por eso el envío está desactivado.
      </span>
    </p>
  );
}
