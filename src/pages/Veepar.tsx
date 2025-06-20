import React, { useState } from 'react';
import { 
  TrendingUp, 
  Star, 
  Award, 
  Shield, 
  Crown,
  Users,
  MessageSquare,
  CheckCircle,
  Target,
  Zap,
  BarChart3,
  Trophy,
  ArrowRight,
  Play,
  ChevronDown,
  ChevronUp,
  Verified,
  Heart,
  Clock,
  Phone,
  Mail,
  MapPin,
  ThumbsUp,
  Gift,
  Rocket
} from 'lucide-react';

interface RankingFactor {
  id: string;
  title: string;
  description: string;
  weight: number;
  icon: React.ComponentType<any>;
  tips: string[];
  color: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export const Veepar: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const rankingFactors: RankingFactor[] = [
    {
      id: 'plan',
      title: 'Plano de Assinatura',
      description: 'Seu plano determina sua visibilidade e recursos disponíveis',
      weight: 40,
      icon: Crown,
      color: '#DDF247',
      tips: [
        'Enterprise: Máxima visibilidade e destaque',
        'Premium: Boa posição nos resultados',
        'Basic: Posição padrão na listagem',
        'Upgrade para melhor posicionamento'
      ]
    },
    {
      id: 'nps',
      title: 'NPS Score',
      description: 'Net Promoter Score baseado no feedback dos clientes',
      weight: 25,
      icon: TrendingUp,
      color: '#22c55e',
      tips: [
        'Responda rapidamente aos feedbacks',
        'Resolva problemas de forma proativa',
        'Mantenha comunicação clara com clientes',
        'Supere expectativas no atendimento'
      ]
    },
    {
      id: 'rating',
      title: 'Avaliação Média',
      description: 'Média das estrelas recebidas dos seus clientes',
      weight: 20,
      icon: Star,
      color: '#f59e0b',
      tips: [
        'Entregue serviços de alta qualidade',
        'Seja pontual e profissional',
        'Peça avaliações aos clientes satisfeitos',
        'Mantenha padrão consistente de excelência'
      ]
    },
    {
      id: 'verification',
      title: 'Verificação',
      description: 'Perfil verificado aumenta confiança e ranking',
      weight: 10,
      icon: Verified,
      color: '#3b82f6',
      tips: [
        'Complete a verificação de identidade',
        'Valide seus documentos empresariais',
        'Confirme informações de contato',
        'Mantenha dados sempre atualizados'
      ]
    },
    {
      id: 'activity',
      title: 'Atividade na Plataforma',
      description: 'Frequência de uso e engajamento no Feedo',
      weight: 5,
      icon: Zap,
      color: '#8b5cf6',
      tips: [
        'Acesse a plataforma regularmente',
        'Responda mensagens rapidamente',
        'Atualize seu perfil frequentemente',
        'Participe das funcionalidades do app'
      ]
    }
  ];

