import { useState, useMemo } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Cpu, 
  Database, 
  Zap, 
  Monitor, 
  CheckCircle, 
  ArrowRight, 
  Mail, 
  User, 
  Phone, 
  MessageSquare, 
  HardDrive, 
  Dna, 
  Terminal, 
  Send,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

// --- Types ---

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

interface PCConfig {
  cpuBrand: 'Intel' | 'AMD' | null;
  ramType: 'DDR4' | 'DDR5' | null;
  ramSpeed: string | null;
  ramCapacity: '16GB' | '32GB' | '64GB' | '128GB' | null;
  gpuTier: 'Gama Baixa / Entrada' | 'Gama Média / Intermediária' | 'Gama Alta / Entusiasta' | null;
  storage: '500GB' | '1TB' | '2TB' | '4TB' | null;
  rgb: boolean;
  useCase: string;
  additionalNotes: string;
}

// --- Components ---

const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex gap-2 mb-8 justify-center">
    {Array.from({ length: total }).map((_, i) => (
      <div 
        key={i} 
        className={`h-1.5 rounded-full transition-all duration-500 ${
          i <= current ? 'bg-brand w-8' : 'bg-white/10 w-4'
        }`}
      />
    ))}
  </div>
);

export default function App() {
  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', email: '', phone: '' });
  const [config, setConfig] = useState<PCConfig>({
    cpuBrand: null,
    ramType: null,
    ramSpeed: null,
    ramCapacity: null,
    gpuTier: null,
    storage: null,
    rgb: false,
    useCase: '',
    additionalNotes: '',
  });

  const totalSteps = 8;

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const isFormValid = userInfo.name && userInfo.email && userInfo.phone;

  const sendEmail = () => {
    const subject = `Novo Orçamento de PC: ${userInfo.name}`;
    const body = `
Olá, gostaria de solicitar um orçamento para a seguinte configuração:

DADOS DO CLIENTE:
- Nome: ${userInfo.name}
- Email: ${userInfo.email}
- Telefone: ${userInfo.phone}

CONFIGURAÇÃO DESEJADA:
- Processador: ${config.cpuBrand}
- GPU: ${config.gpuTier}
- RAM: ${config.ramCapacity} (${config.ramType} @ ${config.ramSpeed})
- Armazenamento: ${config.storage}
- LED RGB: ${config.rgb ? 'Sim' : 'Não'}
- Finalidade: ${config.useCase}

NOTAS ADICIONAIS:
${config.additionalNotes || 'Nenhuma nota adicional.'}

Aguardo seu contato!
    `.trim();

    const mailtoUrl = `mailto:comercial@seuexemplo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-white mb-2">Primeiro Passo</h2>
              <p className="text-white/60">Conte-nos um pouco sobre você para podermos enviar seu orçamento personalizado.</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Nome Completo" 
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand transition-colors text-white"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input 
                  type="email" 
                  placeholder="Seu melhor Email" 
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand transition-colors text-white"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input 
                  type="tel" 
                  placeholder="Telefone (WhatsApp)" 
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand transition-colors text-white"
                />
              </div>
            </div>
            <button 
              disabled={!isFormValid}
              onClick={handleNext}
              className="w-full bg-brand disabled:bg-white/10 disabled:text-white/30 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Iniciar Configuração <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-2">Plataforma Base</h2>
              <p className="text-white/60">Escolha o coração do seu computador.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { id: 'Intel', label: 'Intel Core', desc: 'Frequências elevadas, ideal para gaming e produtividade equilibrada.', icon: Cpu },
                { id: 'AMD', label: 'AMD Ryzen', desc: 'Excelente multitarefa e eficiência energética superior.', icon: Dna }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setConfig({ ...config, cpuBrand: item.id as any });
                    handleNext();
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all text-left group ${
                    config.cpuBrand === item.id 
                    ? 'border-brand bg-brand/10' 
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-white group-hover:text-brand transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{item.label}</h3>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="space-y-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-2">Geração & Velocidade RAM</h2>
              <p className="text-white/60">Selecione o padrão de memória e frequência desejada.</p>
            </div>
            <div className="space-y-8">
              <div className="flex justify-center gap-4">
                {['DDR4', 'DDR5'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => setConfig({ ...config, ramType: type as any, ramSpeed: null })}
                    className={`px-8 py-3 rounded-full font-bold border-2 transition-all ${
                      config.ramType === type ? 'bg-brand text-black border-brand' : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {config.ramType && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  {(config.ramType === 'DDR4' ? ['3200MHz', '3600MHz'] : ['5200MHz', '6000MHz', '6400MHz']).map((speed) => (
                    <button 
                      key={speed}
                      onClick={() => {
                        setConfig({ ...config, ramSpeed: speed });
                        handleNext();
                      }}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        config.ramSpeed === speed ? 'border-brand bg-brand/10 text-brand' : 'border-white/10 bg-white/5 text-white/40'
                      }`}
                    >
                      <span className="font-mono font-bold">{speed}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="flex-1 py-4 px-6 rounded-xl border border-white/10 text-white/60 font-bold hover:bg-white/5 transition-colors">
                  Voltar
                </button>
              </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-2">Capacidade RAM</h2>
              <p className="text-white/60">Quanto mais RAM, mais programas abertos ao mesmo tempo.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {['16GB', '32GB', '64GB', '128GB'].map((val) => (
                <button 
                  key={val}
                  onClick={() => {
                    setConfig({ ...config, ramCapacity: val as any });
                    handleNext();
                  }}
                  className={`p-6 rounded-2xl border-2 flex flex-col items-center transition-all ${
                    config.ramCapacity === val 
                    ? 'border-brand bg-brand/10' 
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <Layers className={`w-8 h-8 mb-4 ${config.ramCapacity === val ? 'text-brand' : 'text-white/40'}`} />
                  <span className="text-lg font-mono font-bold text-white">{val}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-2">Placa de Vídeo (GPU)</h2>
              <p className="text-white/60">O componente mais importante para gamers e profissionais de vídeo.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  id: 'Gama Baixa / Entrada', 
                  label: 'Gama Baixa', 
                  sub: 'Entrada / Entry-level',
                  desc: 'Ideal para 1080p (Full HD) em configurações médias. Perfeito para eSports e escritório.',
                  vram: '4GB - 8GB',
                  examples: 'RTX 4060, RX 7600'
                },
                { 
                  id: 'Gama Média / Intermediária', 
                  label: 'Gama Média', 
                  sub: 'Equilíbrio / Mid-range',
                  desc: 'O "doce lar" (sweet spot). Excelente desempenho em 1440p (2K) e ótimo Ray Tracing.',
                  vram: '8GB - 12GB+',
                  examples: 'RTX 4070, RX 7800 XT'
                },
                { 
                  id: 'Gama Alta / Entusiasta', 
                  label: 'Gama Alta', 
                  sub: 'Poder Puro / High-end',
                  desc: 'Concebida para 4K nativo, altas taxas de FPS e máxima qualidade gráfica.',
                  vram: '12GB - 24GB+',
                  examples: 'RTX 4080/4090, RX 7900 XTX'
                }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setConfig({ ...config, gpuTier: item.id as any });
                    handleNext();
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all text-left flex flex-col justify-between ${
                    config.gpuTier === item.id 
                    ? 'border-brand bg-brand/10' 
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div>
                    <div className="text-xs font-mono text-brand mb-2 bg-brand/10 px-2 py-1 rounded inline-block">VRAM: {item.vram}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.label}</h3>
                    <p className="text-xs text-white/40 mb-3 uppercase tracking-wider">{item.sub}</p>
                    <p className="text-sm text-white/60 mb-4">{item.desc}</p>
                  </div>
                  <div className="text-xs text-white/30 border-t border-white/10 pt-4">
                    Ex: {item.examples}
                  </div>
                </button>
              ))}
            </div>
            <button onClick={handleBack} className="w-32 py-2 text-white/40 hover:text-white transition-colors">Voltar</button>
          </motion.div>
        );

      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-2">Armazenamento SSD</h2>
              <p className="text-white/60">Espaço para seus jogos, arquivos e sistemas.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {['500GB', '1TB', '2TB', '4TB'].map((val) => (
                <button 
                  key={val}
                  onClick={() => {
                    setConfig({ ...config, storage: val as any });
                    handleNext();
                  }}
                  className={`p-6 rounded-2xl border-2 flex flex-col items-center transition-all ${
                    config.storage === val 
                    ? 'border-brand bg-brand/10' 
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <HardDrive className={`w-8 h-8 mb-4 ${config.storage === val ? 'text-brand' : 'text-white/40'}`} />
                  <span className="text-lg font-mono font-bold text-white">{val}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-2">Visuais & Estilo</h2>
              <p className="text-white/60">Seu PC deve ter a sua cara.</p>
            </div>
            
            <div className="flex flex-col gap-6">
               <button 
                onClick={() => setConfig({ ...config, rgb: !config.rgb })}
                className={`p-8 rounded-3xl border-2 transition-all flex items-center gap-6 text-left group overflow-hidden relative ${
                  config.rgb 
                  ? 'border-brand bg-brand/10' 
                  : 'border-white/10 bg-white/5 hover:border-white/30'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-active:scale-95 ${
                  config.rgb ? 'bg-brand text-black glow-brand' : 'bg-white/10 text-white/40'
                }`}>
                  <Zap className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">Iluminação RGB Full</h3>
                  <p className="text-white/50">Componentes e fans sincronizados com LEDs multicoloridos.</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  config.rgb ? 'border-brand bg-brand' : 'border-white/20'
                }`}>
                  {config.rgb && <CheckCircle className="w-4 h-4 text-black" />}
                </div>
                {config.rgb && (
                  <motion.div 
                    layoutId="glow"
                    className="absolute inset-0 bg-brand/5 blur-3xl -z-10"
                  />
                )}
              </button>

              <div className="flex gap-4">
                <button onClick={handleBack} className="flex-1 py-4 px-6 rounded-xl border border-white/10 text-white/60 font-bold hover:bg-white/5 transition-colors">
                  Voltar
                </button>
                <button onClick={handleNext} className="flex-[2] py-4 px-6 rounded-xl bg-brand text-black font-bold hover:opacity-90 transition-opacity">
                  Finalizar Detalhes
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 7:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-2">Finalidade do Setup</h2>
              <p className="text-white/60">Para que você vai usar essa máquina? Nos ajude a sugerir as melhores peças.</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Gaming Competitivo', 'Edição de Vídeo/3D', 'Desenvolvimento / AI', 'Uso Doméstico / Office'].map((use) => (
                  <button 
                    key={use}
                    onClick={() => setConfig({ ...config, useCase: use })}
                    className={`p-4 rounded-xl border transition-all text-left text-sm ${
                      config.useCase === use 
                      ? 'border-brand bg-brand/10 text-brand' 
                      : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30'
                    }`}
                  >
                    {use}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/40 block">Observações Adicionais</label>
                <textarea 
                  rows={4}
                  placeholder="Ex: Preciso de uma placa de vídeo específica, ou monitor incluso..."
                  value={config.additionalNotes}
                  onChange={(e) => setConfig({ ...config, additionalNotes: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-brand transition-colors text-white resize-none"
                />
              </div>

              <div className="glass-panel p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-3 text-brand">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold">Resumo da Configuração</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <span className="text-white/40">CPU:</span>
                  <span className="text-white font-mono">{config.cpuBrand || '-'}</span>
                  <span className="text-white/40">GPU:</span>
                  <span className="text-white line-clamp-1">{config.gpuTier?.split('/')[0] || '-'}</span>
                  <span className="text-white/40">Memória:</span>
                  <span className="text-white font-mono">{config.ramCapacity} {config.ramType} @ {config.ramSpeed}</span>
                  <span className="text-white/40">Disco:</span>
                  <span className="text-white font-mono">{config.storage || '-'}</span>
                  <span className="text-white/40">Estilo:</span>
                  <span className="text-white">{config.rgb ? 'Gamer RGB' : 'Sóbrio'}</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="flex-1 py-4 px-6 rounded-xl border border-white/10 text-white/60 font-bold hover:bg-white/5 transition-colors">
                  Corrigir
                </button>
                <button onClick={sendEmail} className="flex-[2] py-4 px-6 rounded-xl bg-brand text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                  Solicitar Orçamento <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen technical-grid flex flex-col relative overflow-hidden">
      {/* Dynamic Background Element */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="p-6 md:p-10 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand flex items-center justify-center">
            <Terminal className="text-black w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-display font-bold leading-tight">MASTER<br/><span className="text-brand">CONFIG</span></h1>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-[0.2em] text-white/40">
          <span>Precision Hardware</span>
          <span>Immersive Build</span>
          <span>Verified Specs</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col justify-center z-10">
        <AnimatePresence mode="wait">
          <div key={step}>
            {step > 0 && <StepIndicator current={step} total={totalSteps} />}
            {renderCurrentStep()}
          </div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-10 text-center z-10">
        <p className="text-xs text-white/20 font-mono tracking-widest uppercase">
          &copy; 2026 Master Configurator // Powered by AI Studio
        </p>
      </footer>
    </div>
  );
}
