// getDashboardDateRange.ts

export type DashboardRange = 'default' | 'day' | 'week' | 'month' | 'year'

export interface DateRangeResult {
  start: Date
  end: Date
  granularity: 'hour' | 'day' | 'month'
  label: string
}

export const getDashboardDateRange = (
  range: DashboardRange = 'default',
  anchorDate?: string,
): DateRangeResult => {
  const anchor = anchorDate ? new Date(anchorDate) : new Date()

  switch (range) {
    case 'default': {
      const start = new Date(anchor)
      start.setDate(start.getDate() - 6)
      start.setHours(0, 0, 0, 0)
      const end = new Date(anchor)
      end.setHours(23, 59, 59, 999)
      return { start, end, granularity: 'day', label: 'Last 7 days' }
    }
    case 'day': {
      const start = new Date(anchor)
      start.setHours(0, 0, 0, 0)
      const end = new Date(anchor)
      end.setHours(23, 59, 59, 999)
      const label = anchor.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      return { start, end, granularity: 'hour', label }
    }

    case 'week': {
      const start = new Date(anchor)
      start.setDate(start.getDate() - 6)
      start.setHours(0, 0, 0, 0)
      const end = new Date(anchor)
      end.setHours(23, 59, 59, 999)
      const label = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
      return { start, end, granularity: 'day', label }
    }

    case 'month': {
      const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
      const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0, 23, 59, 59, 999)
      const label = anchor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      return { start, end, granularity: 'day', label }
    }

    case 'year': {
      const start = new Date(anchor.getFullYear(), 0, 1)
      const end = new Date(anchor.getFullYear(), 11, 31, 23, 59, 59, 999)
      const label = `${anchor.getFullYear()}`
      return { start, end, granularity: 'month', label }
    }

    default: {
      const start = new Date(anchor)
      start.setDate(start.getDate() - 6)
      start.setHours(0, 0, 0, 0)
      const end = new Date(anchor)
      end.setHours(23, 59, 59, 999)
      return { start, end, granularity: 'day', label: 'Last 7 days' }
    }
  }
}

export const shiftAnchorDate = (
  anchorDate: string | undefined,
  range: DashboardRange,
  direction: 1 | -1,
): string => {
  const date = anchorDate ? new Date(anchorDate) : new Date()

  switch (range) {
    case 'default':
    case 'week': {
      date.setDate(date.getDate() + direction * 7)
      break
    }
    case 'day': {
      date.setDate(date.getDate() + direction)
      break
    }
    case 'month': {
      date.setMonth(date.getMonth() + direction)
      break
    }
    case 'year': {
      date.setFullYear(date.getFullYear() + direction)
      break
    }
    default: {
      date.setDate(date.getDate() + direction * 7)
      break
    }
  }

  return date.toISOString().split('T')[0]
}

export const bucketLabel = (date: Date, granularity: 'hour' | 'day' | 'month'): string => {
  if (granularity === 'hour') {
    return date.toLocaleTimeString('en-US', { hour: 'numeric' })
  }
  if (granularity === 'month') {
    return date.toLocaleDateString('en-US', { month: 'short' })
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
