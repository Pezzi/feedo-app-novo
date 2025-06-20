import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, QrCode as QrCodeIcon, Eye, EyeOff } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

export const CreateQRCode: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetUrl: '',
    colorScheme: '#D9ED14',
    isActive: true,
    logo: null as File | null
  });

  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const colorOptions = [
    { color: '#D9ED14', name: 'Lemon' },
    { color: '#A3B70E', name: 'Lemon Dark' },
    { color: '#F2F9A7', name: 'Lemon Light' },
    { color: '#5D557F', name: 'Lilas 1' },
    { color: '#ECE7FF', name: 'Lilas 2' },
    { color: '#BBAAFF', name: 'Lilas 3' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, logo: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const generateQRCodeUrl = () => {
    if (!formData.targetUrl) return 'https://feedo.com.br/feedback/preview';
    return formData.targetUrl;
  };

  const handleSubmit = (e: React.FormEvent ) => {
    e.preventDefault();
    // Aqui será implementada a integração com Supabase
    console.log('QR Code Data:', formData);
    // Por enquanto, apenas navegar de volta
    navigate('/qr-codes');
  };

  return (
    <div className="min-h-screen bg-gray-light dark:bg-gray-dark">
      {/* Header */}
      <div className="bg-white dark:bg-gray-dark border-b border-gray-light dark:border-lilas-4/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/qr-codes')}
              className="p-2 rounded-lg hover:bg-gray-light/20 dark:hover:bg-gray-medium/20 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-medium dark:text-gray-light" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-dark dark:text-white">Criar Novo QR Code</h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-lemon rounded-full flex items-center justify-center text-xs font-bold text-gray-dark">1</div>
                  <span className="text-sm font-medium text-gray-dark dark:text-white">Configurar QR Code</span>
                </div>
                <div className="flex items-center space-x-2 opacity-50">
                  <div className="w-6 h-6 bg-gray-light dark:bg-gray-medium rounded-full flex items-center justify-center text-xs font-bold text-gray-medium">2</div>
                  <span className="text-sm text-gray-medium">Personalização</span>
                </div>
                <div className="flex items-center space-x-2 opacity-50">
                  <div className="w-6 h-6 bg-gray-light dark:bg-gray-medium rounded-full flex items-center justify-center text-xs font-bold text-gray-medium">3</div>
                  <span className="text-sm text-gray-medium">Finalizar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form */}
              <div className="space-y-6">
                {/* Logo Upload */}
                <div className="bg-white dark:bg-gray-dark rounded-lg p-6 border border-gray-light dark:border-lilas-4/30">
                  <h3 className="text-lg font-semibold text-gray-dark dark:text-white mb-4">Logo do QR Code</h3>
                  
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive 
                        ? 'border-lemon bg-lemon/10' 
                        : 'border-gray-light dark:border-lilas-4/30 hover:border-lemon/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {previewUrl ? (
                      <div className="space-y-4">
                        <img src={previewUrl} alt="Preview" className="w-24 h-24 mx-auto rounded-lg object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewUrl('');
                            setFormData(prev => ({ ...prev, logo: null }));
                          }}
                          className="text-sm text-gray-medium hover:text-lemon-dark transition-colors"
                        >
                          Remover logo
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-lemon/20 rounded-lg flex items-center justify-center mx-auto">
                          <Upload className="h-8 w-8 text-lemon-dark" />
                        </div>
                        <div>
                          <p className="text-gray-medium dark:text-gray-light/70 mb-2">
                            Arraste ou escolha seu arquivo para upload
                          </p>
                          <p className="text-sm text-gray-medium/60">PNG, GIF, WEBP, MP4 ou MP3. Max 100mb</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-gray-light dark:bg-gray-medium text-gray-dark dark:text-white rounded-lg hover:bg-gray-medium dark:hover:bg-gray-light/20 transition-colors"
                        >
                          Procurar arquivo
                        </button>
                      </div>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Basic Information */}
                <div className="bg-white dark:bg-gray-dark rounded-lg p-6 border border-gray-light dark:border-lilas-4/30">
                  <h3 className="text-lg font-semibold text-gray-dark dark:text-white mb-4">Informações Básicas</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-dark dark:text-gray-light mb-2">
                        Nome do QR Code *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Loja Shopping Center"
                        className="w-full px-3 py-2 border border-gray-light dark:border-lilas-4/30 rounded-lg bg-white dark:bg-gray-dark text-gray-dark dark:text-gray-light focus:ring-2 focus:ring-lemon focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-dark dark:text-gray-light mb-2">
                        Descrição *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Descreva o propósito deste QR Code"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-light dark:border-lilas-4/30 rounded-lg bg-white dark:bg-gray-dark text-gray-dark dark:text-gray-light focus:ring-2 focus:ring-lemon focus:border-transparent resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-dark dark:text-gray-light mb-2">
                        URL de Destino *
                      </label>
                      <input
                        type="url"
                        name="targetUrl"
                        value={formData.targetUrl}
                        onChange={handleInputChange}
                        placeholder="https://feedo.com.br/feedback/..."
                        className="w-full px-3 py-2 border border-gray-light dark:border-lilas-4/30 rounded-lg bg-white dark:bg-gray-dark text-gray-dark dark:text-gray-light focus:ring-2 focus:ring-lemon focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Customization */}
                <div className="bg-white dark:bg-gray-dark rounded-lg p-6 border border-gray-light dark:border-lilas-4/30">
                  <h3 className="text-lg font-semibold text-gray-dark dark:text-white mb-4">Personalização</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-dark dark:text-gray-light mb-3">
                        Esquema de Cores
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {colorOptions.map((option ) => (
                          <button
                            key={option.color}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, colorScheme: option.color }))}
                            className={`p-3 rounded-lg border-2 transition-colors ${
                              formData.colorScheme === option.color
                                ? 'border-lemon'
                                : 'border-gray-light dark:border-lilas-4/30 hover:border-lemon/50'
                            }`}
                          >
                            <div
                              className="w-8 h-8 rounded-full mx-auto mb-2"
                              style={{ backgroundColor: option.color }}
                            />
                            <span className="text-xs text-gray-medium dark:text-gray-light/70">{option.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-medium text-gray-dark dark:text-gray-light">
                          Status
                        </label>
                        <p className="text-xs text-gray-medium dark:text-gray-light/60">
                          QR Code ativo pode receber feedbacks
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                        className="flex items-center space-x-2 text-sm"
                      >
                        {formData.isActive ? (
                          <Eye className="h-4 w-4 text-lemon-dark" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-medium" />
                        )}
                        <span className={formData.isActive ? 'text-lemon-dark' : 'text-gray-medium'}>
                          {formData.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-dark rounded-lg p-6 border border-gray-light dark:border-lilas-4/30 sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-dark dark:text-white mb-4">Preview do QR Code</h3>
                  
                  <div className="text-center space-y-4">
                    <div 
                      className="inline-block p-6 rounded-lg"
                      style={{ backgroundColor: `${formData.colorScheme}20` }}
                    >
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <QRCodeSVG 
                          value={generateQRCodeUrl()} 
                          size={200}
                          fgColor="#222222"
                          includeMargin={true}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-dark dark:text-white">
                        {formData.name || 'Nome do QR Code'}
                      </h4>
                      <p className="text-sm text-gray-medium dark:text-gray-light/70">
                        {formData.description || 'Descrição do QR Code aparecerá aqui'}
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-xs">
                        {formData.isActive ? (
                          <Eye className="h-3 w-3 text-lemon-dark" />
                        ) : (
                          <EyeOff className="h-3 w-3 text-gray-medium" />
                        )}
                        <span className={formData.isActive ? 'text-lemon-dark' : 'text-gray-medium'}>
                          {formData.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-light dark:border-lilas-4/30">
              <button
                type="button"
                onClick={() => navigate('/qr-codes')}
                className="px-6 py-2 border border-gray-light dark:border-lilas-4/30 rounded-lg text-gray-medium dark:text-gray-light hover:bg-gray-light/20 dark:hover:bg-gray-medium/20 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-lemon text-gray-dark rounded-lg font-medium hover:bg-lemon-dark transition-colors flex items-center space-x-2"
              >
                <QrCodeIcon className="h-4 w-4" />
                <span>Criar QR Code</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
