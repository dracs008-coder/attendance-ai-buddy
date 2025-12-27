import React from 'react'
import { FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

export type RequestStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | string

interface RequestStatusBadgeProps {
  status: RequestStatus
  className?: string
}

export function RequestStatusBadge({ status, className = '' }: RequestStatusBadgeProps) {
  const normalized = (status || '').toLowerCase()

  const config: Record<string, { label: string; bg: string; text: string; Icon?: React.ComponentType<any> }> = {
    pending: {
      label: 'Pending',
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      Icon: FiClock,
    },
    accepted: {
      label: 'Accepted',
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      Icon: FiClock,
    },
    in_progress: {
      label: 'In Progress',
      bg: 'bg-indigo-100',
      text: 'text-indigo-800',
      Icon: FiClock,
    },
    completed: {
      label: 'Completed',
      bg: 'bg-green-100',
      text: 'text-green-800',
      Icon: FiCheckCircle,
    },
    cancelled: {
      label: 'Cancelled',
      bg: 'bg-red-100',
      text: 'text-red-800',
      Icon: FiAlertCircle,
    },
  }

  const cfg = config[normalized] || config.pending
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

export default RequestStatusBadge
