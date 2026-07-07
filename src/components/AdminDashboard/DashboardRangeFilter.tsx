'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { shiftAnchorDate, type DashboardRange } from './getDashboardDateRange'
import './DashboardRangeFilter.scss'

const OPTIONS: { value: DashboardRange; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
]

export const DashboardRangeFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeRange = (searchParams.get('range') as DashboardRange) || 'default'
  const activeDate = searchParams.get('date') || ''

  const pushParams = (range: DashboardRange, date?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('range', range)
    if (date) {
      params.set('date', date)
    } else {
      params.delete('date')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleRangeChange = (range: DashboardRange) => {
    pushParams(range, activeDate || undefined)
  }

  const handleDateChange = (value: string) => {
    pushParams(activeRange, value)
  }

  const handleShift = (direction: 1 | -1) => {
    const newDate = shiftAnchorDate(activeDate || undefined, activeRange, direction)
    pushParams(activeRange, newDate)
  }

  return (
    <div className="onyx-range-filter">
      <label className="onyx-range-filter__group">
        <span className="onyx-range-filter__label">View by</span>
        <select
          className="onyx-range-filter__select"
          value={activeRange}
          onChange={(e) => handleRangeChange(e.target.value as DashboardRange)}
        >
          {OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="onyx-range-filter__group">
        <span className="onyx-range-filter__label">Date</span>
        <input
          type="date"
          className="onyx-range-filter__date"
          value={activeDate}
          onChange={(e) => handleDateChange(e.target.value)}
        />
      </label>

      <div className="onyx-range-filter__nav">
        <button
          type="button"
          className="onyx-range-filter__nav-btn"
          onClick={() => handleShift(-1)}
          aria-label="Previous period"
        >
          ‹ Prev
        </button>
        <button
          type="button"
          className="onyx-range-filter__nav-btn"
          onClick={() => handleShift(1)}
          aria-label="Next period"
        >
          Next ›
        </button>
      </div>
    </div>
  )
}
