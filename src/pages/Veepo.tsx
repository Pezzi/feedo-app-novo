import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Heart,
  Phone,
  Mail,
  Award,
  TrendingUp,
  Users,
  Shield,
  Verified,
  Crown,
  Map,
  Grid,
  List,
  SlidersHorizontal,
  Navigation
} from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  businessName: string;
  avatar: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  npsScore: number;
  plan: 'basic' | 'premium' | 'enterprise';
  cnae: string;
  segment: string;
  city: string;
  state: string;
  cep: string;
  address: string;
  neighborhood: string;
  distance: number;
  isVerified: boolean;
  isOnline: boolean;
  responseRate: number;
  feedbacksSent: number;
  feedbacksResponded: number;
  badges: string[];
  description: string;
  phone: string;
  email: string;
  workingHours: string;
  gallery: string[];
}

export const Veepo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCep, setSelectedCep] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('');
  const [radiusKm, setRadiusKm] = useState(5);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('ranking');
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);

  const providers: Provider[] = [
    {
      id: '1',
      name: 'João Silva',
      businessName: 'Silva Reformas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=200&fit=crop',
      rating: 4.8,
      reviewCount: 127,
      npsScore: 85,
      plan: 'enterprise',
      cnae: '4330-4/04',
      segment: 'Reformas e Construção',
      city: 'São Paulo',
      state: 'SP',
      cep: '01310-100',
      address: 'Av. Paulista, 1000',
      neighborhood: 'Bela Vista',
      distance: 2.3,
      isVerified: true,
      isOnline: true,
      responseRate: 98,
      feedbacksSent: 450,
      feedbacksResponded: 441,
      badges: ['Top Performer', 'Verified', 'Premium'],
      description: 'Especialista em reformas residenciais e comerciais com 15 anos de experiência.',
      phone: '(11) 99999-9999',
      email: 'joao@silvareformas.com',
      workingHours: 'Seg-Sex: 8h-18h',
      gallery: []
    },
    {
      id: '2',
      name: 'Maria Santos',
      businessName: 'Beleza & Estilo',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=200&fit=crop',
      rating: 4.9,
      reviewCount: 89,
      npsScore: 92,
      plan: 'premium',
      cnae: '9602-5/01',
      segment: 'Beleza e Estética',
      city: 'São Paulo',
      state: 'SP',
      cep: '04038-001',
      address: 'Rua Augusta, 500',
      neighborhood: 'Vila Olímpia',
      distance: 1.8,
      isVerified: true,
      isOnline: false,
      responseRate: 95,
      feedbacksSent: 320,
      feedbacksResponded: 304,
      badges: ['Top Rated', 'Verified'],
      description: 'Salão de beleza especializado em cortes modernos e tratamentos capilares.',
      phone: '(11) 88888-8888',
      email: 'maria@belezaestilo.com',
      workingHours: 'Ter-Sab: 9h-19h',
      gallery: []
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      businessName: 'Tech Solutions',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop',
      rating: 4.7,
      reviewCount: 156,
      npsScore: 78,
      plan: 'basic',
      cnae: '6201-5/00',
      segment: 'Tecnologia',
      city: 'São Paulo',
      state: 'SP',
      cep: '01310-300',
      address: 'Av. Faria Lima, 1500',
      neighborhood: 'Itaim Bibi',
      distance: 3.5,
      isVerified: false,
      isOnline: true,
      responseRate: 87,
      feedbacksSent: 280,
      feedbacksResponded: 244,
      badges: ['Rising Star'],
      description: 'Desenvolvimento de software e consultoria em tecnologia.',
      phone: '(11) 77777-7777',
      email: 'carlos@techsolutions.com',
      workingHours: 'Seg-Sex: 9h-17h',
      gallery: []
    }
  ];

  const states = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO', 'DF'];
  const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 'Curitiba'];
  const segments = ['Reformas e Construção', 'Beleza e Estética', 'Tecnologia', 'Alimentação', 'Saúde e Nutrição'];

  useEffect(() => {
    let filtered = [...providers];

    if (searchQuery) {
      filtered = filtered.filter(provider => 
        provider.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.segment.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedState) {
      filtered = filtered.filter(provider => provider.state === selectedState);
    }

    if (selectedCity) {
      filtered = filtered.filter(provider => provider.city === selectedCity);
    }

    if (selectedCep) {
      const cleanCep = selectedCep.replace(/\D/g, '');
      if (cleanCep.length >= 5) {
        filtered = filtered.filter(provider => {
          const providerCep = provider.cep.replace(/\D/g, '');
          return providerCep.startsWith(cleanCep.substring(0, 5));
        });
      }
    }

    if (selectedSegment) {
      filtered = filtered.filter(provider => provider.segment === selectedSegment);
    }

    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        const planWeight = { enterprise: 3, premium: 2, basic: 1 };
        filtered.sort((a, b) => {
          const scoreA = (planWeight[a.plan] * 100) + a.npsScore + (a.rating * 10);
          const scoreB = (planWeight[b.plan] * 100) + b.npsScore + (b.rating * 10);
          return scoreB - scoreA;
        });
        break;
    }

    setFilteredProviders(filtered);
  }, [searchQuery, selectedState, selectedCity, selectedCep, selectedSegment, sortBy]);

  const formatCep = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 5) {
      return cleanValue;
    }
    return cleanValue.replace(/(\d{5})(\d{0,3})/, '$1-$2');
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setSelectedCep(formatted);
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise': return '#DDF247';
      case 'premium': return '#f59e0b';
      case 'basic': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'enterprise': return Crown;
      case 'premium': return Award;
      case 'basic': return Shield;
      default: return Shield;
    }
  };

  const ProviderCard = ({ provider }: { provider: Provider }) => {
    const PlanIcon = getPlanIcon(provider.plan);
    
    return (
      <div 
        className="rounded-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] overflow-hidden"
        style={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.8)', 
          border: '1px solid rgba(221, 242, 71, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="relative h-32 overflow-hidden">
          <img 
            src={provider.coverImage} 
            alt={provider.businessName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            {provider.isOnline && (
              <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(34, 197, 94, 0.9)', color: 'white' }}>
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span>Online</span>
              </div>
            )}
            <div 
              className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: getPlanColor(provider.plan), color: '#161616' }}
            >
              <PlanIcon className="h-3 w-3" />
              <span className="capitalize">{provider.plan}</span>
            </div>
          </div>
          
          <div className="absolute top-3 right-3">
            <button className="p-2 rounded-full transition-colors" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <Heart className="h-4 w-4" style={{ color: '#F2F2F2' }} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start space-x-3 mb-3">
            <img 
              src={provider.avatar} 
              alt={provider.name}
              className="w-12 h-12 rounded-full object-cover border-2"
              style={{ borderColor: '#DDF247' }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold truncate" style={{ color: '#F2F2F2' }}>
                  {provider.businessName}
                </h3>
                {provider.isVerified && (
                  <Verified className="h-4 w-4 flex-shrink-0" style={{ color: '#DDF247' }} />
                )}
              </div>
              <p className="text-sm truncate" style={{ color: '#7A798A' }}>
                {provider.name}
              </p>
              <p className="text-xs truncate" style={{ color: '#7A798A' }}>
                {provider.segment}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <MapPin className="h-4 w-4" style={{ color: '#7A798A' }} />
            <div className="flex-1 min-w-0">
              <p className="text-xs truncate" style={{ color: '#7A798A' }}>
                {provider.neighborhood}, {provider.city} - {provider.cep}
              </p>
              <p className="text-xs" style={{ color: '#7A798A' }}>
                {provider.distance.toFixed(1)}km de distância
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4" style={{ color: '#DDF247' }} />
              <span className="text-sm font-medium" style={{ color: '#F2F2F2' }}>
                {provider.rating.toFixed(1)}
              </span>
              <span className="text-xs" style={{ color: '#7A798A' }}>
                ({provider.reviewCount})
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" style={{ color: '#DDF247' }} />
              <span className="text-sm font-medium" style={{ color: '#F2F2F2' }}>
                NPS {provider.npsScore}
              </span>
            </div>
          </div>

          <p className="text-sm mb-3" style={{ color: '#7A798A' }}>
            {provider.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {provider.badges.slice(0, 2).map((badge, index) => (
              <span 
                key={index}
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: 'rgba(221, 242, 71, 0.2)', color: '#DDF247' }}
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex space-x-2">
            <button 
              className="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
              style={{ backgroundColor: '#DDF247', color: '#161616' }}
            >
              Ver Perfil
            </button>
            <button 
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(221, 242, 71, 0.2)', color: '#DDF247' }}
            >
              <Phone className="h-4 w-4" />
            </button>
            <button 
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(221, 242, 71, 0.2)', color: '#DDF247' }}
            >
              <Mail className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#F2F2F2' }}>
            Veepo
          </h1>
          <p className="text-sm" style={{ color: '#7A798A' }}>
            Encontre os melhores prestadores de serviços da sua região
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: 'rgba(221, 242, 71, 0.2)', 
              border: '1px solid rgba(221, 242, 71, 0.3)',
              color: '#DDF247'
            }}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </button>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: 'rgba(221, 242, 71, 0.2)', 
              border: '1px solid rgba(221, 242, 71, 0.3)',
              color: '#DDF247'
            }}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-sm">Filtros</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#7A798A' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar prestadores, serviços ou empresas..."
            className="w-full pl-10 pr-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2"
            style={{ 
              backgroundColor: 'rgba(26, 26, 26, 0.8)', 
              border: '1px solid rgba(221, 242, 71, 0.3)',
              color: '#F2F2F2'
            }}
          />
        </div>

        {showFilters && (
          <div 
            className="p-6 rounded-lg backdrop-blur-md"
            style={{ 
              backgroundColor: 'rgba(26, 26, 26, 0.8)', 
              border: '1px solid rgba(221, 242, 71, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#F2F2F2' }}>
                  Estado
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                    border: '1px solid rgba(221, 242, 71, 0.3)',
                    color: '#F2F2F2'
                  }}
                >
                  <option value="">Todos os estados</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#F2F2F2' }}>
                  Cidade
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                    border: '1px solid rgba(221, 242, 71, 0.3)',
                    color: '#F2F2F2'
                  }}
                >
                  <option value="">Todas as cidades</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#F2F2F2' }}>
                  CEP
                </label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#7A798A' }} />
                  <input
                    type="text"
                    value={selectedCep}
                    onChange={handleCepChange}
                    placeholder="00000-000"
                    maxLength={9}
                    className="w-full pl-10 pr-3 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                      border: '1px solid rgba(221, 242, 71, 0.3)',
                      color: '#F2F2F2'
                    }}
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: '#7A798A' }}>
                  Digite pelo menos 5 dígitos
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#F2F2F2' }}>
                  Segmento
                </label>
                <select
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                    border: '1px solid rgba(221, 242, 71, 0.3)',
                    color: '#F2F2F2'
                  }}
                >
                  <option value="">Todos os segmentos</option>
                  {segments.map(segment => (
                    <option key={segment} value={segment}>{segment}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#F2F2F2' }}>
                  Raio: {radiusKm}km
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={radiusKm}
                  onChange={(e) => setRadiusKm(Number(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #DDF247 0%, #DDF247 ${((radiusKm - 1) / 9) * 100}%, #2a2a2a ${((radiusKm - 1) / 9) * 100}%, #2a2a2a 100%)`
                  }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: '#7A798A' }}>
                  <span>1km</span>
                  <span>10km</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setSelectedState('');
                  setSelectedCity('');
                  setSelectedCep('');
                  setSelectedSegment('');
                  setRadiusKm(5);
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-lg text-sm transition-colors"
                style={{ 
                  backgroundColor: 'rgba(221, 242, 71, 0.1)', 
                  border: '1px solid rgba(221, 242, 71, 0.3)',
                  color: '#DDF247'
                }}
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm" style={{ color: '#7A798A' }}>
              {filteredProviders.length} prestadores encontrados
              {selectedCep && (
                <span className="ml-2 px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(221, 242, 71, 0.2)', color: '#DDF247' }}>
                  CEP: {selectedCep}
                </span>
              )}
            </p>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                border: '1px solid rgba(221, 242, 71, 0.3)',
                color: '#F2F2F2'
              }}
            >
              <option value="ranking">Melhor ranking</option>
              <option value="rating">Maior avaliação</option>
              <option value="distance">Mais próximo</option>
              <option value="reviews">Mais avaliações</option>
            </select>
          </div>
          
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6' : 'grid-cols-1'}`}>
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 mx-auto mb-4" style={{ color: '#7A798A' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#fff' }}>
                Nenhum prestador encontrado
              </h3>
              <p className="mb-6" style={{ color: '#7A798A' }}>
                Tente ajustar os filtros para encontrar prestadores na sua região
              </p>
            </div>
          )}
        </div>

        <div className="xl:col-span-1 space-y-6">
          <div 
            className="p-6 rounded-lg backdrop-blur-md"
            style={{ 
              backgroundColor: 'rgba(26, 26, 26, 0.8)', 
              border: '1px solid rgba(221, 242, 71, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#F2F2F2' }}>
              Top Veepo
            </h3>
            <p className="text-sm mb-4" style={{ color: '#7A798A' }}>
              Melhores prestadores por segmento na sua região
            </p>
            
            <div className="space-y-3">
              {providers.slice(0, 3).map((provider, index) => (
                <div 
                  key={provider.id}
                  className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                  style={{ backgroundColor: 'rgba(221, 242, 71, 0.1)' }}
                >
                  <div className="flex-shrink-0">
                    <span 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: '#DDF247', color: '#161616' }}
                    >
                      {index + 1}
                    </span>
                  </div>
                  
                  <img 
                    src={provider.avatar} 
                    alt={provider.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate" style={{ color: '#F2F2F2' }}>
                      {provider.businessName}
                    </p>
                    <p className="text-xs truncate" style={{ color: '#7A798A' }}>
                      {provider.segment}
                    </p>
                    <p className="text-xs truncate" style={{ color: '#7A798A' }}>
                      {provider.neighborhood}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3" style={{ color: '#DDF247' }} />
                    <span className="text-xs font-medium" style={{ color: '#F2F2F2' }}>
                      {provider.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
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
              Mapa da Região
            </h3>
            <div 
              className="h-48 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(221, 242, 71, 0.1)' }}
            >
              <div className="text-center">
                <Map className="h-12 w-12 mx-auto mb-2" style={{ color: '#DDF247' }} />
                <p className="text-sm" style={{ color: '#7A798A' }}>
                  Mapa interativo em desenvolvimento
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

