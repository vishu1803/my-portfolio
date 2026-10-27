"use client";

import { useLayoutEffect, useRef } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
type DialogEntry = { id: symbol; node: HTMLDivElement; returnFocus: HTMLElement | null };
type IsolationState = { inert: boolean; ariaHidden: string | null };
const dialogs: DialogEntry[] = [];
const isolated = new Map<HTMLElement, IsolationState>();
let originalOverflow: string | null = null;

function focusableElements(node: HTMLElement) {
  return [...node.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((element) =>
    element.tabIndex >= 0 && element.getClientRects().length > 0 &&
    !element.closest('[inert], [aria-hidden="true"]') &&
    getComputedStyle(element).visibility !== "hidden"
  );
}

function focusFirst(node: HTMLDivElement) {
  const close = node.querySelector<HTMLElement>("[data-dialog-close]");
  (close || focusableElements(node)[0] || node).focus({ preventScroll: true });
}

function updateIsolation() {
  // Recalculate from the topmost dialog so nested dialogs never inert themselves.
  isolated.forEach((state, node) => {
    node.inert = state.inert;
    if (state.ariaHidden === null) node.removeAttribute("aria-hidden");
    else node.setAttribute("aria-hidden", state.ariaHidden);
  });
  isolated.clear();
  const top = dialogs[dialogs.length - 1];
  if (!top) return;
  // Old isolation is now cleared, including a newly opened sibling dialog.
  focusFirst(top.node);
  let current: HTMLElement = top.node;
  while (current.parentElement) {
    const parent = current.parentElement;
    for (const sibling of [...parent.children]) {
      if (!(sibling instanceof HTMLElement) || sibling === current ||
          ["SCRIPT", "STYLE", "LINK"].includes(sibling.tagName)) continue;
      isolated.set(sibling, { inert: sibling.inert, ariaHidden: sibling.getAttribute("aria-hidden") });
      sibling.inert = true;
      sibling.setAttribute("aria-hidden", "true");
    }
    if (parent === document.body) break;
    current = parent;
  }
}

/** Attach the ref to the mounted role="dialog" root. Supports nested dialogs. */
export default function useAccessibleDialog(isOpen: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useLayoutEffect(() => {
    const node = dialogRef.current;
    if (!isOpen || !node) return;
    const id = Symbol("dialog");
    const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (dialogs.length === 0) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    dialogs.push({ id, node, returnFocus });
    updateIsolation();
    const frame = requestAnimationFrame(() => {
      if (dialogs[dialogs.length - 1]?.id === id && !node.contains(document.activeElement)) focusFirst(node);
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (dialogs[dialogs.length - 1]?.id !== id) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeRef.current();
      } else if (event.key === "Tab") {
        const controls = focusableElements(node);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first) {
          event.preventDefault();
          node.focus({ preventScroll: true });
        } else if (!node.contains(document.activeElement) ||
          (event.shiftKey && (document.activeElement === first || document.activeElement === node))) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus({ preventScroll: true });
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus({ preventScroll: true });
        }
      }
    };
    const handleFocus = (event: FocusEvent) => {
      if (dialogs[dialogs.length - 1]?.id === id &&
          event.target instanceof Node && !node.contains(event.target)) focusFirst(node);
    };
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("focusin", handleFocus, true);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("focusin", handleFocus, true);
      const index = dialogs.findIndex((entry) => entry.id === id);
      const wasTop = index === dialogs.length - 1;
      if (index !== -1) dialogs.splice(index, 1);
      updateIsolation();
      if (dialogs.length === 0) {
        document.body.style.overflow = originalOverflow || "";
        originalOverflow = null;
      }
      if (wasTop) {
        const remainingId = dialogs[dialogs.length - 1]?.id;
        queueMicrotask(() => {
          if (dialogs[dialogs.length - 1]?.id !== remainingId) return;
          const top = dialogs[dialogs.length - 1];
          if (returnFocus?.isConnected && !returnFocus.closest("[inert]")) returnFocus.focus({preventScroll:true});
          else if (top) focusFirst(top.node);
        });
      }
    };
  }, [isOpen]);

  return dialogRef;
}