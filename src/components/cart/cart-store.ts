"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  addToCart,
  getCartCount,
  getCartTotal,
  removeFromCart,
  resolveCart,
  sanitizeCart,
  updateQuantity,
  type AddResult,
} from "@/lib/cart";
import type { CartItem, ProductSelection } from "@/lib/types";

// Estado del carrito en memoria, sincronizado con localStorage cuando está disponible.
// Si el almacenamiento falla (modo privado, bloqueado, lleno), el carrito sigue
// funcionando en memoria durante la visita.

const STORAGE_KEY = "forma3d:carrito:v1";
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitizeCart(JSON.parse(raw)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  items = readStorage();
}

function writeStorage(next: CartItem[]) {
  try {
    if (next.length === 0) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Sin almacenamiento disponible: se mantiene solo en memoria.
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function setItems(next: CartItem[]) {
  items = next;
  writeStorage(next);
  emit();
}

function onStorage(event: StorageEvent) {
  // Mantiene sincronizadas varias pestañas abiertas.
  if (event.key !== STORAGE_KEY && event.key !== null) return;
  items = readStorage();
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  ensureLoaded();
  return items;
}

// En el servidor y durante la hidratación el carrito siempre está vacío:
// así el HTML inicial coincide y no hay errores de hidratación.
function getServerSnapshot() {
  return EMPTY;
}

const noopSubscribe = () => () => {};

/** true una vez que el componente se hidrató en el navegador y el carrito guardado ya se leyó. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function useCart() {
  const cartItems = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useHydrated();
  const lines = useMemo(() => resolveCart(cartItems), [cartItems]);

  const add = useCallback(
    (productId: string, selection: ProductSelection, quantity: number): AddResult => {
      ensureLoaded();
      const result = addToCart(items, productId, selection, quantity);
      if (result.ok) setItems(result.items);
      return result;
    },
    [],
  );

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems(updateQuantity(items, key, quantity));
  }, []);

  const remove = useCallback((key: string) => {
    setItems(removeFromCart(items, key));
  }, []);

  const clear = useCallback(() => setItems(EMPTY), []);

  return {
    ready,
    items: cartItems,
    lines,
    count: getCartCount(cartItems),
    total: getCartTotal(lines),
    add,
    setQuantity,
    remove,
    clear,
  };
}
