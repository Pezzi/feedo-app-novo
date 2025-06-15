// src/routes/index.tsx

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { Dashboard } from '../pages/Dashboard'
import { MyQrCodesPage } from '../pages/MyQrCodes'
// 1. Importe a nova página de criação
import { CreateQrCodePage } from '../pages/CreateQrCode'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/qr-codes" element={<MyQrCodesPage />} />
          {/* 2. Adicione a nova rota aqui */}
          <Route path="/qr-codes/new" element={<CreateQrCodePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}