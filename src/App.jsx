import React, { useState } from "react";
import {
  AlertTriangle, Bell, BookOpen, CalendarDays, CheckCircle2, ChevronRight,
  Church, Cross, Heart, HeartHandshake, Home, LogOut, MessageCircle,
  Send, ShieldAlert, Sparkles, UserRound, Users, Wrench
} from "lucide-react";

const profiles = {
  member: { name: "Membro", desc: "Agenda, IA, oração e avisos.", icon: UserRound },
  leader: { name: "Líder", desc: "Acompanha seus liderados e alertas.", icon: Users },
  pastor: { name: "Pastor", desc: "Visão geral da igreja e alertas.", icon: Church },
  support: { name: "Suporte", desc: "Manutenção técnica e atualizações.", icon: Wrench }
};

const agenda = [
  { day: "Qua", title: "Culto de Ensino", time: "19:00", type: "Culto" },
  { day: "Sex", title: "Reunião de Jovens", time: "19:30", type: "Juventude" },
  { day: "Dom", title: "EBD", time: "09:00", type: "Ensino" },
  { day: "Dom", title: "Culto da Família", time: "19:00", type: "Celebração" }
];

const members = [
  { name: "Ana Clara", age: 16, dept: "Jovens", status: "Acompanhamento leve", level: "ok" },
  { name: "Lucas Henrique", age: 18, dept: "Jovens", status: "Estável", level: "good" },
  { name: "Mariana Souza", age: 15, dept: "Adolescentes", status: "Atenção pastoral", level: "warn" }
];

const alerts = [
  {
    level: "Amarelo",
    title: "Sofrimento emocional recorrente",
    person: "Mariana Souza",
    desc: "A IA identificou frases de isolamento, tristeza contínua e necessidade de acompanhamento humano.",
    route: "Líder responsável → Pastor → Responsável legal se necessário"
  },
  {
    level: "Vermelho",
    title: "Risco crítico simulado",
    person: "Usuário de demonstração",
    desc: "Fluxo usado para situações graves envolvendo risco contra a própria vida, autoagressão, abuso ou violência.",
    route: "Pastor + líder + responsável legal imediatamente"
  }
];

function Header({ role, setRole }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brandMark"><Cross size={22} /></div>
        <div>
          <h1>Peniel</h1>
          <p>Onde se vê a face de Deus</p>
        </div>
      </div>

      {role && (
        <button className="iconBtn" onClick={() => setRole(null)}>
          <LogOut size={19} />
        </button>
      )}
    </header>
  );
}

