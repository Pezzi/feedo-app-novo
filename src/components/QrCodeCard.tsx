// src/components/QrCodeCard.tsx
import { QrCode, BarChart, Edit, Trash2 } from 'lucide-react'

type QrCodeCardProps = {
  name: string;
  scans: number;
  createdAt: string;
}

export function QrCodeCard({ name, scans, createdAt }: QrCodeCardProps) {
  return (
    <div className="bg-white dark:bg-gray-dark dark:border dark:border-lilas-4/30 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col group">
      {/* Seção do Título */}
      <div>
        <div className="flex items-center gap-4">
          <div className="bg-lilas-2 dark:bg-lilas-1 p-3 rounded-lg">
            <QrCode className="h-6 w-6 text-lilas-4 dark:text-lilas-3" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-dark dark:text-light">{name}</h2>
            <p className="text-sm text-gray-medium dark:text-gray-light/70">Criado em: {createdAt}</p>
          </div>
        </div>
      </div>
      
      {/* Seção do Meio (que se estica) */}
      <div className="flex-1 my-6 flex items-center gap-2 text-gray-medium dark:text-gray-light/80">
        <BarChart className="h-5 w-5 text-lemon" />
        <span className="font-bold text-2xl text-gray-dark dark:text-light">{scans}</span>
        <span>scans</span>
      </div>

      {/* Seção de Baixo (rodapé) */}
      <div className="flex items-center gap-2 border-t border-gray-200 dark:border-lilas-4/30 pt-4">
        <button className="flex items-center gap-2 text-sm text-gray-medium dark:text-gray-light/80 hover:text-lemon transition-colors">
            <BarChart className="h-4 w-4" />
            Estatísticas
        </button>
        <div className="flex-grow" /> {/* Espaçador */}
        <button className="p-2 hover:bg-lilas-2 dark:hover:bg-lilas-1 rounded-md transition-colors">
            <Edit className="h-4 w-4 text-gray-medium" />
        </button>
        <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md transition-colors">
            <Trash2 className="h-4 w-4 text-red-500" />
        </button>
      </div>
    </div>
  )
}