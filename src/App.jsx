import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BookOpen,
  CalendarDays,
  Church,
  HeartHandshake,
  Home,
  LogOut,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  UserRound,
  Users,
  Wrench,
  Heart,
  Send,
  AlertTriangle,
  CheckCircle2,
  Cross,
} from "lucide-react";

const roles = {
  member: {
    label: "Membro",
    subtitle: "Acesso à agenda, IA, oração e avisos.",
    icon: UserRound,
  },
  leader: {
    label: "Líder",
    subtitle: "Acompanha seus liderados e alertas.",
    icon: Users,
  },
  pastor: {
    label: "Pastor",
    subtitle: "Visão geral administrativa e pastoral.",
    icon: Church,
  },
  support: {
    label: "Suporte Técnico",
    subtitle: "Manutenção, bugs e atualizações.",
    icon: Wrench,
  },
};

const agenda = [
  { day: "Quarta", title: "Culto de Ensino", time: "19:00", tag: "Culto" },
  { day: "Sexta", title: "Reunião de Jovens", time: "19:30", tag: "Juventude" },
  { day: "Domingo", title: "EBD", time: "09:00", tag: "Ensino" },
  { day: "Domingo", title: "Culto da Família", time: "19:00", tag: "Celebração" },
];

const members = [
  { name: "Ana Clara", age: 16, group: "Jovens", leader: "Líder Rafael", status: "Acompanhamento leve" },
  { name: "Lucas Henrique", age: 18, group: "Jovens", leader: "Líder Rafael", status: "Estável" },
  { name: "Mariana Souza", age: 15, group: "Adolescentes", leader: "Líder Bianca", status: "Atenção" },
];

const alerts = [
  {
    level: "Amarelo",
    title: "Sofrimento emocional recorrente",
    person: "Mariana Souza",
    route: "Líder Bianca → Pastor → Responsável legal se necessário",
    description: "A IA identificou frases de isolamento e tristeza constante. Sugestão: contato humano e acompanhamento pastoral.",
  },
  {
    level: "Vermelho",
    title: "Risco crítico simulado",
    person: "Usuário de demonstração",
    route: "Pastor + líder + responsável legal imediatamente",
    description: "Fluxo demonstrativo para casos de autoagressão, risco contra a própria vida, abuso ou violência.",
  },
];

