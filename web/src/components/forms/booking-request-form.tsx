"use client";

import { FormEvent, useState } from "react";

type FormState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

const initialState: FormState = {
  status: "idle",
  message: "",
};

export function BookingRequestForm() {
  const [state, setState] = useState<FormState>(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading", message: "Enviando solicitud..." });

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      preferredDate: String(formData.get("preferredDate") ?? ""),
      painArea: String(formData.get("painArea") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    };

    try {
      const response = await fetch("/api/booking-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState({
          status: "error",
          message: result.message ?? "No se pudo enviar la solicitud.",
        });
        return;
      }

      setState({
        status: "success",
        message: result.message ?? "Solicitud enviada correctamente.",
      });
      form.reset();
    } catch {
      setState({
        status: "error",
        message: "No se pudo enviar la solicitud. Inténtalo de nuevo.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs tracking-[0.24em] uppercase text-teal-700">Solicitud asistida</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">Si no ves horario en Google, te contactamos</h2>
      </div>

      <label className="grid gap-1 text-sm text-slate-700">
        Nombre completo
        <input required name="fullName" className="rounded-xl border border-slate-300 px-3 py-2" />
      </label>

      <label className="grid gap-1 text-sm text-slate-700">
        Correo
        <input required type="email" name="email" className="rounded-xl border border-slate-300 px-3 py-2" />
      </label>

      <label className="grid gap-1 text-sm text-slate-700">
        Teléfono (opcional)
        <input name="phone" className="rounded-xl border border-slate-300 px-3 py-2" />
      </label>

      <label className="grid gap-1 text-sm text-slate-700">
        Fecha aproximada
        <input type="date" name="preferredDate" className="rounded-xl border border-slate-300 px-3 py-2" />
      </label>

      <label className="grid gap-1 text-sm text-slate-700">
        Zona o motivo principal
        <input required name="painArea" className="rounded-xl border border-slate-300 px-3 py-2" />
      </label>

      <label className="grid gap-1 text-sm text-slate-700">
        Comentarios
        <textarea name="notes" rows={4} className="rounded-xl border border-slate-300 px-3 py-2" />
      </label>

      <button
        type="submit"
        disabled={state.status === "loading"}
        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state.status === "loading" ? "Enviando..." : "Enviar solicitud"}
      </button>

      {state.message && (
        <p className={`text-sm ${state.status === "success" ? "text-emerald-700" : "text-rose-700"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
