// src/pages/CreateQrCode.tsx

import { useForm } from 'react-hook-form'
import { z } from 'zod' // Usaremos Zod para validação no futuro, por enquanto só para tipagem
import { zodResolver } from '@hookform/resolvers/zod'

// Definimos o "schema" do nosso formulário
const createQrCodeSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }),
  targetUrl: z.string().url({ message: 'Por favor, insira uma URL válida.' })
})

// O tipo dos dados do formulário é inferido a partir do schema
type CreateQrCodeData = z.infer<typeof createQrCodeSchema>

export function CreateQrCodePage() {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateQrCodeData>({
    resolver: zodResolver(createQrCodeSchema),
  })

  function handleCreateQrCode(data: CreateQrCodeData) {
    // Por enquanto, vamos apenas mostrar os dados no console
    console.log(data)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-dark dark:text-light">
        Criar Novo QR Code
      </h1>

      <form 
        onSubmit={handleSubmit(handleCreateQrCode)} 
        className="mt-8 max-w-2xl flex flex-col gap-4"
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
            {...register('targetUrl')}
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
  )
}