const aiReplies = [
  "Ei, respira um pouquinho comigo. Você não precisa carregar isso sozinho. Quer me contar melhor o que aconteceu?",
  "Posso caminhar com você nessa conversa, mas também quero te lembrar: cuidado humano é importante. Posso te orientar a procurar seu líder?",
  "Jesus se importa com aquilo que você sente. Quer que eu compartilhe um versículo e registre isso como pedido de oração?",
  "Se isso estiver ficando pesado demais, eu vou te incentivar a falar com alguém responsável. Você não precisa passar por isso sozinho.",
];

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-white/15 bg-white/10 shadow-xl shadow-black/10 backdrop-blur-xl ${className}`}>{children}</div>;
}

function Pill({ children }) {
  return <span className="rounded-full border border-yellow-200/30 bg-yellow-100/15 px-3 py-1 text-xs text-yellow-100">{children}</span>;
}

function Header({ role, setRole }) {
  return (
    <div className="flex items-center justify-between gap-3 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-100/20 text-yellow-100">
          <Cross size={22} />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white">Peniel App</h1>
          <p className="text-xs text-blue-100/80">Onde se vê a face de Deus</p>
        </div>
      </div>
      {role && (
        <button onClick={() => setRole(null)} className="rounded-2xl bg-white/10 p-3 text-white hover:bg-white/20">
          <LogOut size={18} />
        </button>
      )}
    </div>
  );
}

function Login({ setRole }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-4 pb-8">
      <Card className="overflow-hidden p-6">
        <div className="mb-6 rounded-3xl bg-gradient-to-br from-white/20 to-yellow-100/10 p-6 text-center">
          <Sparkles className="mx-auto mb-3 text-yellow-100" size={34} />
          <h2 className="text-3xl font-bold text-white">Peniel</h2>
          <p className="mt-2 text-blue-50">Um ambiente de cuidado, organização e apoio espiritual.</p>
        </div>
        <p className="mb-4 text-sm text-blue-50/80">Escolha um perfil para demonstrar o funcionamento:</p>
        <div className="grid gap-3">
          {Object.entries(roles).map(([key, item]) => {
            const Icon = item.icon;
            return (
              <button key={key} onClick={() => setRole(key)} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-left transition hover:bg-white/20">
                <div className="rounded-2xl bg-blue-950/40 p-3 text-yellow-100"><Icon size={22} /></div>
                <div>
                  <div className="font-semibold text-white">Entrar como {item.label}</div>
                  <div className="text-xs text-blue-100/75">{item.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}

function MemberPanel() {
  return (
    <div className="space-y-4 px-4 pb-24">
      <Hero title="Paz do Senhor, seja bem-vindo." subtitle="Hoje é um bom dia para caminhar com Cristo, conversar e se organizar." />
      <QuickGrid />
      <Agenda />
      <PrayerCard />
    </div>
  );
}

function Hero({ title, subtitle }) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <Pill>CADESC AD · Congregação Peniel</Pill>
        <Sparkles className="text-yellow-100" size={20} />
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-blue-50/80">{subtitle}</p>
      <div className="mt-5 rounded-2xl bg-blue-950/35 p-4">
        <p className="text-xs uppercase tracking-wide text-yellow-100/80">Versículo do dia</p>
        <p className="mt-2 text-sm text-white">“Buscai ao Senhor enquanto se pode achar.”</p>
      </div>
    </Card>
  );
}

function QuickGrid() {
  const items = [
    [MessageCircle, "Conversar com a IA", "Acolhimento e reflexão"],
    [HeartHandshake, "Pedido de oração", "Enviar à intercessão"],
    [CalendarDays, "Agenda", "Eventos da semana"],
    [Bell, "Avisos", "Comunicados da igreja"],
  ];
  return <div className="grid grid-cols-2 gap-3">{items.map(([Icon, title, text]) => <Card key={title} className="p-4"><Icon className="mb-3 text-yellow-100" size={22}/><h3 className="text-sm font-semibold text-white">{title}</h3><p className="mt-1 text-xs text-blue-100/70">{text}</p></Card>)}</div>;
}

function Agenda() {
  return <Card className="p-5"><div className="mb-4 flex items-center gap-2 text-white"><CalendarDays size={20}/><h3 className="font-semibold">Agenda da semana</h3></div><div className="space-y-3">{agenda.map((a) => <div key={a.title} className="flex items-center justify-between rounded-2xl bg-white/10 p-3"><div><p className="text-sm font-medium text-white">{a.title}</p><p className="text-xs text-blue-100/70">{a.day} · {a.tag}</p></div><span className="rounded-xl bg-yellow-100/15 px-3 py-1 text-sm text-yellow-100">{a.time}</span></div>)}</div></Card>;
}

function PrayerCard() {
  return <Card className="p-5"><div className="flex items-center gap-2 text-white"><Heart size={20}/><h3 className="font-semibold">Pedidos de oração</h3></div><p className="mt-2 text-sm text-blue-50/75">Envie um pedido para a equipe responsável. Em casos sensíveis, a liderança poderá acompanhar com cuidado.</p><button className="mt-4 w-full rounded-2xl bg-yellow-100 px-4 py-3 font-semibold text-blue-950">Enviar pedido</button></Card>;
}

function ChatPanel() {
  const [messages, setMessages] = useState([{ from: "ai", text: "Oi, eu sou a Assistente Peniel. Estou aqui para te ouvir, refletir com você e te aproximar do cuidado humano quando for necessário." }]);
  const [input, setInput] = useState("");
  const send = () => {
    if (!input.trim()) return;
    const reply = input.toLowerCase().includes("morrer") || input.toLowerCase().includes("vida") ? "Eu sinto muito que você esteja sentindo isso. Por favor, não fique sozinho agora. Procure alguém de confiança imediatamente. Vou simular um alerta para que liderança e responsáveis possam agir com urgência." : aiReplies[Math.floor(Math.random() * aiReplies.length)];
    setMessages([...messages, { from: "user", text: input }, { from: "ai", text: reply }]);
    setInput("");
  };
  return <div className="flex h-[calc(100vh-150px)] flex-col px-4 pb-24"><Card className="mb-3 p-4"><h2 className="text-lg font-bold text-white">Assistente Peniel</h2><p className="text-xs text-blue-100/75">A IA apoia, mas não substitui pastores, líderes ou responsáveis.</p></Card><div className="flex-1 space-y-3 overflow-y-auto rounded-3xl bg-white/5 p-3">{messages.map((m, i) => <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-6 ${m.from === "user" ? "bg-yellow-100 text-blue-950" : "bg-white/15 text-white"}`}>{m.text}</div></div>)}</div><div className="mt-3 flex gap-2"><input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=> e.key === "Enter" && send()} placeholder="Digite um desabafo ou pergunta..." className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-blue-100/50 outline-none"/><button onClick={send} className="rounded-2xl bg-yellow-100 p-3 text-blue-950"><Send size={20}/></button></div></div>;
}

