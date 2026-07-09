"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

/**
 * The one conversion form, used for both contact-sales and the demo
 * request. Inline validation appears on blur, never while typing. The
 * success state echoes the company name back. No marketing-consent
 * checkbox wall.
 */

const interests = [
  "The whole platform",
  "Identity Resolution",
  "AmpAI and agents",
  "Activation and journeys",
  "Pricing and Amps",
];

type Field = "name" | "email" | "company" | "interest";

export function DemoForm({ reassurance }: { reassurance: string }) {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    company: "",
    interest: interests[0],
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (field: Field, value: string): string | undefined => {
    if (field === "email") {
      if (!value) return "Work email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid work email.";
    }
    if (field === "name" && !value) return "Name is required.";
    if (field === "company" && !value) return "Company is required.";
    return undefined;
  };

  const set = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const blur = (field: Field) => {
    const err = validate(field, values[field]);
    setErrors((e) => ({ ...e, [field]: err }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Field, string>> = {};
    (["name", "email", "company"] as Field[]).forEach((f) => {
      const err = validate(f, values[f]);
      if (err) next[f] = err;
    });
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-card border border-gray-200 p-8 shadow-card">
        <div className="flex h-12 w-12 items-center justify-center rounded-pill bg-chartreuse">
          <Icon name="check" size={24} className="text-black" />
        </div>
        <h3 className="mt-6 font-display text-h3 font-medium text-gray-900">
          Thanks. We will be in touch about {values.company}.
        </h3>
        <p className="mt-4 max-w-measure text-body text-gray-600">
          A member of the team will reach out to set up a working session on
          your data, your stack, and your team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-card border border-gray-200 p-8 shadow-card">
      <div className="space-y-6">
        <TextField
          id="df-name"
          label="Name"
          value={values.name}
          error={errors.name}
          onChange={(v) => set("name", v)}
          onBlur={() => blur("name")}
          autoComplete="name"
        />
        <TextField
          id="df-email"
          label="Work email"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={(v) => set("email", v)}
          onBlur={() => blur("email")}
          autoComplete="email"
        />
        <TextField
          id="df-company"
          label="Company"
          value={values.company}
          error={errors.company}
          onChange={(v) => set("company", v)}
          onBlur={() => blur("company")}
          autoComplete="organization"
        />
        <div>
          <label htmlFor="df-interest" className="font-mono text-eyebrow uppercase text-gray-500">
            What do you want to see?
          </label>
          <select
            id="df-interest"
            value={values.interest}
            onChange={(e) => set("interest", e.target.value)}
            className="mt-2 min-h-12 w-full rounded-card border border-gray-300 bg-white px-4 text-body text-gray-900 focus:border-chartreuse focus:outline-none"
          >
            {interests.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-pill bg-chartreuse px-8 text-body font-medium text-black transition duration-micro ease-out-quad hover:bg-gray-900 hover:text-white active:scale-98"
      >
        Request a demo
        <Icon name="arrow-right" size={16} />
      </button>
      <p className="mt-4 text-body-sm text-gray-500">{reassurance}</p>
    </form>
  );
}

function TextField({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-eyebrow uppercase text-gray-500">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`mt-2 min-h-12 w-full rounded-card border bg-white px-4 text-body text-gray-900 transition-colors duration-micro ease-out-quad focus:outline-none ${
          error ? "border-gray-900" : "border-gray-300 focus:border-chartreuse"
        }`}
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-body-sm text-gray-900">
          {error}
        </p>
      )}
    </div>
  );
}
