import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AppLayout } from '@/components/layout'
import { ShopDataProvider } from '@/context/ShopDataContext'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import ReceiptPage from '@/pages/receipt/ReceiptPage'
import SalesPage from '@/pages/sales/SalesPage'
import StockPage from '@/pages/stock/StockPage'
import WatchlistPage from '@/pages/watchlist/WatchlistPage'
import { PATHS } from '@/routes/paths'

export default function App() {
  return (
    <ShopDataProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path={PATHS.receipt} element={<ReceiptPage />} />
            <Route path={PATHS.stock} element={<StockPage />} />
            <Route path={PATHS.sales} element={<SalesPage />} />
            <Route path={PATHS.watchlist} element={<WatchlistPage />} />
            <Route path="*" element={<Navigate to={PATHS.home} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ShopDataProvider>
  )
}
