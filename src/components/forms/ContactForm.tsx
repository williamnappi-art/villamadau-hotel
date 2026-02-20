'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { clsx } from 'clsx'

const schema = z.object({
  nome: z.string().min(2, 'Inserisci il tuo nome').max(100),
  email: z.string().email('Inserisci un indirizzo email valido'),
  telefono: z.string().optional(),
  checkin: z.string().optional(),
  checkout: z.string().optional(),
  ospiti: z.string().optional(),
  messaggio: z.string().min(10, 'Il messaggio deve essere di almeno 10 caratteri').max(2000),
})

type FormData = z.infer<typeof schema>

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setStatus('sending')
    try {
      const res = await fetch('/api/contatto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (hasError: boolean) =>
    clsx(
      'w-full px-4 py-3 rounded border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30',
      hasError
        ? 'border-red-400 focus:border-red-500'
        : 'border-gray-300 focus:border-primary'
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Nome */}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
            Nome e Cognome <span className="text-red-500">*</span>
          </label>
          <input
            id="nome"
            type="text"
            autoComplete="name"
            {...register('nome')}
            className={inputClass(!!errors.nome)}
          />
          {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
            className={inputClass(!!errors.email)}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Telefono */}
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
            Telefono
          </label>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            {...register('telefono')}
            className={inputClass(false)}
          />
        </div>

        {/* Numero ospiti */}
        <div>
          <label htmlFor="ospiti" className="block text-sm font-medium text-gray-700 mb-1">
            Numero ospiti
          </label>
          <select id="ospiti" {...register('ospiti')} className={inputClass(false)}>
            <option value="">Seleziona</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'ospite' : 'ospiti'}
              </option>
            ))}
          </select>
        </div>

        {/* Check-in */}
        <div>
          <label htmlFor="checkin" className="block text-sm font-medium text-gray-700 mb-1">
            Data arrivo
          </label>
          <input
            id="checkin"
            type="date"
            {...register('checkin')}
            className={inputClass(false)}
          />
        </div>

        {/* Check-out */}
        <div>
          <label htmlFor="checkout" className="block text-sm font-medium text-gray-700 mb-1">
            Data partenza
          </label>
          <input
            id="checkout"
            type="date"
            {...register('checkout')}
            className={inputClass(false)}
          />
        </div>
      </div>

      {/* Messaggio */}
      <div>
        <label htmlFor="messaggio" className="block text-sm font-medium text-gray-700 mb-1">
          Messaggio <span className="text-red-500">*</span>
        </label>
        <textarea
          id="messaggio"
          rows={5}
          {...register('messaggio')}
          className={inputClass(!!errors.messaggio)}
          placeholder="Scrivi qui la tua richiesta..."
        />
        {errors.messaggio && (
          <p className="mt-1 text-xs text-red-500">{errors.messaggio.message}</p>
        )}
      </div>

      {/* Feedback */}
      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded text-sm text-green-800">
          ✓ Messaggio inviato con successo! Vi risponderemo al più presto.
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-sm text-red-800">
          Si è verificato un errore. Riprova o contattaci via email.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto px-10 py-3.5 bg-primary text-white rounded font-semibold text-sm uppercase tracking-wide hover:bg-primary-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Invio in corso...' : 'Invia richiesta'}
      </button>
    </form>
  )
}
