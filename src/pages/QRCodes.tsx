import React from 'react';
import { Plus, QrCode as QrCodeIcon, Edit, Trash2, Share, Eye, EyeOff } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

export const QRCodes: React.FC = () => {
  const navigate = useNavigate();

  // Mock data - em produção viria do Supabase
  const qrCodes = [
    {
      id: '1',
      name: 'Loja Shopping Center',
      description: 'QR Code para feedback da loja no shopping',
      url: 'https://feedo.com.br/feedback/loja-shopping',
      isActive: true,
      scans: 245,
      feedbacks: 89,
      createdAt: '2024-01-15',
      colorScheme: '#DDF247'
    },
    {
      id: '2',
      name: 'Restaurante Downtown',
      description: 'Coleta de feedback do atendimento',
      url: 'https://feedo.com.br/feedback/restaurante-downtown',
      isActive: false,
      scans: 156,
      feedbacks: 42,
      createdAt: '2024-01-10',
      colorScheme: '#DDF247'
    },
    {
      id: '3',
      name: 'Evento Tech Conference',
      description: 'Feedback dos participantes do evento',
      url: 'https://feedo.com.br/feedback/tech-conference-2024',
      isActive: true,
      scans: 892,
      feedbacks: 234,
      createdAt: '2024-01-08',
      colorScheme: '#DDF247'
    }
  ];

  const handleToggleStatus = (id: string ) => {
    console.log('Toggle status for QR Code:', id);
  };

  const handleEdit = (id: string) => {
    navigate(`/qr-codes/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log('Delete QR Code:', id);
  };

  const handleShare = (qrCode: any) => {
    navigator.clipboard.writeText(qrCode.url);
    console.log('URL copied to clipboard');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#fff' }}>
            Meus QR Codes
          </h1>
          <p className="mt-2" style={{ color: '#7A798A' }}>
            Gerencie seus QR Codes para coleta de feedback
          </p>
        </div>
        <button
          onClick={() => navigate('/qr-codes/create')}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors"
          style={{ backgroundColor: '#DDF247', color: '#161616' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#c9d63b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#DDF247';
          }}
        >
          <Plus className="h-5 w-5" />
          <span>Novo QR Code</span>
        </button>
      </div>

      {/* Stats Cards - Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          className="p-6 rounded-lg shadow-sm backdrop-blur-md"
          style={{ 
            backgroundColor: 'rgba(26, 26, 26, 0.6)', 
            border: '1px solid rgba(221, 242, 71, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#7A798A' }}>Total QR Codes</p>
              <p className="text-2xl font-bold" style={{ color: '#fff' }}>{qrCodes.length}</p>
            </div>
            <QrCodeIcon className="h-8 w-8" style={{ color: '#DDF247' }} />
          </div>
        </div>

        <div 
          className="p-6 rounded-lg shadow-sm backdrop-blur-md"
          style={{ 
            backgroundColor: 'rgba(26, 26, 26, 0.6)', 
            border: '1px solid rgba(221, 242, 71, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#7A798A' }}>QR Codes Ativos</p>
              <p className="text-2xl font-bold" style={{ color: '#fff' }}>
                {qrCodes.filter(qr => qr.isActive).length}
              </p>
            </div>
            <Eye className="h-8 w-8" style={{ color: '#DDF247' }} />
          </div>
        </div>

        <div 
          className="p-6 rounded-lg shadow-sm backdrop-blur-md"
          style={{ 
            backgroundColor: 'rgba(26, 26, 26, 0.6)', 
            border: '1px solid rgba(221, 242, 71, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#7A798A' }}>Total Scans</p>
              <p className="text-2xl font-bold" style={{ color: '#fff' }}>
                {qrCodes.reduce((acc, qr) => acc + qr.scans, 0)}
              </p>
            </div>
            <Share className="h-8 w-8" style={{ color: '#DDF247' }} />
          </div>
        </div>

        <div 
          className="p-6 rounded-lg shadow-sm backdrop-blur-md"
          style={{ 
            backgroundColor: 'rgba(26, 26, 26, 0.6)', 
            border: '1px solid rgba(221, 242, 71, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#7A798A' }}>Total Feedbacks</p>
              <p className="text-2xl font-bold" style={{ color: '#fff' }}>
                {qrCodes.reduce((acc, qr) => acc + qr.feedbacks, 0)}
              </p>
            </div>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(221, 242, 71, 0.2)' }}>
              <span style={{ color: '#DDF247' }}>💬</span>
            </div>
          </div>
        </div>
      </div>

      {/* QR Codes Grid - Glassmorphism */}
      {qrCodes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qrCodes.map((qrCode) => (
            <div
              key={qrCode.id}
              className="rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg backdrop-blur-md"
              style={{ 
                backgroundColor: 'rgba(26, 26, 26, 0.6)', 
                border: '1px solid rgba(221, 242, 71, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(221, 242, 71, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(221, 242, 71, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* QR Code Preview - Background transparente */}
              <div className="p-6 text-center">
                <div className="inline-block p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <QRCodeSVG 
                    value={qrCode.url} 
                    size={120}
                    fgColor="#DDF247"
                    bgColor="transparent"
                    includeMargin={true}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1" style={{ color: '#fff' }}>
                      {qrCode.name}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: '#7A798A' }}>
                      {qrCode.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleStatus(qrCode.id)}
                    className="ml-2"
                  >
                    {qrCode.isActive ? (
                      <Eye className="h-5 w-5" style={{ color: '#DDF247' }} />
                    ) : (
                      <EyeOff className="h-5 w-5" style={{ color: '#7A798A' }} />
                    )}
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold" style={{ color: '#fff' }}>
                      {qrCode.scans}
                    </p>
                    <p className="text-xs" style={{ color: '#7A798A' }}>Scans</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold" style={{ color: '#fff' }}>
                      {qrCode.feedbacks}
                    </p>
                    <p className="text-xs" style={{ color: '#7A798A' }}>Feedbacks</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(42, 42, 42, 0.5)' }}>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium`}
                  style={{
                    backgroundColor: qrCode.isActive ? 'rgba(221, 242, 71, 0.2)' : 'rgba(122, 121, 138, 0.2)',
                    color: qrCode.isActive ? '#DDF247' : '#7A798A'
                  }}>
                    {qrCode.isActive ? 'Ativo' : 'Inativo'}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleShare(qrCode)}
                      className="p-2 transition-colors"
                      style={{ color: '#7A798A' }}
                      title="Compartilhar"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#DDF247';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#7A798A';
                      }}
                    >
                      <Share className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(qrCode.id)}
                      className="p-2 transition-colors"
                      style={{ color: '#7A798A' }}
                      title="Editar"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#DDF247';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#7A798A';
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(qrCode.id)}
                      className="p-2 transition-colors"
                      style={{ color: '#7A798A' }}
                      title="Excluir"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#ef4444';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#7A798A';
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <QrCodeIcon className="h-16 w-16 mx-auto mb-4" style={{ color: '#7A798A' }} />
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#fff' }}>
            Nenhum QR Code criado ainda
          </h3>
          <p className="mb-6" style={{ color: '#7A798A' }}>
            Comece criando seu primeiro QR Code para coletar feedbacks
          </p>
          <button
            onClick={() => navigate('/qr-codes/create')}
            className="px-6 py-3 rounded-lg font-medium transition-colors"
            style={{ backgroundColor: '#DDF247', color: '#161616' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c9d63b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#DDF247';
            }}
          >
            Criar Primeiro QR Code
          </button>
        </div>
      )}
    </div>
  );
};
