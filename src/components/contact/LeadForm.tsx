"use client";

import { useId, useRef, useState } from "react";
import { BoltMark } from "@/components/ui/BoltMark";
import { cn } from "@/lib/cn";
import {
  EMPTY_LEAD,
  PROJECT_TYPES,
  formatWhatsapp,
  isValid,
  validateField,
  validateLead,
  type LeadDraft,
  type LeadErrors,
  type LeadField,
} from "@/lib/lead/schema";
import { HAS_BACKEND, submitLead } from "@/lib/lead/submit";

type FormState = "idle" | "sending" | "done" | "error";

/**
 * The enquiry form.
 *
 * Accessibility notes, since they are the whole reason this is hand-rolled:
 *
 * - Every field has a real `<label>` bound by id, never a placeholder standing
 *   in for one.
 * - Errors are announced through `aria-describedby` + `aria-invalid`, and the
 *   error text lives in the tab order right after its field.
 * - Validation runs on blur and on submit, never on every keystroke, so a
 *   half-typed e-mail is not repeatedly announced as invalid.
 * - On a failed submit, focus moves to the first field with an error.
 * - The result is announced in a live region rather than only shown.
 *
 * Submission goes through `submitLead`, which is deliberately not connected to
 * a real destination yet - see that module.
 */
