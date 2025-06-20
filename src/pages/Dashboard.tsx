import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Star, 
  Calendar,
  Filter,
  Download,
  RefreshCw,
  MapPin,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface KPIData {
  npsScore: number;
  npsChange: number;
  totalResponses: number;
  responsesChange: number;
  averageRating: number;
  ratingChange: number;
  activeQRCodes: number;
  qrCodesChange: number;
}

interface TrendData {
  date: string;
  nps: number;
  responses: number;
  rating: number;
}

interface GeolocationData {
  city: string;
  state: string;
  lat: number;
  lng: number;
  feedbacks: number;
  averageRating: number;
}

export const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - em produção viria do Supabase
  const kpiData: KPIData = {
    npsScore: 72,
    npsChange: 8.5,
    totalResponses: 1247,
    responsesChange: 23.1,
    averageRating: 4.3,
    ratingChange: 0.2,
    activeQRCodes: 12,
    qrCodesChange: 2
  };

  const trendData: TrendData[] = [
    { date: '2024-01-01', nps: 65, responses: 45, rating: 4.1 },
    { date: '2024-01-08', nps: 68, responses: 52, rating: 4.2 },
    { date: '2024-01-15', nps: 70, responses: 48, rating: 4.2 },
    { date: '2024-01-22', nps: 69, responses: 61, rating: 4.1 },
    { date: '2024-01-29', nps: 72, responses: 58, rating: 4.3 },
  ];

  const geolocationData: GeolocationData[] = [
    { city: 'São Paulo', state: 'SP', lat: -23.5505, lng: -46.6333, feedbacks: 342, averageRating: 4.2 },
    { city: 'Rio de Janeiro', state: 'RJ', lat: -22.9068, lng: -43.1729, feedbacks: 198, averageRating: 4.4 },
    { city: 'Belo Horizonte', state: 'MG', lat: -19.9191, lng: -43.9386, feedbacks: 156, averageRating: 4.1 },
    { city: 'Porto Alegre', state: 'RS', lat: -30.0346, lng: -51.2177, feedbacks: 89, averageRating: 4.5 },
    { city: 'Brasília', state: 'DF', lat: -15.8267, lng: -47.9218, feedbacks: 67, averageRating: 4.0 },
    { city: 'Salvador', state: 'BA', lat: -12.9714, lng: -38.5014, feedbacks: 134, averageRating: 4.3 },
    { city: 'Fortaleza', state: 'CE', lat: -3.7319, lng: -38.5267, feedbacks: 98, averageRating: 4.2 },
    { city: 'Recife', state: 'PE', lat: -8.0476, lng: -34.8770, feedbacks: 76, averageRating: 4.1 },
    { city: 'Curitiba', state: 'PR', lat: -25.4284, lng: -49.2733, feedbacks: 112, averageRating: 4.4 },
    { city: 'Manaus', state: 'AM', lat: -3.1190, lng: -60.0217, feedbacks: 45, averageRating: 3.9 },
    { city: 'Goiânia', state: 'GO', lat: -16.6869, lng: -49.2648, feedbacks: 58, averageRating: 4.0 },
    { city: 'Belém', state: 'PA', lat: -1.4558, lng: -48.5044, feedbacks: 41, averageRating: 4.2 }
  ];

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    setIsLoading(true);
    // Simular carregamento
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  // Componente KPI Card
  const KPICard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    format = 'number',
    suffix = '' 
  }: {
    title: string;
    value: number;
    change: number;
    icon: any;
    format?: 'number' | 'decimal';
    suffix?: string;
  }) => {
    const isPositive = change >= 0;
    const formattedValue = format === 'decimal' ? value.toFixed(1) : value.toLocaleString();
    
    return (
      <div 
        className="p-6 rounded-lg backdrop-blur-md transition-all duration-300 hover:scale-105"
        style={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.8)', 
          border: '1px solid rgba(221, 242, 71, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div 
            className="p-3 rounded-lg"
            style={{ backgroundColor: 'rgba(221, 242, 71, 0.2)' }}
          >
            <Icon className="h-6 w-6" style={{ color: '#DDF247' }} />
          </div>
          
          <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>{isPositive ? '+' : ''}{change}%</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1" style={{ color: '#7A798A' }}>
            {title}
          </h3>
          <p className="text-2xl font-bold" style={{ color: '#F2F2F2' }}>
            {formattedValue}{suffix}
          </p>
        </div>
      </div>
    );
  };

  // Componente de Gráfico Simples (placeholder)
  const SimpleChart = ({ data, type = 'line' }: { data: TrendData[]; type?: 'line' | 'bar' }) => (
    <div 
      className="h-64 rounded-lg backdrop-blur-md flex items-center justify-center"
      style={{ 
        backgroundColor: 'rgba(26, 26, 26, 0.8)', 
        border: '1px solid rgba(221, 242, 71, 0.2)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="text-center">
        <BarChart3 className="h-16 w-16 mx-auto mb-4" style={{ color: '#DDF247' }} />
        <p className="text-lg font-semibold mb-2" style={{ color: '#F2F2F2' }}>
          Gráfico de {type === 'line' ? 'Linha' : 'Barras'}
        </p>
        <p className="text-sm" style={{ color: '#7A798A' }}>
          Integração com biblioteca de gráficos em desenvolvimento
        </p>
      </div>
    </div>
  );

  // Componente de Mapa com Scroll - ALTURA AJUSTADA
  const SimpleMap = ({ data }: { data: GeolocationData[] }) => (
    <div 
      className="h-96 rounded-lg backdrop-blur-md flex flex-col"
      style={{ 
        backgroundColor: 'rgba(26, 26, 26, 0.8)', 
        border: '1px solid rgba(221, 242, 71, 0.2)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Header fixo */}
      <div className="p-6 pb-4 border-b" style={{ borderColor: 'rgba(221, 242, 71, 0.2)' }}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold" style={{ color: '#F2F2F2' }}>
            Feedbacks por Localização
          </h3>
          <MapPin className="h-5 w-5" style={{ color: '#DDF247' }} />
        </div>
        <p className="text-sm mt-1" style={{ color: '#7A798A' }}>
          {data.length} cidades com feedbacks
        </p>
      </div>
      
      {/* Lista com scroll */}
      <div className="flex-1 overflow-y-auto p-6 pt-4">
        <div className="space-y-3">
          {data.map((location, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]" 
              style={{ backgroundColor: 'rgba(221, 242, 71, 0.1)' }}
            >
              <div className="flex-1">
                <p className="font-medium" style={{ color: '#F2F2F2' }}>
                  {location.city}, {location.state}
                </p>
                <p className="text-sm" style={{ color: '#7A798A' }}>
                  {location.feedbacks} feedbacks
                </p>
              </div>
              <div className="text-right ml-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" style={{ color: '#DDF247' }} />
                  <span className="font-medium" style={{ color: '#F2F2F2' }}>
                    {location.averageRating.toFixed(1)}
                  </span>
                </div>
                <div className="text-xs mt-1" style={{ color: '#7A798A' }}>
                  {location.feedbacks > 100 ? 'Alto volume' : location.feedbacks > 50 ? 'Médio volume' : 'Baixo volume'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer com total */}
      <div className="p-4 pt-2 border-t" style={{ borderColor: 'rgba(221, 242, 71, 0.2)' }}>
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: '#7A798A' }}>Total de feedbacks:</span>
          <span className="font-semibold" style={{ color: '#DDF247' }}>
            {data.reduce((sum, location) => sum + location.feedbacks, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#F2F2F2' }}>
            Dashboard
          </h1>
          <p className="text-sm" style={{ color: '#7A798A' }}>
            Visão geral dos seus feedbacks e métricas
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          {/* Filtro de Período */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" style={{ color: '#7A798A' }} />
            <select
              value={selectedPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                border: '1px solid rgba(221, 242, 71, 0.3)',
                color: '#F2F2F2'
              }}
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="1y">Último ano</option>
            </select>
          </div>
          
          {/* Botões de Ação */}
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 rounded-lg transition-colors disabled:opacity-50"
            style={{ 
              backgroundColor: 'rgba(221, 242, 71, 0.2)', 
              border: '1px solid rgba(221, 242, 71, 0.3)',
              color: '#DDF247'
            }}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            className="p-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: 'rgba(221, 242, 71, 0.2)', 
              border: '1px solid rgba(221, 242, 71, 0.3)',
              color: '#DDF247'
            }}
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="NPS Score"
          value={kpiData.npsScore}
          change={kpiData.npsChange}
          icon={TrendingUp}
        />
        <KPICard
          title="Total de Respostas"
          value={kpiData.totalResponses}
          change={kpiData.responsesChange}
          icon={MessageSquare}
        />
        <KPICard
          title="Avaliação Média"
          value={kpiData.averageRating}
          change={kpiData.ratingChange}
          icon={Star}
          format="decimal"
        />
        <KPICard
          title="QR Codes Ativos"
          value={kpiData.activeQRCodes}
          change={kpiData.qrCodesChange}
          icon={Activity}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#F2F2F2' }}>
            Evolução do NPS
          </h3>
          <SimpleChart data={trendData} type="line" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#F2F2F2' }}>
            Volume de Respostas
          </h3>
          <SimpleChart data={trendData} type="bar" />
        </div>
      </div>

      {/* Mapa e Estatísticas Adicionais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SimpleMap data={geolocationData} />
        </div>
        
        <div className="space-y-4">
          <div 
            className="p-6 rounded-lg backdrop-blur-md"
            style={{ 
              backgroundColor: 'rgba(26, 26, 26, 0.8)', 
              border: '1px solid rgba(221, 242, 71, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#F2F2F2' }}>
              Resumo Rápido
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: '#7A798A' }}>Promotores</span>
                <span className="font-medium" style={{ color: '#22c55e' }}>68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: '#7A798A' }}>Neutros</span>
                <span className="font-medium" style={{ color: '#f59e0b' }}>24%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: '#7A798A' }}>Detratores</span>
                <span className="font-medium" style={{ color: '#ef4444' }}>8%</span>
              </div>
            </div>
          </div>
          
          <div 
            className="p-6 rounded-lg backdrop-blur-md"
            style={{ 
              backgroundColor: 'rgba(26, 26, 26, 0.8)', 
              border: '1px solid rgba(221, 242, 71, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#F2F2F2' }}>
              Próximas Ações
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#DDF247' }}></div>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#F2F2F2' }}>
                    Analisar feedback negativo
                  </p>
                  <p className="text-xs" style={{ color: '#7A798A' }}>
                    3 detratores esta semana
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#DDF247' }}></div>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#F2F2F2' }}>
                    Criar campanha de follow-up
                  </p>
                  <p className="text-xs" style={{ color: '#7A798A' }}>
                    Para promotores recentes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
