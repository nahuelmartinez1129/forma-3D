"use client";

import { CircleCheck, Info, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-store";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { BRAND } from "@/config/brand";
import { formatPrice } from "@/lib/format";
import {
  clampQuantity,
  describePersonalization,
  describeVariants,
  emptySelection,
  getUnitPrice,
  MAX_QUANTITY,
  MIN_QUANTITY,
  validateSelection,
} from "@/lib/selection";
import type { Product, ProductSelection } from "@/lib/types";
import { buildProductInquiryMessage } from "@/lib/whatsapp";
import { ColorSelector, OptionSelector, PersonalizationInput, QuantityInput } from "./VariantSelectors";

/** Preselecciona solo cuando hay una única opción disponible; si hay varias, el usuario elige. */
function initialSelection(product: Product): ProductSelection {
  const selection = emptySelection();
  const availableColors = product.colors.filter((color) => color.available);
  if (availableColors.length === 1) selection.colorId = availableColors[0].id;
  for (const option of product.options) {
    const available = option.choices.filter((choice) => choice.available);
    if (available.length === 1) selection.options[option.id] = available[0].id;
  }
  return selection;
}

export function ProductConfigurator({ product }: { product: Product }) {
  const { add } = useCart();
  const [selection, setSelection] = useState<ProductSelection>(() => initialSelection(product));
  const [quantity, setQuantity] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const [added, setAdded] = useState<{ quantity: number } | null>(null);

  const errors = useMemo(() => validateSelection(product, selection), [product, selection]);
  const errorFor = (field: string) => (showErrors ? errors.find((error) => error.field === field)?.message : undefined);
  const unitPrice = getUnitPrice(product, selection);
  const hasPersonalization = product.personalization.length > 0;

  function update(next: ProductSelection) {
    setSelection(next);
    setAdded(null);
  }

  function handleAdd() {
    if (errors.length > 0) {
      setShowErrors(true);
      setAdded(null);
      return;
    }
    const result = add(product.id, selection, quantity);
    if (result.ok) {
      setAdded({ quantity });
      setShowErrors(false);
    } else {
      setShowErrors(true);
    }
  }

  const inquiry = buildProductInquiryMessage(
    product.name,
    describeVariants(product, selection),
    describePersonalization(product, selection),
    BRAND.name,
  );

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        handleAdd();
      }}
      className="space-y-7"
    >
      {product.colors.length > 0 ? (
        <ColorSelector
          colors={product.colors}
          value={selection.colorId}
          onChange={(colorId) => update({ ...selection, colorId })}
          error={errorFor("color")}
        />
      ) : null}

      {product.options.map((option) => (
        <OptionSelector
          key={option.id}
          option={option}
          value={selection.options[option.id]}
          onChange={(choiceId) => update({ ...selection, options: { ...selection.options, [option.id]: choiceId } })}
          error={errorFor(`option:${option.id}`)}
        />
      ))}

      {hasPersonalization ? (
        <div className="space-y-5 rounded-[1.4rem] border border-electric/25 bg-electric/[0.04] p-5">
          <p className="text-sm font-bold text-graphite">Personalización</p>
          {product.personalization.map((field) => (
            <PersonalizationInput
              key={field.id}
              field={field}
              value={selection.personalization[field.id] ?? ""}
              onChange={(value) =>
                update({ ...selection, personalization: { ...selection.personalization, [field.id]: value } })
              }
              error={errorFor(`text:${field.id}`)}
            />
          ))}
          <p className="flex gap-2 text-xs leading-relaxed text-graphite/80">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-dark" />
            El diseño personalizado y su disponibilidad deben confirmarse manualmente con el comercio antes de fabricarse.
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-graphite/10 pt-6">
        <div>
          <p className="text-sm font-bold text-graphite">
            Cantidad
          </p>
          <div className="mt-3">
            <QuantityInput
              value={quantity}
              min={MIN_QUANTITY}
              max={MAX_QUANTITY}
              onChange={(value) => {
                setQuantity(clampQuantity(value));
                setAdded(null);
              }}
            />
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Total estimado</p>
          <p className="font-display text-3xl font-semibold tracking-tight" aria-live="polite">
            {formatPrice(unitPrice * quantity)}
          </p>
          {quantity > 1 ? <p className="text-xs text-ink-muted">{formatPrice(unitPrice)} c/u</p> : null}
        </div>
      </div>

      {showErrors && errors.length > 0 ? (
        <div role="alert" className="rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900">
          <p className="font-bold">Para agregar este producto falta completar:</p>
          <ul className="mt-1 list-inside list-disc">
            {errors.map((error) => (
              <li key={error.field}>{error.message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div role="status" aria-live="polite">
        {added ? (
          <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-mint-soft p-4 text-sm text-graphite sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 font-semibold">
              <CircleCheck aria-hidden="true" className="size-5 text-emerald-700" />
              Agregaste {added.quantity} {added.quantity === 1 ? "unidad" : "unidades"} al carrito.
            </p>
            <Link href="/carrito" className="font-bold text-electric-dark underline underline-offset-4">
              Ver carrito
            </Link>
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button type="submit" className="btn btn-primary w-full">
          <ShoppingBag aria-hidden="true" className="size-5" />
          Agregar al carrito
        </button>
        <WhatsAppLink message={inquiry} label="Consultar por WhatsApp" className="btn btn-whatsapp w-full" />
      </div>
    </form>
  );
}