export const LeadForm = () => {
  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [draft, setDraft] = useState<LeadDraft>(EMPTY_LEAD);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [state, setState] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");

  const fieldId = (field: LeadField): string => `${baseId}-${field}`;
  const errorId = (field: LeadField): string => `${baseId}-${field}-erro`;

  const update = (field: LeadField, value: string): void => {
    setDraft((current) => ({ ...current, [field]: value }));
    // Clear an error as soon as the visitor starts fixing it.
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const blur = (field: LeadField): void => {
    const error = validateField(field, draft[field]);
    setErrors((current) => (error ? { ...current, [field]: error } : current));
  };

  const onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const found = validateLead(draft);
    setErrors(found);

    if (!isValid(found)) {
      setState("error");
      setFeedback("Faltam alguns campos. Confira os destaques abaixo.");
      const first = Object.keys(found)[0] as LeadField | undefined;
      if (first) formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(first))}`)?.focus();
      return;
    }

    setState("sending");
    setFeedback("");

    const outcome = await submitLead(draft);

    if (outcome.status === "failed") {
      setState("error");
      setFeedback(outcome.reason);
      return;
    }

    setState("done");
    setFeedback(
      HAS_BACKEND
        ? `Recebemos a sua mensagem. Referência ${outcome.reference}.`
        : `Mensagem montada (referência ${outcome.reference}). Este formulário ainda não tem destino configurado — fale com a FULL pelo Instagram enquanto isso.`,
    );
  };

  if (state === "done") {
    return (
      <div
        role="status"
        className="border border-bolt-500/40 bg-ink-900 p-8 md:p-12"
      >
        <BoltMark className="h-6 w-4 text-bolt-500" />
        <h3 className="mt-6 text-h3 font-light tracking-[-0.02em] text-paper-50">
          Tudo certo.
        </h3>
        <p className="mt-3 max-w-(--width-measure) text-body text-paper-100/70">
          {feedback}
        </p>
        <button
          type="button"
          onClick={() => {
            setDraft(EMPTY_LEAD);
            setErrors({});
            setState("idle");
            setFeedback("");
          }}
          className="mt-8 border-b border-white/25 pb-1 text-caption uppercase tracking-[0.14em] text-paper-100/80 transition-colors hover:border-bolt-500 hover:text-paper-50"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <Field
          id={fieldId("name")}
          errorId={errorId("name")}
          label="Nome"
          value={draft.name}
          error={errors.name}
          autoComplete="name"
          onChange={(value) => update("name", value)}
          onBlur={() => blur("name")}
        />
        <Field
          id={fieldId("company")}
          errorId={errorId("company")}
          label="Empresa"
          value={draft.company}
          error={errors.company}
          autoComplete="organization"
          onChange={(value) => update("company", value)}
          onBlur={() => blur("company")}
        />
        <Field
          id={fieldId("whatsapp")}
          errorId={errorId("whatsapp")}
          label="WhatsApp"
          value={draft.whatsapp}
          error={errors.whatsapp}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          hint="Com DDD"
          onChange={(value) => update("whatsapp", formatWhatsapp(value))}
          onBlur={() => blur("whatsapp")}
        />
        <Field
          id={fieldId("email")}
          errorId={errorId("email")}
          label="E-mail"
          value={draft.email}
          error={errors.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          onChange={(value) => update("email", value)}
          onBlur={() => blur("email")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={fieldId("projectType")}
          className="text-micro uppercase tracking-[0.18em] text-metal-300"
        >
          Tipo de projeto
        </label>
        <select
          id={fieldId("projectType")}
          value={draft.projectType}
          onChange={(event) => update("projectType", event.target.value)}
          onBlur={() => blur("projectType")}
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={errors.projectType ? errorId("projectType") : undefined}
          className={cn(
            "w-full appearance-none border-b bg-transparent py-3 text-body text-paper-50 transition-colors",
            errors.projectType
              ? "border-bolt-400"
              : "border-white/20 focus:border-bolt-500",
          )}
        >
          <option value="" className="bg-ink-900">
            Selecione
          </option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type} className="bg-ink-900">
              {type}
            </option>
          ))}
        </select>
        <FieldError id={errorId("projectType")} message={errors.projectType} />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={fieldId("message")}
          className="text-micro uppercase tracking-[0.18em] text-metal-300"
        >
          Mensagem
        </label>
        <textarea
          id={fieldId("message")}
          value={draft.message}
          rows={4}
          onChange={(event) => update("message", event.target.value)}
          onBlur={() => blur("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId("message") : undefined}
          placeholder="O que a sua empresa precisa comunicar?"
          className={cn(
            "w-full resize-y border-b bg-transparent py-3 text-body text-paper-50 transition-colors placeholder:text-metal-500",
            errors.message ? "border-bolt-400" : "border-white/20 focus:border-bolt-500",
          )}
        />
        <FieldError id={errorId("message")} message={errors.message} />
      </div>

      {/* Announced whether or not it is visually noticed. */}
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-caption",
          state === "error" ? "text-bolt-400" : "sr-only",
        )}
      >
        {feedback}
      </p>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex items-center gap-4 bg-paper-50 px-8 py-5 text-caption uppercase tracking-[0.14em] text-ink-950 transition-colors duration-300 hover:bg-bolt-500 hover:text-paper-50 disabled:cursor-wait disabled:opacity-60"
        >
          {state === "sending" ? "Enviando…" : "Vamos conversar"}
          <BoltMark className="h-4 w-3 transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>

        {!HAS_BACKEND ? (
          <p className="max-w-[32ch] text-caption text-metal-300">
            Integração de envio pendente de definição pela FULL.
          </p>
        ) : null}
      </div>
    </form>
  );
};

/* -------------------------------------------------------------------------- */

interface FieldProps {
  readonly id: string;
  readonly errorId: string;
  readonly label: string;
  readonly value: string;
  readonly error?: string | undefined;
  readonly type?: string;
  readonly inputMode?: "tel" | "email" | "text";
  readonly autoComplete?: string;
  readonly hint?: string;
  readonly onChange: (value: string) => void;
  readonly onBlur: () => void;
}

const Field = ({
  id,
  errorId,
  label,
  value,
  error,
  type = "text",
  inputMode,
  autoComplete,
  hint,
  onChange,
  onBlur,
}: FieldProps) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor={id}
      className="flex items-baseline gap-2 text-micro uppercase tracking-[0.18em] text-metal-300"
    >
      {label}
      {hint ? <span className="normal-case tracking-normal text-metal-500">{hint}</span> : null}
    </label>
    <input
      id={id}
      type={type}
      inputMode={inputMode}
      autoComplete={autoComplete}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? errorId : undefined}
      className={cn(
        "w-full border-b bg-transparent py-3 text-body text-paper-50 transition-colors",
        error ? "border-bolt-400" : "border-white/20 focus:border-bolt-500",
      )}
    />
    <FieldError id={errorId} message={error} />
  </div>
);

const FieldError = ({
  id,
  message,
}: {
  readonly id: string;
  readonly message?: string | undefined;
}) =>
  message ? (
    <p id={id} className="text-caption text-bolt-400">
      {message}
    </p>
  ) : null;