function LeaderPanel({ pastor = false }) {
  return <div className="space-y-4 px-4 pb-24"><Hero title={pastor ? "Painel pastoral" : "Painel do líder"} subtitle={pastor ? "Visão geral dos membros, departamentos, alertas e organização da Peniel." : "Acompanhe apenas os liderados vinculados ao seu departamento."}/><Card className="p-5"><div className="mb-4 flex items-center gap-2 text-white"><Users size={20}/><h3 className="font-semibold">{pastor ? "Membros acompanhados" : "Meus liderados"}</h3></div><div className="space-y-3">{members.map((m) => <div key={m.name} className="rounded-2xl bg-white/10 p-3"><div className="flex items-start justify-between gap-2"><div><p className="font-medium text-white">{m.name}</p><p className="text-xs text-blue-100/70">{m.age} anos · {m.group} · {pastor ? m.leader : "Vinculado a você"}</p></div><span className="rounded-xl bg-blue-950/40 px-2 py-1 text-xs text-yellow-100">{m.status}</span></div></div>)}</div></Card><Alerts full={pastor}/></div>;
}

function Alerts({ full }) {
  return <Card className="p-5"><div className="mb-4 flex items-center gap-2 text-white"><ShieldAlert size={20}/><h3 className="font-semibold">Alertas pastorais</h3></div><div className="space-y-3">{alerts.map((a) => <div key={a.title} className={`rounded-2xl p-4 ${a.level === "Vermelho" ? "bg-red-500/15" : "bg-yellow-500/15"}`}><div className="flex items-center gap-2"><AlertTriangle className={a.level === "Vermelho" ? "text-red-200" : "text-yellow-100"} size={18}/><p className="font-semibold text-white">Alerta {a.level}: {a.title}</p></div><p className="mt-2 text-sm text-blue-50/75">Pessoa: {a.person}</p><p className="mt-1 text-xs text-blue-100/70">Rota: {a.route}</p><p className="mt-2 text-sm leading-6 text-blue-50/80">{a.description}</p>{full && <button className="mt-3 rounded-2xl bg-white/15 px-4 py-2 text-sm font-medium text-white">Abrir acompanhamento</button>}</div>)}</div></Card>;
}

function SupportPanel() {
  return <div className="space-y-4 px-4 pb-24"><Hero title="Suporte técnico" subtitle="Área demonstrativa para manutenção, bugs, versões e atualizações. Sem autoridade espiritual sobre os membros."/><Card className="p-5"><div className="flex items-center gap-2 text-white"><CheckCircle2 size={20}/><h3 className="font-semibold">Status do protótipo</h3></div><div className="mt-4 space-y-2 text-sm text-blue-50/80"><p>Interface: pronta para demonstração.</p><p>Banco de dados: simulado.</p><p>IA: respostas simuladas.</p><p>Alertas: fluxo visual demonstrativo.</p></div></Card></div>;
}

function BottomNav({ tab, setTab, role }) {
  const items = role === "member" ? [["home", Home, "Início"], ["chat", MessageCircle, "IA"], ["agenda", CalendarDays, "Agenda"]] : [["home", Home, "Painel"], ["alerts", ShieldAlert, "Alertas"], ["chat", MessageCircle, "IA"]];
  return <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-md border-t border-white/10 bg-blue-950/90 px-4 py-3 backdrop-blur-xl"><div className="grid grid-cols-3 gap-2">{items.map(([key, Icon, label]) => <button key={key} onClick={() => setTab(key)} className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs ${tab === key ? "bg-yellow-100 text-blue-950" : "text-blue-100"}`}><Icon size={18}/>{label}</button>)}</div></div>;
}

export default function App() {
  const [role, setRole] = useState(null);
  const [tab, setTab] = useState("home");
  const bg = useMemo(() => "min-h-screen bg-[radial-gradient(circle_at_top,#1e4c7a_0%,#102b52_38%,#07152c_100%)]", []);
  const content = () => {
    if (!role) return <Login setRole={(r)=>{setRole(r); setTab("home");}} />;
    if (tab === "chat") return <ChatPanel />;
    if (tab === "alerts") return <div className="px-4 pb-24"><Alerts full={role === "pastor"}/></div>;
    if (tab === "agenda") return <div className="px-4 pb-24"><Agenda /></div>;
    if (role === "member") return <MemberPanel />;
    if (role === "leader") return <LeaderPanel />;
    if (role === "pastor") return <LeaderPanel pastor />;
    return <SupportPanel />;
  };
  return (
    <div className={`${bg} text-white`}>
      <div className="mx-auto min-h-screen max-w-md">
        <Header role={role} setRole={setRole} />
        <AnimatePresence mode="wait">
          <motion.div key={`${role}-${tab}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
            {content()}
          </motion.div>
        </AnimatePresence>
        {role && <BottomNav tab={tab} setTab={setTab} role={role} />}
      </div>
    </div>
  );
}
