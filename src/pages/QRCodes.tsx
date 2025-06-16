import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { QrCodeCard } from '../components/QrCodeCard';

// Definimos o "schema" do nosso formulário de criação de QR Code
const createQrCodeSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }),
  targetUrl: z.string().url({ message: 'Por favor, insira uma URL válida.' })
});

// O tipo dos dados do formulário é inferido a partir do schema
type CreateQrCodeData = z.infer<typeof createQrCodeSchema>;

// Dados Falsos (Mock) para simular o que virá do banco de dados
const mockQrCodes = [
  { id: 1, name: 'Feedback Mesa 01', scans: 102, createdAt: '10/06/2025' },
  { id: 2, name: 'Evento de Lançamento', scans: 874, createdAt: '05/06/2025' },
  { id: 3, name: 'Recepção Hotel', scans: 34, createdAt: '01/06/2025' },
  { id: 4, name: 'Cardápio Digital', scans: 450, createdAt: '28/05/2025' },
];

export function QRCodes() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CreateQrCodeData>({
    resolver: zodResolver(createQrCodeSchema),
  });

  function handleCreateQrCode(data: CreateQrCodeData) {
    console.log(data);
    // Aqui você integraria com o Supabase para salvar o novo QR Code
    setShowCreateForm(false); // Esconde o formulário após a criação
  }

  return (
    <div>
      {/* Cabeçalho da Página */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center justify-center gap-2 bg-lemon text-gray-dark font-bold py-2 px-4 rounded-lg hover:bg-lemon-dark transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>{showCreateForm ? 'Cancelar' : 'Novo QR Code'}</span>
        </button>

        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-dark dark:text-light">
            Meus QR Codes
          </h1>
          <p className="text-gray-medium dark:text-gray-light/80 mt-1">
            Gerencie, edite e veja as estatísticas dos seus QR Codes.
          </p>
        </div>
      </div>

      {/* Formulário de Criação (condicional) */}
      {showCreateForm && (
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-dark dark:text-light mb-4">Criar Novo QR Code</h2>
          <form
            onSubmit={handleSubmit(handleCreateQrCode)}
            className="flex flex-col gap-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-medium dark:text-gray-light/80 mb-1">
                Nome do QR Code
              </label>
              <input
                id="name"
                type="text"
                className="w-full bg-white dark:bg-gray-dark border border-gray-light dark:border-lilas-4/30 rounded-md p-2"
                {...register('name')}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-medium dark:text-gray-light/80 mb-1">
                URL de Destino
              </label>
              <input
                id="targetUrl"
                type="url"
                placeholder="https://exemplo.com"
                className="w-full bg-white dark:bg-gray-dark border border-gray-light dark:border-lilas-4/30 rounded-md p-2"
                {...register('targetUrl' )}
              />
              {errors.targetUrl && <p className="text-red-500 text-sm mt-1">{errors.targetUrl.message}</p>}
            </div>

            <button
              type="submit"
              className="mt-4 self-start bg-lemon text-gray-dark font-bold py-2 px-6 rounded-lg hover:bg-lemon-dark transition-colors"
            >
              Salvar QR Code
            </button>
          </form>
        </div>
      )}

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
  );
}
