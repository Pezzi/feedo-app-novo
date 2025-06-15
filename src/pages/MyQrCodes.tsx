// src/pages/MyQrCodes.tsx

import { QrCodeCard } from "../components/QrCodeCard";
import { Plus } from "lucide-react";

// Dados Falsos (Mock) para simular o que virá do banco de dados
const mockQrCodes = [
  { id: 1, name: 'Feedback Mesa 01', scans: 102, createdAt: '10/06/2025' },
  { id: 2, name: 'Evento de Lançamento', scans: 874, createdAt: '05/06/2025' },
  { id: 3, name: 'Recepção Hotel', scans: 34, createdAt: '01/06/2025' },
  { id: 4, name: 'Cardápio Digital', scans: 450, createdAt: '28/05/2025' },
];

export function MyQrCodesPage() {
  return (
    <div>
      {/* Cabeçalho da Página - A ORDEM DOS ELEMENTOS FOI INVERTIDA AQUI */}
      <div className="flex items-center justify-between mb-8">
        
        {/* 1. O BOTÃO AGORA VEM PRIMEIRO */}
        <button className="flex items-center justify-center gap-2 bg-lemon text-gray-dark font-bold py-2 px-4 rounded-lg hover:bg-lemon-dark transition-colors">
          <Plus className="h-5 w-5" />
          <span>Novo QR Code</span>
        </button>
        
        {/* 2. O TEXTO AGORA VEM DEPOIS, ALINHADO À DIREITA */}
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-dark dark:text-light">
            Meus QR Codes
          </h1>
          <p className="text-gray-medium dark:text-gray-light/80 mt-1">
            Gerencie, edite e veja as estatísticas dos seus QR Codes.
          </p>
        </div>

      </div>

      {/* Grade de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockQrCodes.map(qr => (
          <QrCodeCard 
            key={qr.id}
            name={qr.name}
            scans={qr.scans}
            createdAt={qr.createdAt}
          />
        ))}
      </div>
    </div>
  )
}