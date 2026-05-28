import React, { useState } from "react";
import {
  Bell, CalendarDays, Church, HeartHandshake, Home, LogOut,
  MessageCircle, Send, ShieldAlert, Users, Music, Camera,
  Baby, UserRound, Heart, ChevronRight, Cross, HandHeart
} from "lucide-react";

const departments = [
  { name: "Jovens", icon: Users },
  { name: "Adolescentes", icon: UserRound },
  { name: "Infantil", icon: Baby },
  { name: "CIB", icon: Heart },
  { name: "Varões", icon: HandHeart },
  { name: "Louvor", icon: Music },
  { name: "Mídia", icon: Camera }
];

const agenda = [
  { day: "Qua", title: "Culto de Ensino", time: "19:00" },
  { day: "Sex", title: "Reunião de Jovens", time: "19:30" },
  { day: "Dom", title: "EBD", time: "09:00" },
  { day: "Dom", title: "Culto da Família", time: "19:00" }
];

const alerts = [
  { level: "Atenção", name: "Mariana Souza", text: "Acompanhamento pastoral recomendado." },
  { level: "Urgente", name: "Usuário teste", text: "Alerta crítico demonstrativo." }
];

function Header({ role, setRole }) {
  return (
    <header className="header">
      <div className="logoArea">
        <div className="logoIcon"><Cross size={22} /></div>
        <div>
          <h1>Peniel</h1>
          <p>Onde se vê a face de Deus</p>
        </div>
      </div>

      {role && (
        <button className="logout" onClick={() => setRole(null)}>
          <LogOut size={18} />
        </button>
      )}
    </header>
  );
}

function Login({ setRole }) {
  return (
    <main className="login">
      <section className="brandCard">
        <div className="churchLine">CADESC AD</div>
        <h2>Congregação Peniel</h2>
        <p>Onde se vê a face de Deus</p>
      </section>

      <section className="loginButtons">
        <button onClick={() => setRole("member")}>
          <span>Membro</span>
          <ChevronRight size={18} />
        </button>

        <button onClick={() => setRole("leader")}>
          <span>Líder</span>
          <ChevronRight size={18} />
        </button>

        <button onClick={() => setRole("pastor")}>
          <span>Pastor</span>
          <ChevronRight size={18} />
        </button>
      </section>
    </main>
  );
}

