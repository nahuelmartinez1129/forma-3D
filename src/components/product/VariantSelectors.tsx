"use client";

import { Check } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { ColorChoice, PersonalizationField, ProductOption } from "@/lib/types";

interface FieldProps {
  error?: string;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-semibold text-orange-700">
      {message}
    </p>
  );
}

export function ColorSelector({
  colors,
  value,
  onChange,
  error,
}: FieldProps & { colors: ColorChoice[]; value: string | null; onChange: (id: string) => void }) {
  const selected = colors.find((color) => color.id === value);
  return (
    <fieldset aria-describedby={error ? "error-color" : undefined}>
      <legend className="text-sm font-bold text-graphite">
        Color <span className="font-medium text-ink-muted">· {selected ? selected.name : "elegí una opción"}</span>
      </legend>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {colors.map((color) => {
          const checked = color.id === value;
          return (
            <label
              key={color.id}
              title={color.available ? color.name : `${color.name} (no disponible)`}
              className={`relative flex size-12 items-center justify-center rounded-full border-2 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-electric ${
                checked ? "border-electric" : "border-transparent"
              } ${color.available ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
              <input
                type="radio"
                name="color"
                value={color.id}
                checked={checked}
                disabled={!color.available}
                onChange={() => onChange(color.id)}
                className="sr-only"
                aria-label={color.available ? color.name : `${color.name}, no disponible`}
              />
              <span
                aria-hidden="true"
                className={`relative flex size-9 items-center justify-center overflow-hidden rounded-full border border-graphite/15 ${color.available ? "" : "opacity-45"}`}
                style={{ backgroundColor: color.hex }}
              >
                {!color.available ? <span className="absolute h-[1.5px] w-12 -rotate-45 bg-graphite/70" /> : null}
                {checked ? <Check className={`size-4 ${isLight(color.hex) ? "text-graphite" : "text-white"}`} strokeWidth={3} /> : null}
              </span>
            </label>
          );
        })}
      </div>
      {colors.some((color) => !color.available) ? (
        <p className="mt-2 text-xs text-ink-muted">Los colores tachados no están disponibles por el momento.</p>
      ) : null}
      <FieldError id="error-color" message={error} />
    </fieldset>
  );
}

export function OptionSelector({
  option,
  value,
  onChange,
  error,
}: FieldProps & { option: ProductOption; value: string | undefined; onChange: (choiceId: string) => void }) {
  const errorId = `error-${option.id}`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="text-sm font-bold text-graphite">
        {option.label}
        {option.required ? <span className="sr-only"> (obligatorio)</span> : null}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {option.choices.map((choice) => {
          const checked = choice.id === value;
          return (
            <label
              key={choice.id}
              className={`relative flex min-h-12 items-center gap-2 rounded-2xl border-2 px-4 py-2 text-sm transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-electric ${
                !choice.available
                  ? "cursor-not-allowed border-dashed border-graphite/15 bg-mist/50 text-graphite/45"
                  : checked
                    ? "cursor-pointer border-electric bg-electric/5 text-graphite"
                    : "cursor-pointer border-graphite/12 bg-white text-graphite hover:border-graphite/35"
              }`}
            >
              <input
                type="radio"
                name={`opcion-${option.id}`}
                value={choice.id}
                checked={checked}
                disabled={!choice.available}
                onChange={() => onChange(choice.id)}
                className="sr-only"
              />
              <span className={`font-semibold ${choice.available ? "" : "line-through"}`}>{choice.label}</span>
              {choice.priceDelta ? (
                <span className="text-xs text-ink-muted">+{formatPrice(choice.priceDelta)}</span>
              ) : null}
              {!choice.available ? <span className="text-xs font-semibold">· No disponible</span> : null}
            </label>
          );
        })}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

export function PersonalizationInput({
  field,
  value,
  onChange,
  error,
}: FieldProps & { field: PersonalizationField; value: string; onChange: (value: string) => void }) {
  const inputId = `personalizacion-${field.id}`;
  const helpId = `${inputId}-ayuda`;
  const errorId = `${inputId}-error`;
  const describedBy = [field.helpText ? helpId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
  const common = {
    id: inputId,
    value,
    maxLength: field.maxLength,
    placeholder: field.placeholder,
    required: field.required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: "field",
  } as const;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={inputId} className="text-sm font-bold text-graphite">
          {field.label}
          {field.required ? <span aria-hidden="true" className="text-electric"> *</span> : null}
        </label>
        <span aria-hidden="true" className="text-xs tabular-nums text-ink-muted">
          {value.length}/{field.maxLength}
        </span>
      </div>
      <div className="mt-2">
        {field.multiline ? (
          <textarea {...common} rows={3} onChange={(event) => onChange(event.target.value)} />
        ) : (
          <input {...common} type="text" autoComplete="off" onChange={(event) => onChange(event.target.value)} />
        )}
      </div>
      {field.helpText ? (
        <p id={helpId} className="mt-1.5 text-xs text-ink-muted">
          {field.helpText}
        </p>
      ) : null}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function QuantityInput({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="inline-flex h-12 items-center rounded-full border-2 border-graphite/12 bg-white">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Restar una unidad"
        className="flex size-11 items-center justify-center rounded-full text-lg font-bold text-graphite disabled:text-graphite/25"
      >
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        aria-label="Cantidad"
        onChange={(event) => {
          const next = Number.parseInt(event.target.value, 10);
          onChange(Number.isNaN(next) ? min : next);
        }}
        className="w-10 bg-transparent text-center font-display font-semibold tabular-nums [appearance:textfield] focus-visible:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Sumar una unidad"
        className="flex size-11 items-center justify-center rounded-full text-lg font-bold text-graphite disabled:text-graphite/25"
      >
        +
      </button>
    </div>
  );
}

function isLight(hex: string): boolean {
  const value = Number.parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 160;
}
