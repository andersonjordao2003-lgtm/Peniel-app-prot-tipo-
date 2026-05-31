import React, { useEffect, useState } from "react";
import {
  Bell, CalendarDays, Church, HeartHandshake, Home, LogOut,
  MessageCircle, Send, ShieldAlert, Users, Music, Camera,
  Baby, UserRound, Heart, ChevronRight, HandHeart,
  Mail, Phone, UserPlus, KeyRound
} from "lucide-react";

const LOGO = "/24E7B741-7A3D-49B5-997C-A8D7674864FC.jpeg";

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

const baseMembers = [
  {
    name: "Ana Clara",
    birth: "2008-04-12",
    age: 16,
    dept: "Jovens",
    phone: "(21) 99999-0000",
    responsible: "Mãe: Patrícia",
    responsiblePhone: "(21) 98888-0000"
  },
  {
    name: "Lucas Henrique",
    birth: "2006-09-20",
    age: 18,
    dept: "Jovens",
    phone: "(21) 97777-0000",
    responsible: "",
    responsiblePhone: ""
  },
  {
    name: "Mariana Souza",
    birth: "2009-02-01",
    age: 15,
    dept: "Adolescentes",
    phone: "(21) 96666-0000",
    responsible: "Pai: Carlos",
    responsiblePhone: "(21) 95555-0000"
  }
];

const alerts = [
  {
    level: "Atenção",
    name: "Mariana Souza",
    text: "Acompanhamento pastoral recomendado."
  },
  {
    level: "Urgente",
    name: "Usuário teste",
    text: "Alerta crítico demonstrativo."
  }
];

function calculateAge(birth) {
  if (!birth) return "";
  const today = new Date();
  const date = new Date(birth);
  let age = today.getFullYear() - date.getFullYear();
  const month = today.getMonth() - date.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < date.getDate())) {
    age--;
  }

  return age;
}