function HomePage({ role }) {
  if (role === "leader") return <LeaderPage />;
  if (role === "pastor") return <PastorPage />;

  return (
    <div className="page">
      <section className="welcome">
        <p>Bem-vindo</p>
        <h2>Congregação Peniel</h2>
      </section>

      <section className="nextEvent">
        <div>
          <p>Próximo compromisso</p>
          <h3>Culto de Ensino</h3>
          <span>Quarta-feira · 19:00</span>
        </div>
        <CalendarDays size={30} />
      </section>

      <div className="grid">
        <Action icon={CalendarDays} title="Agenda" />
        <Action icon={Bell} title="Avisos" />
        <Action icon={HeartHandshake} title="Oração" />
        <Action icon={MessageCircle} title="Assistente" />
      </div>

      <section className="section">
        <div className="sectionTitle">
          <h3>Departamentos</h3>
        </div>

        <div className="departments">
          {departments.map((d) => {
            const Icon = d.icon;
            return (
              <button key={d.name}>
                <Icon size={22} />
                <span>{d.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      <Agenda />
    </div>
  );
}

function Action({ icon: Icon, title }) {
  return (
    <button className="action">
      <Icon size={24} />
      <span>{title}</span>
    </button>
  );
}

function Agenda() {
  return (
    <section className="section">
      <div className="sectionTitle">
        <h3>Agenda da semana</h3>
      </div>

      <div className="agenda">
        {agenda.map((item) => (
          <div className="agendaItem" key={item.title + item.time}>
            <strong>{item.day}</strong>
            <div>
              <h4>{item.title}</h4>
              <p>{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChatPage() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Olá. Como posso ajudar hoje?" }
  ]);
  const [text, setText] = useState("");

  function send() {
    if (!text.trim()) return;

    const lower = text.toLowerCase();
    const risk =
      lower.includes("morrer") ||
      lower.includes("suic") ||
      lower.includes("tirar minha vida");

    const reply = risk
      ? "Sinto muito por você estar passando por isso. Não fique sozinho agora. Procure imediatamente alguém de confiança. Um alerta seria enviado para os responsáveis definidos."
      : "Entendi. Pode me contar melhor. Estou aqui para te ouvir e te orientar com calma.";

    setMessages([...messages, { from: "user", text }, { from: "bot", text: reply }]);
    setText("");
  }

  return (
    <div className="chatPage">
      <section className="chatHeader">
        <MessageCircle size={24} />
        <div>
          <h2>Assistente Peniel</h2>
          <p>Converse com calma.</p>
        </div>
      </section>

      <div className="messages">
        {messages.map((m, i) => (
          <div className={`msg ${m.from}`} key={i}>
            <span>{m.text}</span>
          </div>
        ))}
      </div>

      <div className="composer">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite aqui..."
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button onClick={send}><Send size={18} /></button>
      </div>
    </div>
  );
}

function LeaderPage() {
  return (
    <div className="page">
      <section className="welcome">
        <p>Painel do líder</p>
        <h2>Jovens e adolescentes</h2>
      </section>

      <section className="section">
        <div className="member">
          <strong>Ana Clara</strong>
          <span>Jovens · Estável</span>
        </div>
        <div className="member warn">
          <strong>Mariana Souza</strong>
          <span>Adolescentes · Atenção</span>
        </div>
      </section>

      <Alerts />
    </div>
  );
}

function PastorPage() {
  return (
    <div className="page">
      <section className="welcome">
        <p>Painel pastoral</p>
        <h2>Visão geral</h2>
      </section>

      <div className="stats">
        <div><strong>128</strong><span>Membros</span></div>
        <div><strong>7</strong><span>Departamentos</span></div>
        <div><strong>2</strong><span>Alertas</span></div>
      </div>

      <Alerts />
      <Agenda />
    </div>
  );
}

function Alerts() {
  return (
    <section className="section">
      <div className="sectionTitle">
        <h3>Alertas</h3>
        <ShieldAlert size={20} />
      </div>

      {alerts.map((a) => (
        <div className={`alert ${a.level === "Urgente" ? "danger" : ""}`} key={a.name}>
          <strong>{a.level}</strong>
          <h4>{a.name}</h4>
          <p>{a.text}</p>
        </div>
      ))}
    </section>
  );
}

function BottomNav({ tab, setTab, role }) {
  return (
    <nav className="nav">
      <button className={tab === "home" ? "active" : ""} onClick={() => setTab("home")}>
        <Home size={19} />
        <span>Início</span>
      </button>

      <button className={tab === "chat" ? "active" : ""} onClick={() => setTab("chat")}>
        <MessageCircle size={19} />
        <span>Assistente</span>
      </button>

      <button className={tab === "agenda" ? "active" : ""} onClick={() => setTab("agenda")}>
        <Church size={19} />
        <span>Peniel</span>
      </button>
    </nav>
  );
}

export default function App() {
  const [role, setRole] = useState(null);
  const [tab, setTab] = useState("home");

  let content;

  if (!role) content = <Login setRole={(r) => { setRole(r); setTab("home"); }} />;
  else if (tab === "chat") content = <ChatPage />;
  else if (tab === "agenda") content = <div className="page"><Agenda /></div>;
  else content = <HomePage role={role} />;

  return (
    <div className="app">
      <div className="phone">
        <Header role={role} setRole={setRole} />
        {content}
        {role && <BottomNav tab={tab} setTab={setTab} role={role} />}
      </div>
    </div>
  );
}
