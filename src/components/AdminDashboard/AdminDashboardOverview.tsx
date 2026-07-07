import { getPayload } from 'payload'
import config from '@payload-config'
import './AdminDashboardOverview.scss'
import { RevenueChart } from './RevenueChart'
import { CategoryDonut } from './CategoryDonut'
import { DashboardRangeFilter } from './DashboardRangeFilter'
import { ProductCategorySearch } from './ProductCategorySearch'
import { getDashboardDateRange, bucketLabel, type DashboardRange } from './getDashboardDateRange'

export const AdminDashboardOverview = async (props: any) => {
  console.log('Dashboard props keys:', Object.keys(props || {}))

  const payload = await getPayload({ config })

  let range: DashboardRange = 'week'
  let anchorDate: string | undefined

  if (props?.searchParams) {
    range = (props.searchParams.range as DashboardRange) || 'week'
    anchorDate = props.searchParams.date
  } else if (props?.req?.url) {
    try {
      const url = new URL(props.req.url, 'http://localhost')
      range = (url.searchParams.get('range') as DashboardRange) || 'week'
      anchorDate = url.searchParams.get('date') || undefined
    } catch {
      // keep defaults
    }
  }

  const { start, end, granularity, label } = getDashboardDateRange(range, anchorDate)

  const [orders, products, customers] = await Promise.all([
    payload.find({
      collection: 'orders',
      where: {
        createdAt: {
          greater_than_equal: start.toISOString(),
          less_than_equal: end.toISOString(),
        },
      },
      limit: 1000,
    }),
    payload.find({
      collection: 'products',
      limit: 1000,
    }),
    payload.find({
      collection: 'customers',
      where: {
        createdAt: {
          greater_than_equal: start.toISOString(),
          less_than_equal: end.toISOString(),
        },
      },
      limit: 1000,
    }),
  ])

  const revenue = orders.docs.reduce((sum, order: any) => sum + (order.total || 0), 0)
  const lowStockCount = products.docs.filter((p: any) => p.stock < 10).length

  const categoryTotals: Record<string, number> = {}
  for (const order of orders.docs as any[]) {
    for (const item of order.items || []) {
      const category =
        typeof item.product === 'object' && item.product?.category
          ? typeof item.product.category === 'object'
            ? item.product.category.name
            : item.product.category
          : 'Other'
      categoryTotals[category] =
        (categoryTotals[category] || 0) + (item.priceAtOrder || 0) * (item.quantity || 1)
    }
  }

  const revenueByBucket: Record<string, number> = {}
  for (const order of orders.docs as any[]) {
    const orderDate = new Date(order.createdAt)
    const key = bucketLabel(orderDate, granularity)
    revenueByBucket[key] = (revenueByBucket[key] || 0) + (order.total || 0)
  }

  return (
    <div className="onyx-dashboard">
      <div className="onyx-dashboard__header">
        <div>
          <h2>Dashboard overview</h2>
          <p className="onyx-dashboard__subtitle">{label}</p>
        </div>
        <ProductCategorySearch />
      </div>

      <div className="onyx-dashboard__filter-row">
        <DashboardRangeFilter />
      </div>

      <div className="onyx-dashboard__metrics">
        <div className="onyx-metric-card">
          <span className="onyx-metric-card__label">Revenue</span>
          <span className="onyx-metric-card__value">${revenue.toLocaleString()}</span>
        </div>
        <div className="onyx-metric-card">
          <span className="onyx-metric-card__label">Orders</span>
          <span className="onyx-metric-card__value">{orders.totalDocs}</span>
        </div>
        <div className="onyx-metric-card">
          <span className="onyx-metric-card__label">New customers</span>
          <span className="onyx-metric-card__value">{customers.totalDocs}</span>
        </div>
        <div className="onyx-metric-card onyx-metric-card--warning">
          <span className="onyx-metric-card__label">Low stock (below 10)</span>
          <span className="onyx-metric-card__value">{lowStockCount}</span>
        </div>
      </div>

      <div className="onyx-dashboard__charts">
        <div className="onyx-chart-card">
          <span className="onyx-chart-card__title">Revenue trend</span>
          <RevenueChart data={revenueByBucket} />
        </div>
        <div className="onyx-chart-card">
          <span className="onyx-chart-card__title">Sales by category</span>
          <CategoryDonut data={categoryTotals} />
        </div>
      </div>
    </div>
  )
}