  const successCases = [
    {
      name: 'Silva Reformas',
      before: 'Posição #47',
      after: 'Posição #1',
      improvement: '+4600%',
      actions: ['Upgrade para Enterprise', 'Melhorou NPS de 65 para 85', 'Verificou perfil'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Beleza & Estilo',
      before: 'Posição #23',
      after: 'Posição #2',
      improvement: '+1050%',
      actions: ['Upgrade para Premium', 'Aumentou avaliação para 4.9', 'Respondeu todos feedbacks'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const faqs: FAQ[] = [
    {
      question: 'Como é calculado o ranking no Veepo?',
      answer: 'O ranking combina múltiplos fatores: Plano de assinatura (40%), NPS Score (25%), Avaliação média (20%), Verificação (10%) e Atividade na plataforma (5%). Cada fator contribui para sua pontuação final.'
    },
    {
      question: 'Quanto tempo leva para melhorar minha posição?',
      answer: 'Mudanças no plano são imediatas. Melhorias no NPS e avaliações podem levar de 1-4 semanas para refletir no ranking, dependendo do volume de novos feedbacks recebidos.'
    },
    {
      question: 'Posso melhorar meu ranking sem fazer upgrade do plano?',
      answer: 'Sim! Embora o plano tenha maior peso, você pode melhorar significativamente focando em NPS, avaliações e verificação. Muitos prestadores sobem várias posições apenas com excelência no atendimento.'
    },
    {
      question: 'O que acontece se eu receber uma avaliação ruim?',
      answer: 'Uma avaliação ruim impacta sua média, mas você pode recuperar com boas avaliações subsequentes. O importante é responder profissionalmente e resolver o problema do cliente.'
    },
    {
      question: 'Como funciona a verificação do perfil?',
      answer: 'A verificação envolve validação de identidade, documentos empresariais e informações de contato. É um processo simples que aumenta a confiança dos clientes e melhora seu ranking.'
    }
  ];

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

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-6">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(221, 242, 71, 0.2)' }}
          >
            <Trophy className="h-10 w-10" style={{ color: '#DDF247' }} />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#F2F2F2' }}>
          Veepar: Como ficar bem rankeado
        </h1>
        
        <p className="text-xl max-w-3xl mx-auto" style={{ color: '#7A798A' }}>
          Descubra os segredos para aparecer no topo do Veepo e atrair mais clientes. 
          Aprenda como nosso algoritmo funciona e quais ações tomar para melhorar seu ranking.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button 
            className="px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            style={{ backgroundColor: '#DDF247', color: '#161616' }}
          >
            <Rocket className="h-5 w-5" />
            <span>Começar Agora</span>
          </button>
          
          <button 
            className="px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            style={{ 
              backgroundColor: 'rgba(221, 242, 71, 0.1)', 
              border: '1px solid rgba(221, 242, 71, 0.3)',
              color: '#DDF247'
            }}
          >
            <Play className="h-5 w-5" />
            <span>Ver Tutorial</span>
          </button>
        </div>
      </div>

      {/* Ranking Formula */}
      <div 
        className="p-8 rounded-lg backdrop-blur-md"
        style={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.8)', 
          border: '1px solid rgba(221, 242, 71, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#F2F2F2' }}>
            Como Funciona o Ranking
          </h2>
          <p className="text-lg" style={{ color: '#7A798A' }}>
            Nosso algoritmo considera 5 fatores principais para determinar sua posição no Veepo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rankingFactors.map((factor) => {
            const IconComponent = factor.icon;
            return (
              <div 
                key={factor.id}
                className="p-6 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                style={{ 
                  backgroundColor: 'rgba(26, 26, 26, 0.6)', 
                  border: `1px solid ${factor.color}40`
                }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${factor.color}20` }}
                  >
                    <IconComponent className="h-6 w-6" style={{ color: factor.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: '#F2F2F2' }}>
                      {factor.title}
                    </h3>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: factor.color }}
                    >
                      {factor.weight}% do ranking
                    </span>
                  </div>
                </div>

                <p className="text-sm mb-4" style={{ color: '#7A798A' }}>
                  {factor.description}
                </p>

                <div className="space-y-2">
                  {factor.tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: factor.color }} />
                      <span className="text-sm" style={{ color: '#7A798A' }}>
                        {tip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Plan */}
      <div 
        className="p-8 rounded-lg backdrop-blur-md"
        style={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.8)', 
          border: '1px solid rgba(221, 242, 71, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#F2F2F2' }}>
          Plano de Ação para Melhorar seu Ranking
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(221, 242, 71, 0.2)' }}
            >
              <span className="text-2xl font-bold" style={{ color: '#DDF247' }}>1</span>
            </div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#F2F2F2' }}>
              Otimize seu Perfil
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: '#7A798A' }}>
              <li>• Complete todas as informações</li>
              <li>• Adicione fotos profissionais</li>
              <li>• Verifique sua conta</li>
              <li>• Atualize descrição do negócio</li>
            </ul>
          </div>

          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(221, 242, 71, 0.2)' }}
            >
              <span className="text-2xl font-bold" style={{ color: '#DDF247' }}>2</span>
            </div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#F2F2F2' }}>
              Foque na Excelência
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: '#7A798A' }}>
              <li>• Entregue serviços de qualidade</li>
              <li>• Seja pontual e profissional</li>
              <li>• Comunique-se claramente</li>
              <li>• Supere expectativas</li>
            </ul>
          </div>

          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(221, 242, 71, 0.2)' }}
            >
              <span className="text-2xl font-bold" style={{ color: '#DDF247' }}>3</span>
            </div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#F2F2F2' }}>
              Engaje com Clientes
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: '#7A798A' }}>
              <li>• Responda feedbacks rapidamente</li>
              <li>• Peça avaliações</li>
              <li>• Resolva problemas proativamente</li>
              <li>• Mantenha relacionamento</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Success Cases */}
      <div 
        className="p-8 rounded-lg backdrop-blur-md"
        style={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.8)', 
          border: '1px solid rgba(221, 242, 71, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#F2F2F2' }}>
          Cases de Sucesso
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {successCases.map((case_, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'rgba(221, 242, 71, 0.1)' }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={case_.avatar} 
                  alt={case_.name}
                  className="w-16 h-16 rounded-full object-cover border-2"
                  style={{ borderColor: '#DDF247' }}
                />
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: '#F2F2F2' }}>
                    {case_.name}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm" style={{ color: '#7A798A' }}>
                      {case_.before}
                    </span>
                    <ArrowRight className="h-4 w-4" style={{ color: '#DDF247' }} />
                    <span className="text-sm font-medium" style={{ color: '#DDF247' }}>
                      {case_.after}
                    </span>
                  </div>
                  <span 
                    className="text-lg font-bold"
                    style={{ color: '#22c55e' }}
                  >
                    {case_.improvement} melhoria
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium" style={{ color: '#F2F2F2' }}>
                  Ações realizadas:
                </h4>
                {case_.actions.map((action, actionIndex) => (
                  <div key={actionIndex} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#22c55e' }} />
                    <span className="text-sm" style={{ color: '#7A798A' }}>
                      {action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans Comparison */}
      <div 
        className="p-8 rounded-lg backdrop-blur-md"
        style={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.8)', 
          border: '1px solid rgba(221, 242, 71, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#F2F2F2' }}>
          Impacto dos Planos no Ranking
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['basic', 'premium', 'enterprise'].map((plan) => {
            const PlanIcon = getPlanIcon(plan);
            const planColor = getPlanColor(plan);
            const planWeight = plan === 'enterprise' ? 300 : plan === 'premium' ? 200 : 100;
            
            return (
              <div 
                key={plan}
                className={`p-6 rounded-lg transition-all duration-300 hover:scale-[1.02] ${plan === 'enterprise' ? 'ring-2' : ''}`}
                style={{ 
                  backgroundColor: 'rgba(26, 26, 26, 0.6)', 
                  border: `1px solid ${planColor}40`,
                  ringColor: plan === 'enterprise' ? '#DDF247' : 'transparent'
                }}
              >
                <div className="text-center mb-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${planColor}20` }}
                  >
                    <PlanIcon className="h-8 w-8" style={{ color: planColor }} />
                  </div>
                  <h3 className="text-xl font-bold capitalize" style={{ color: planColor }}>
                    {plan}
                  </h3>
                  {plan === 'enterprise' && (
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mt-2"
                      style={{ backgroundColor: '#DDF247', color: '#161616' }}
                    >
                      Recomendado
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: '#7A798A' }}>
                      Peso no ranking:
                    </span>
                    <span className="font-medium" style={{ color: planColor }}>
                      {planWeight} pontos
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" style={{ color: planColor }} />
                      <span className="text-sm" style={{ color: '#7A798A' }}>
                        {plan === 'enterprise' ? 'Destaque máximo' : 
                         plan === 'premium' ? 'Boa visibilidade' : 'Visibilidade padrão'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" style={{ color: planColor }} />
                      <span className="text-sm" style={{ color: '#7A798A' }}>
                        {plan === 'enterprise' ? 'Aparece primeiro' : 
                         plan === 'premium' ? 'Posição privilegiada' : 'Listagem normal'}
                      </span>
                    </div>

                    {plan !== 'basic' && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" style={{ color: planColor }} />
                        <span className="text-sm" style={{ color: '#7A798A' }}>
                          {plan === 'enterprise' ? 'Badge especial' : 'Selo premium'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  className="w-full mt-6 py-2 px-4 rounded-lg font-medium transition-colors"
                  style={{ 
                    backgroundColor: plan === 'enterprise' ? '#DDF247' : 'transparent',
                    color: plan === 'enterprise' ? '#161616' : planColor,
                    border: plan === 'enterprise' ? 'none' : `1px solid ${planColor}40`
                  }}
                >
                  {plan === 'enterprise' ? 'Fazer Upgrade' : 'Saber Mais'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ */}
      <div 
        className="p-8 rounded-lg backdrop-blur-md"
        style={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.8)', 
          border: '1px solid rgba(221, 242, 71, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#F2F2F2' }}>
          Perguntas Frequentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border rounded-lg overflow-hidden"
              style={{ borderColor: 'rgba(221, 242, 71, 0.2)' }}
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                className="w-full p-4 text-left flex items-center justify-between transition-colors hover:bg-opacity-50"
                style={{ backgroundColor: 'rgba(221, 242, 71, 0.1)' }}
              >
                <span className="font-medium" style={{ color: '#F2F2F2' }}>
                  {faq.question}
                </span>
                {expandedFAQ === index ? (
                  <ChevronUp className="h-5 w-5" style={{ color: '#DDF247' }} />
                ) : (
                  <ChevronDown className="h-5 w-5" style={{ color: '#DDF247' }} />
                )}
              </button>
              
              {expandedFAQ === index && (
                <div className="p-4" style={{ backgroundColor: 'rgba(26, 26, 26, 0.4)' }}>
                  <p style={{ color: '#7A798A' }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <div 
        className="p-8 rounded-lg backdrop-blur-md text-center"
        style={{ 
          backgroundColor: 'rgba(221, 242, 71, 0.1)', 
          border: '1px solid rgba(221, 242, 71, 0.3)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Trophy className="h-16 w-16 mx-auto mb-4" style={{ color: '#DDF247' }} />
        
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#F2F2F2' }}>
          Pronto para Dominar o Veepo?
        </h2>
        
        <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: '#7A798A' }}>
          Aplique essas estratégias e veja seu negócio crescer. Quanto melhor seu ranking, 
          mais clientes você atrai e mais sua receita aumenta.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            style={{ backgroundColor: '#DDF247', color: '#161616' }}
          >
            <Crown className="h-5 w-5" />
            <span>Fazer Upgrade Agora</span>
          </button>
          
          <button 
            className="px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            style={{ 
              backgroundColor: 'transparent', 
              border: '1px solid rgba(221, 242, 71, 0.3)',
              color: '#DDF247'
            }}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Falar com Suporte</span>
          </button>
        </div>
      </div>
    </div>
  );
};