function Login({ setRole }) {
  return (
    <div className="page">
      <section className="hero">
        <div className="heroGlow"></div>
        <div className="heroIcon"><Sparkles size={34} /></div>
        <span className="badge">CADESC AD · Congregação Peniel</span>
        <h2>Um aplicativo de cuidado, organização e apoio espiritual.</h2>
        <p>
          Protótipo ministerial para demonstrar como a tecnologia pode servir como ponte entre membros, líderes e pastoreio.
        </p>
      </section>

      <div className="sectionTitle">
        <h3>Entrar como</h3>
        <span>Demonstração</span>
      </div>

      <div className="profileList">
        {Object.entries(profiles).map(([key, p]) => {
          const Icon = p.icon;
          return (
            <button className="profileCard" onClick={() => setRole(key)} key={key}>
              <div className="profileIcon"><Icon size={22} /></div>
              <div>
                <strong>{p.name}</strong>
                <small>{p.desc}</small>
              </div>
              <ChevronRight className="chev" size={19} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WelcomeCard() {
  return (
    <section className="welcome">
      <div className="welcomeTop">
        <span className="badge">Peniel App</span>
        <Sparkles size={20} />
      </div>

      <h2>Paz do Senhor.</h2>
      <p>
        Hoje é um bom dia para se aproximar de Cristo, organizar sua semana e conversar com segurança.
      </p>

      <div className="verse">
        <span>Versículo do dia</span>
        <p>“Buscai ao Senhor enquanto se pode achar.”</p>
      </div>
    </section>
  );
}

function QuickActions() {
  const items = [
    { icon: MessageCircle, title: "Assistente Peniel", desc: "Conversar e refletir" },
    { icon: HeartHandshake, title: "Oração", desc: "Enviar pedido" },
    { icon: CalendarDays, title: "Agenda", desc: "Eventos da semana" },
    { icon: Bell, title: "Avisos", desc: "Comunicados" }
  ];

  return (
    <div className="quickGrid">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button className="quickCard" key={item.title}>
            <Icon size={23} />
            <strong>{item.title}</strong>
            <small>{item.desc}</small>
          </button>
        );
      })}
    </div>
  );
}

function AgendaCard() {
  return (
    <section className="panel">
      <div className="panelHeader">
        <div>
          <h3>Agenda da semana</h3>
          <p>Cultos, reuniões e compromissos</p>
        </div>
        <CalendarDays size={23} />
      </div>

      <div className="list">
        {agenda.map((item) => (
          <div className="agendaItem" key={item.title + item.time}>
            <div className="datePill">{item.day}</div>
            <div className="itemInfo">
              <strong>{item.title}</strong>
              <small>{item.type}</small>
            </div>
            <span className="timePill">{item.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PrayerCard() {
  return (
    <section className="softPanel">
      <HeartHandshake size={25} />
      <h3>Pedidos de oração</h3>
      <p>
        Envie pedidos para a equipe responsável. Em casos sensíveis, a liderança poderá acompanhar com cuidado.
      </p>
      <button className="primaryBtn">Enviar pedido de oração</button>
    </section>
  );
}

function MemberDashboard() {
  return (
    <>
      <WelcomeCard />
      <QuickActions />
      <AgendaCard />
      <PrayerCard />
    </>
  );
}

function Chat() {
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Oi, eu sou a Assistente Peniel. Estou aqui para te ouvir, refletir com você e te aproximar do cuidado humano quando for necessário."
    }
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;

    const lower = input.toLowerCase();
    const critical =
      lower.includes("morrer") ||
      lower.includes("suic") ||
      lower.includes("tirar minha vida");

    const reply = critical
      ? "Eu sinto muito que você esteja passando por isso. Por favor, não fique sozinho agora. Procure imediatamente alguém de confiança. Neste protótipo, eu também simularia um alerta para liderança e responsáveis."
      : "Eu entendo. Obrigado por confiar esse sentimento aqui. Posso conversar com você, te lembrar da Palavra e também te incentivar a procurar seu líder, porque o cuidado humano é muito importante.";

    setMessages([...messages, { from: "user", text: input }, { from: "ai", text: reply }]);
    setInput("");
  }

  return (
    <div className="chatPage">
      <section className="assistantCard">
        <div className="assistantAvatar"><Sparkles size={24} /></div>
        <div>
          <h2>Assistente Peniel</h2>
          <p>Apoio cristão, reflexão e ponte com a liderança.</p>
        </div>
      </section>

      <div className="chatBox">
        {messages.map((m, i) => (
          <div className={`messageRow ${m.from}`} key={i}>
            <div className="bubble">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="composer">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={send}><Send size={19} /></button>
      </div>
    </div>
  );
}

function MembersList({ limited }) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <div>
          <h3>{limited ? "Meus jovens" : "Membros acompanhados"}</h3>
          <p>{limited ? "Visão limitada por departamento" : "Visão geral pastoral"}</p>
        </div>
        <Users size={23} />
      </div>

      <div className="list">
        {members.map((m) => (
          <div className="memberItem" key={m.name}>
            <div className="avatar">{m.name[0]}</div>
            <div className="memberInfo">
              <strong>{m.name}</strong>
              <small>{m.age} anos · {m.dept}</small>
            </div>
            <span className={`status ${m.level}`}>{m.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AlertsPanel({ full }) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <div>
          <h3>Alertas pastorais</h3>
          <p>A IA apoia, mas a liderança cuida</p>
        </div>
        <ShieldAlert size={23} />
      </div>

      <div className="list">
        {alerts.map((a) => (
          <div className={`alertCard ${a.level === "Vermelho" ? "red" : "yellow"}`} key={a.title}>
            <div className="alertTitle">
              <AlertTriangle size={19} />
              <strong>Alerta {a.level}</strong>
            </div>
            <h4>{a.title}</h4>
            <p>{a.desc}</p>
            <small>Pessoa: {a.person}</small>
            <small>Rota: {a.route}</small>
            {full && <button className="secondaryBtn">Abrir acompanhamento</button>}
          </div>
        ))}
      </div>
    </section>
  );
}

function LeaderDashboard() {
  return (
    <>
      <section className="welcome compact">
        <span className="badge">Painel do líder</span>
        <h2>Seus liderados</h2>
        <p>Acompanhe apenas os membros vinculados ao seu departamento.</p>
      </section>
      <MembersList limited />
      <AlertsPanel />
    </>
  );
}

function PastorDashboard() {
  return (
    <>
      <section className="welcome compact">
        <span className="badge">Painel pastoral</span>
        <h2>Visão geral da Peniel</h2>
        <p>Acesso administrativo e pastoral aos membros, departamentos, alertas e agenda.</p>
      </section>

      <div className="stats">
        <div><strong>128</strong><span>Membros</span></div>
        <div><strong>12</strong><span>Líderes</span></div>
        <div><strong>3</strong><span>Alertas</span></div>
      </div>

      <MembersList />
      <AlertsPanel full />
    </>
  );
}

function SupportDashboard() {
  return (
    <>
      <section className="welcome compact">
        <span className="badge">Suporte técnico</span>
        <h2>Manutenção do sistema</h2>
        <p>Área técnica para bugs, melhorias e atualizações. Sem autoridade espiritual sobre membros.</p>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <div>
            <h3>Status do protótipo</h3>
            <p>Ambiente demonstrativo</p>
          </div>
          <CheckCircle2 size={24} />
        </div>

        <div className="statusList">
          <p>Interface: versão visual 2.0</p>
          <p>Banco de dados: simulado</p>
          <p>IA: respostas simuladas</p>
          <p>Alertas: fluxo demonstrativo</p>
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <section className="panel">
        <div className="panelHeader">
          <div>
            <h3>Sobre o propósito</h3>
            <p>O coração do projeto</p>
          </div>
          <BookOpen size={24} />
        </div>

        <div className="aboutText">
          <p>
            O Peniel App é uma proposta de apoio ministerial para organização, acolhimento e cuidado.
          </p>
          <p>
            A IA não substitui pastores, líderes, responsáveis ou discipuladores. Ela funciona como ponte para aproximar pessoas do cuidado humano.
          </p>
        </div>
      </section>

      <section className="softPanel">
        <Heart size={25} />
        <h3>Frase central</h3>
        <p>“A tecnologia serve ao cuidado. O cuidado continua sendo humano, pastoral e cristão.”</p>
      </section>
    </>
  );
}

function Nav({ role, tab, setTab }) {
  const items =
    role === "member"
      ? [
          ["home", Home, "Início"],
          ["chat", MessageCircle, "IA"],
          ["about", BookOpen, "Sobre"]
        ]
      : [
          ["home", Home, "Painel"],
          ["alerts", ShieldAlert, "Alertas"],
          ["chat", MessageCircle, "IA"]
        ];

  return (
    <nav className="bottomNav">
      {items.map(([key, Icon, label]) => (
        <button className={tab === key ? "active" : ""} onClick={() => setTab(key)} key={key}>
          <Icon size={19} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export default function App() {
  const [role, setRole] = useState(null);
  const [tab, setTab] = useState("home");

  let content;

  if (!role) content = <Login setRole={(r) => { setRole(r); setTab("home"); }} />;
  else if (tab === "chat") content = <Chat />;
  else if (tab === "alerts") content = <AlertsPanel full={role === "pastor"} />;
  else if (tab === "about") content = <About />;
  else if (role === "leader") content = <LeaderDashboard />;
  else if (role === "pastor") content = <PastorDashboard />;
  else if (role === "support") content = <SupportDashboard />;
  else content = <MemberDashboard />;

  return (
    <main className="appShell">
      <section className="phoneFrame">
        <Header role={role} setRole={setRole} />
        <div className="content">{content}</div>
        {role && <Nav role={role} tab={tab} setTab={setTab} />}
      </section>
    </main>
  );
}