function Header({ role, setRole }) {
  return (
    <header className="header">
      <div className="logoArea">
        <div className="logoIcon">
          <img src={LOGO} alt="Peniel" className="logoImage" />
        </div>

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

function Login({ setSelectedRole }) {
  return (
    <main className="login">
      <section className="brandCard">
        <div className="churchLine">CADESC AD</div>
        <h2>Congregação Peniel</h2>
        <p>Onde se vê a face de Deus</p>
      </section>

      <section className="loginButtons">
        <button onClick={() => setSelectedRole("member")}>
          <span>Membro</span>
          <ChevronRight size={18} />
        </button>

        <button onClick={() => setSelectedRole("leader")}>
          <span>Líder / Coordenador</span>
          <ChevronRight size={18} />
        </button>

        <button onClick={() => setSelectedRole("pastor")}>
          <span>Pastor</span>
          <ChevronRight size={18} />
        </button>
      </section>
    </main>
  );
}

function AuthPage({ selectedRole, setSelectedRole, setRole, addMember }) {
  const [mode, setMode] = useState("login");
  const [method, setMethod] = useState("app");

  const roleName =
    selectedRole === "member"
      ? "Membro"
      : selectedRole === "leader"
      ? "Líder / Coordenador"
      : "Pastor";

  return (
    <main className="page">
      <button className="backBtn" onClick={() => setSelectedRole(null)}>
        Voltar
      </button>

      <section className="welcome">
        <p>Acesso</p>
        <h2>{roleName}</h2>
      </section>

      <div className="authTabs">
        <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
          <KeyRound size={17} />
          Login
        </button>

        <button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>
          <UserPlus size={17} />
          Cadastro
        </button>
      </div>

      <div className="authMethods">
        <button className={method === "app" ? "active" : ""} onClick={() => setMethod("app")}>
          Cadastro normal
        </button>

        <button className={method === "google" ? "active" : ""} onClick={() => setMethod("google")}>
          <Mail size={16} />
          Google
        </button>

        <button className={method === "phone" ? "active" : ""} onClick={() => setMethod("phone")}>
          <Phone size={16} />
          Telefone
        </button>
      </div>

      {mode === "login" ? (
        <LoginForm selectedRole={selectedRole} setRole={setRole} method={method} />
      ) : (
        <RegisterForm
          selectedRole={selectedRole}
          setRole={setRole}
          method={method}
          addMember={addMember}
        />
      )}
    </main>
  );
}

function LoginForm({ selectedRole, setRole, method }) {
  return (
    <section className="section">
      {method === "google" && (
        <button className="googleBtn" onClick={() => setRole(selectedRole)}>
          <Mail size={18} />
          Entrar com Google
        </button>
      )}

      {method === "phone" && (
        <>
          <label>Número de telefone</label>
          <input placeholder="(21) 99999-9999" />

          <button className="primaryBtn" onClick={() => setRole(selectedRole)}>
            Entrar
          </button>
        </>
      )}

      {method === "app" && (
        <>
          <label>Usuário ou telefone</label>
          <input placeholder="Digite seu usuário ou telefone" />

          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" />

          <button className="primaryBtn" onClick={() => setRole(selectedRole)}>
            Entrar
          </button>
        </>
      )}
    </section>
  );
}

function RegisterForm({ selectedRole, setRole, method, addMember }) {
  const [form, setForm] = useState({
    name: "",
    birth: "",
    phone: "",
    dept: "Jovens",
    responsible: "",
    responsiblePhone: "",
    password: ""
  });

  const age = calculateAge(form.birth);
  const minor = age !== "" && age < 18;

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  function submit() {
    if (selectedRole === "member") {
      addMember({
        ...form,
        age,
        responsible: minor ? form.responsible : "",
        responsiblePhone: minor ? form.responsiblePhone : ""
      });
    }

    document.body.classList.add("successFlash");
    setTimeout(() => document.body.classList.remove("successFlash"), 700);

    setRole(selectedRole);
  }

  return (
    <section className="section">
      {method === "google" && (
        <button className="googleBtn">
          <Mail size={18} />
          Continuar com Google
        </button>
      )}

      {method === "phone" && (
        <>
          <label>Número de telefone</label>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="(21) 99999-9999"
          />
        </>
      )}

      <label>Nome completo</label>
      <input
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        placeholder="Digite seu nome"
      />

      <label>Data de nascimento</label>
      <input
        type="date"
        value={form.birth}
        onChange={(e) => update("birth", e.target.value)}
      />

      {selectedRole === "member" && (
        <>
          <label>Departamento</label>
          <select value={form.dept} onChange={(e) => update("dept", e.target.value)}>
            {departments.map((d) => (
              <option key={d.name}>{d.name}</option>
            ))}
          </select>
        </>
      )}

      {selectedRole !== "member" && (
        <>
          <label>Função</label>
          <input placeholder={selectedRole === "leader" ? "Ex: Líder de jovens" : "Ex: Pastor dirigente"} />
        </>
      )}

      {method === "app" && (
        <>
          <label>Criar senha</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="Digite uma senha"
          />
        </>
      )}

      {minor && selectedRole === "member" && (
        <div className="responsibleBox">
          <h3>Responsável legal</h3>

          <label>Nome do responsável</label>
          <input
            value={form.responsible}
            onChange={(e) => update("responsible", e.target.value)}
            placeholder="Ex: Mãe, pai ou responsável"
          />

          <label>Telefone do responsável</label>
          <input
            value={form.responsiblePhone}
            onChange={(e) => update("responsiblePhone", e.target.value)}
            placeholder="(21) 99999-9999"
          />
        </div>
      )}

      <button className="primaryBtn pulseBtn" onClick={submit}>
        Criar cadastro
      </button>
    </section>
  );
}

function HomePage({ role, members }) {
  if (role === "leader") return <LeaderPage members={members} />;
  if (role === "pastor") return <PastorPage members={members} />;

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

        <button onClick={send}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

function LeaderPage({ members }) {
  const visibleMembers = members.filter(
    (m) => m.dept === "Jovens" || m.dept === "Adolescentes"
  );

  return (
    <div className="page">
      <section className="welcome">
        <p>Painel do líder</p>
        <h2>Jovens e adolescentes</h2>
      </section>

      <MembersList members={visibleMembers} limited />
      <Alerts />
    </div>
  );
}

function PastorPage({ members }) {
  return (
    <div className="page">
      <section className="welcome">
        <p>Painel pastoral</p>
        <h2>Visão geral</h2>
      </section>

      <div className="stats">
        <div>
          <strong>{members.length}</strong>
          <span>Membros</span>
        </div>

        <div>
          <strong>7</strong>
          <span>Departamentos</span>
        </div>

        <div>
          <strong>2</strong>
          <span>Alertas</span>
        </div>
      </div>

      <MembersList members={members} />
      <Alerts />
      <Agenda />
    </div>
  );
}

function MembersList({ members, limited }) {
  return (
    <section className="section">
      <div className="sectionTitle">
        <h3>{limited ? "Meus liderados" : "Lista de membros"}</h3>
      </div>

      {members.map((m, index) => (
        <div className="member" key={index}>
          <strong>{m.name || "Novo membro"}</strong>
          <span>{m.age || "--"} anos · {m.dept}</span>

          {m.phone && <small>Telefone: {m.phone}</small>}
          {m.responsible && <small>Responsável: {m.responsible}</small>}
          {m.responsiblePhone && <small>Contato: {m.responsiblePhone}</small>}
        </div>
      ))}
    </section>
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

function BottomNav({ tab, setTab }) {
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
  const [selectedRole, setSelectedRole] = useState(null);
  const [tab, setTab] = useState("home");
  const [members, setMembers] = useState(baseMembers);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  function addMember(member) {
    setMembers([...members, member]);
  }

  if (splash) {
    return (
      <div className="splash">
        <div className="splashLogo">
          <img src={LOGO} alt="Peniel" className="splashLogoImage" />
        </div>

        <h1>Peniel</h1>
        <p>Onde se vê a face de Deus</p>
      </div>
    );
  }

  let content;

  if (!selectedRole && !role) {
    content = <Login setSelectedRole={setSelectedRole} />;
  } else if (selectedRole && !role) {
    content = (
      <AuthPage
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        setRole={(r) => {
          setRole(r);
          setSelectedRole(null);
          setTab("home");
        }}
        addMember={addMember}
      />
    );
  } else if (tab === "chat") {
    content = <ChatPage />;
  } else if (tab === "agenda") {
    content = (
      <div className="page">
        <Agenda />
      </div>
    );
  } else {
    content = <HomePage role={role} members={members} />;
  }

  return (
    <div className="app">
      <div className="phone">
        <Header
          role={role}
          setRole={(value) => {
            setRole(value);
            setSelectedRole(null);
          }}
        />

        {content}

        {role && <BottomNav tab={tab} setTab={setTab} />}
      </div>
    </div>
  );
}
