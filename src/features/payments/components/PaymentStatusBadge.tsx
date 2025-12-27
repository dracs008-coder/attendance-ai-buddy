import React from 'react'
import { FiDollarSign, FiClock } from 'react-icons/fi'

export type PaymentStatus = 'unpaid' | 'awaiting_verification' | 'paid' | 'not_due' | string | null | undefined

interface PaymentStatusBadgeProps {
  status: PaymentStatus
  className?: string
}

export function PaymentStatusBadge({ status, className = '' }: PaymentStatusBadgeProps) {
  const normalized = (status || '').toLowerCase()

  if (!normalized || normalized === 'not_due') return null

  const config: Record<string, { label: string; bg: string; text: string; Icon?: React.ComponentType<any> }> = {
    unpaid: {
      label: 'Unpaid',
      bg: 'bg-red-100',
      text: 'text-red-800',
      Icon: FiDollarSign,
    },
    awaiting_verification: {
      label: 'Awaiting verification',
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      Icon: FiClock,
    },
    paid: {
      label: 'Paid',
      bg: 'bg-green-100',
      text: 'text-green-800',
      Icon: FiDollarSign,
    },
  }

  const cfg = config[normalized] || config.unpaid
  const Icon = cfg.Icon

  return (
    <span
      className={`status-badge inline-flex items-center gap-1 ${cfg.bg} ${cfg.text} ${className}`.trim()}
    >
      {Icon && <Icon className="w-3 h-3" />}
      <span>{cfg.label}</span>
    </span>
  )
}

export default PaymentStatusBadge
