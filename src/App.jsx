import React, { useEffect, useState } from "react";
import {
  Bell,
  CalendarDays,
  Home,
  LogOut,
  MessageCircle,
  Send,
  ShieldAlert,
  Users,
  Music,
  Camera,
  Baby,
  UserRound,
  Heart,
  ChevronRight,
  HandHeart,
  Mail,
  Phone,
  UserPlus,
  KeyRound,
  WifiOff,
  Megaphone,
  PlusCircle,
  Copy,
  QrCode,
  Upload,
  CircleDollarSign,
  User,
  HeartHandshake,
  CheckCircle2,
  Menu,
  X,
  Clock
} from "lucide-react";

import { supabase } from "./supabaseClient";

const LOGO = "/A9D982B8-6AE2-4A96-B0A4-89E3C789B392.png";

const departments = [
  { name: "Jovens", icon: Users },
  { name: "Adolescentes", icon: UserRound },
  { name: "Infantil", icon: Baby },
  { name: "CIB", icon: Heart },
  { name: "Varões", icon: HandHeart },
  { name: "Louvor", icon: Music },
  { name: "Mídia", icon: Camera }
];

const prayerCategories = [
  "Saúde",
  "Família",
  "Financeiro",
  "Emocional",
  "Espiritual",
  "Relacionamento",
  "Trabalho",
  "Outro"
];

const followupTypes = [
  "Pedido de oração",
  "Preciso conversar com um líder",
  "Preciso conversar com o pastor",
  "Preciso de acompanhamento pastoral"
];

const mediaRecords = [
  {
    title: "Culto da Família",
    date: "Domingo • 19h",
    description: "Registro do culto de domingo na Congregação Peniel.",
    photos: 32,
    videos: 4,
    category: "Cultos"
  },
  {
    title: "Congresso de Jovens",
    date: "Sábado • 18h",
    description: "Momentos especiais do congresso do departamento de jovens.",
    photos: 86,
    videos: 12,
    category: "Jovens"
  },
  {
    title: "Batismo",
    date: "Evento especial",
    description: "Registro do batismo realizado pela igreja.",
    photos: 24,
    videos: 2,
    category: "Batismos"
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

function getProfile() {
  return {
    name: localStorage.getItem("peniel_profile_name") || "Usuário Peniel",
    dept: localStorage.getItem("peniel_profile_dept") || "Não informado",
    phone: localStorage.getItem("peniel_profile_phone") || "Não informado"
  };
}

function getRoleName(role) {
  if (role === "pastor") return "Pastor";
  if (role === "leader") return "Líder / Coordenador";
  return "Membro";
}

function Header({ role, logout, openMenu }) {
  return (
    <header className="header">
      <div className="logoArea">
        {role && (
          <button className="menuButton" onClick={openMenu}>
            <Menu size={23} />
          </button>
        )}

        <div className="logoIcon">
          <img src={LOGO} alt="Peniel" className="logoImage" />
        </div>

        <div>
          <h1>Peniel</h1>
          <p>Onde se vê a face de Deus</p>
        </div>
      </div>

      {role && (
        <button className="logout" onClick={logout}>
          <LogOut size={18} />
        </button>
      )}
    </header>
  );
}

function SideMenu({ open, closeMenu, tab, setTab, role, logout }) {
  if (!open) return null;

  const items = [
    { id: "home", label: "Início", icon: Home },
    { id: "agenda", label: "Agenda", icon: CalendarDays },
    { id: "notices", label: "Avisos", icon: Bell },
    { id: "contribution", label: "Dízimos / Pix", icon: CircleDollarSign },
    { id: "prayer", label: "Centro de oração", icon: HeartHandshake },
    { id: "attendance", label: "Presença", icon: CheckCircle2 },
    { id: "media", label: "Mural da Congregação", icon: Camera },
    { id: "chat", label: "Assistente IA", icon: MessageCircle },
    { id: "profile", label: "Meu perfil", icon: User }
  ];

  function goTo(id) {
    setTab(id);
    closeMenu();
  }

  return (
    <div className="drawerOverlay" onClick={closeMenu}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawerHeader">
          <div className="drawerLogo">
            <img src={LOGO} alt="Peniel" />
          </div>

          <div>
            <h2>Peniel</h2>
            <p>{getRoleName(role)}</p>
          </div>

          <button className="drawerClose" onClick={closeMenu}>
            <X size={21} />
          </button>
        </div>

        <div className="drawerMenu">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={tab === item.id ? "active" : ""}
                onClick={() => goTo(item.id)}
              >
                <Icon size={21} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="drawerFooter">
          <button onClick={logout}>
            <LogOut size={19} />
            <span>Sair da conta</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

function OfflineBanner({ online }) {
  if (online) return null;

  return (
    <div className="offlineBanner">
      <WifiOff size={18} />
      <span>Sem conexão. Algumas informações podem não carregar.</span>
    </div>
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

function AuthPage({
  selectedRole,
  setSelectedRole,
  login,
  addMember,
  loginWithCredentials
}) {
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
        <button
          className={mode === "login" ? "active" : ""}
          onClick={() => setMode("login")}
        >
          <KeyRound size={17} />
          Login
        </button>

        <button
          className={mode === "register" ? "active" : ""}
          onClick={() => setMode("register")}
        >
          <UserPlus size={17} />
          Cadastro
        </button>
      </div>

      <div className="authMethods">
        <button
          className={method === "app" ? "active" : ""}
          onClick={() => setMethod("app")}
        >
          <KeyRound size={16} />
          Usuário
        </button>

        <button
          className={method === "google" ? "active" : ""}
          onClick={() => setMethod("google")}
        >
          <Mail size={16} />
          Google
        </button>

        <button
          className={method === "phone" ? "active" : ""}
          onClick={() => setMethod("phone")}
        >
          <Phone size={16} />
          Telefone
        </button>
      </div>

      {mode === "login" ? (
        <LoginForm
          selectedRole={selectedRole}
          method={method}
          loginWithCredentials={loginWithCredentials}
        />
      ) : (
        <RegisterForm
          selectedRole={selectedRole}
          login={login}
          addMember={addMember}
          setMode={setMode}
        />
      )}
    </main>
  );
}

function LoginForm({ selectedRole, method, loginWithCredentials }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submitLogin() {
    if (!username.trim() || !password.trim()) {
      alert("Preencha o nome de usuário e a senha.");
      return;
    }

    await loginWithCredentials(selectedRole, username, password);
  }

  return (
    <section className="section">
      {method === "app" && (
        <>
          <label>Nome de usuário</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu nome de usuário"
          />

          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />

          <button className="primaryBtn" onClick={submitLogin}>
            Entrar
          </button>
        </>
      )}

      {method === "google" && (
        <>
          <button
            className="googleBtn"
            onClick={() => alert("Login com Google será ativado na versão oficial.")}
          >
            <Mail size={18} />
            Entrar com Google
          </button>

          <div className="emptyState">
            Em breve, esta opção fará login usando uma conta Google real.
          </div>
        </>
      )}

      {method === "phone" && (
        <>
          <label>Número de telefone</label>
          <input placeholder="(21) 99999-9999" />

          <button
            className="primaryBtn"
            onClick={() =>
              alert("Login por telefone usará código SMS na versão oficial.")
            }
          >
            Receber código por SMS
          </button>
        </>
      )}
    </section>
  );
}

function RegisterForm({ selectedRole, login, addMember, setMode }) {
  const [form, setForm] = useState({
    name: "",
    birth: "",
    phone: "",
    dept: "Jovens",
    responsible: "",
    responsiblePhone: "",
    username: "",
    password: ""
  });

  const age = calculateAge(form.birth);
  const minor = age !== "" && age < 18;

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function submit() {
    if (!form.name.trim()) {
      alert("Preencha seu nome completo.");
      return;
    }

    if (!form.username.trim() || !form.password.trim()) {
      alert("Crie um nome de usuário e uma senha para acessar o aplicativo.");
      return;
    }

    const result = await addMember({
      ...form,
      age,
      role: selectedRole,
      responsible: minor ? form.responsible : "",
      responsiblePhone: minor ? form.responsiblePhone : ""
    });

    if (result?.duplicate) {
      const goLogin = window.confirm(
        "Já existe um cadastro com essas informações. Deseja ir para a tela de login?"
      );

      if (goLogin) setMode("login");
      return;
    }

    if (result?.error) {
      alert("Não foi possível criar o cadastro. Verifique os dados e tente novamente.");
      return;
    }

    localStorage.setItem("peniel_profile_name", form.name || "Membro Peniel");
    localStorage.setItem("peniel_profile_dept", form.dept || "Não informado");
    localStorage.setItem("peniel_profile_phone", form.phone || "Não informado");

    document.body.classList.add("successFlash");
    setTimeout(() => document.body.classList.remove("successFlash"), 700);

    login(selectedRole);
  }

  return (
    <section className="section">
      <label>Nome completo</label>
      <input
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        placeholder="Digite seu nome"
      />

      <label>Nome de usuário</label>
      <input
        value={form.username}
        onChange={(e) => update("username", e.target.value)}
        placeholder="Ex: anderson.peniel"
      />

      <label>Criar senha</label>
      <input
        type="password"
        value={form.password}
        onChange={(e) => update("password", e.target.value)}
        placeholder="Digite uma senha"
      />

      <label>Telefone</label>
      <input
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
        placeholder="(21) 99999-9999"
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
          <input
            placeholder={
              selectedRole === "leader"
                ? "Ex: Líder de jovens"
                : "Ex: Pastor dirigente"
            }
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

function HomePage({
  role,
  members,
  notices,
  events,
  online,
  prayers,
  attendance,
  setTab
}) {
  if (role === "leader") {
    return <LeaderPage members={members} attendance={attendance} />;
  }

  if (role === "pastor") {
    return (
      <PastorPage
        members={members}
        notices={notices}
        events={events}
        prayers={prayers}
        attendance={attendance}
      />
    );
  }

  const profile = getProfile();
  const nextEvent = events[0];
  const pendingPrayers = prayers.filter((p) => p.status !== "Atendido").length;
  const lastNotice = notices[0];

  return (
    <div className="page">
      <section className="welcome">
        <p>Bom dia 👋</p>
        <h2>{profile.name}</h2>
        <p>Que Deus abençoe seu dia.</p>
      </section>

      <section className="section verseCard">
        <div className="sectionTitle">
          <h3>Versículo do Dia</h3>
          <Heart size={20} />
        </div>

        <p style={{ fontStyle: "italic", lineHeight: "1.6", color: "#374151" }}>
          “Porque eu bem sei os planos que tenho para vós, diz o Senhor; planos de paz e não de mal.”
        </p>

        <strong style={{ display: "block", marginTop: 10, color: "#102b57" }}>
          Jeremias 29:11
        </strong>
      </section>

      <section className="nextEvent">
        <div>
          <p>Próximo compromisso</p>
          <h3>{nextEvent?.title || "Culto de Ensino"}</h3>
          <span>
            {nextEvent
              ? `${nextEvent.event_day} • ${nextEvent.event_time}`
              : "Quarta-feira • 19:00"}
          </span>
        </div>

        <CalendarDays size={30} />
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h3>Acesso rápido</h3>
          <Home size={20} />
        </div>

        <div className="quickGrid">
          <button onClick={() => setTab("agenda")}>
            <CalendarDays size={20} />
            <span>Agenda</span>
          </button>

          <button onClick={() => setTab("notices")}>
            <Bell size={20} />
            <span>Avisos</span>
          </button>

          <button onClick={() => setTab("prayer")}>
            <HeartHandshake size={20} />
            <span>Oração</span>
          </button>

          <button onClick={() => setTab("contribution")}>
            <CircleDollarSign size={20} />
            <span>Pix</span>
          </button>
        </div>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h3>Avisos recentes</h3>
          <Megaphone size={20} />
        </div>

        {!online && (
          <div className="emptyState">
            Não foi possível carregar os avisos. Verifique sua conexão.
          </div>
        )}

        {online && notices.length === 0 && (
          <div className="emptyState">Nenhum aviso publicado no momento.</div>
        )}

        {online && notices.slice(0, 2).map((notice) => (
          <div className="noticeCard" key={notice.id}>
            <strong>{notice.title}</strong>
            <p>{notice.message}</p>
            <small>{notice.target || "Todos"} · {notice.author || "Peniel"}</small>
          </div>
        ))}

        {lastNotice && (
          <button className="secondaryBtn" onClick={() => setTab("notices")}>
            Ver todos os avisos
          </button>
        )}
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h3>Centro de oração</h3>
          <HeartHandshake size={20} />
        </div>

        <div className="noticeCard">
          <strong>{pendingPrayers} solicitações em acompanhamento</strong>
          <p>
            Envie um pedido de oração ou solicite cuidado pastoral de forma privada.
          </p>
        </div>

        <button className="secondaryBtn" onClick={() => setTab("prayer")}>
          Abrir Centro de Oração
        </button>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h3>Últimos registros</h3>
          <Camera size={20} />
        </div>

        {mediaRecords.slice(0, 3).map((item) => (
          <div className="noticeCard" key={item.title}>
            <strong>📸 {item.title}</strong>
            <p>{item.description}</p>
            <small>
              {item.photos} fotos · {item.videos} vídeos · {item.category}
            </small>
          </div>
        ))}

        <button className="secondaryBtn" onClick={() => setTab("media")}>
          Abrir Mural da Congregação
        </button>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h3>Dízimos e ofertas</h3>
          <CircleDollarSign size={20} />
        </div>

        <div className="noticeCard">
          <strong>Contribua com a obra</strong>
          <p>Utilize a área de contribuição para acessar o Pix da igreja.</p>
        </div>

        <button className="secondaryBtn" onClick={() => setTab("contribution")}>
          Ver Pix da igreja
        </button>
      </section>
    </div>
  );
}

function AgendaPage({ events, online }) {
  return (
    <div className="page">
      <section className="welcome">
        <p>Agenda</p>
        <h2>Programação da igreja</h2>
      </section>

      {!online && (
        <section className="section">
          <div className="emptyState">
            Não foi possível atualizar a agenda. Mostrando informações salvas.
          </div>
        </section>
      )}

      <EventsList events={events} />
    </div>
  );
}

function EventsList({ events }) {
  return (
    <section className="section">
      <div className="sectionTitle">
        <h3>Eventos</h3>
        <CalendarDays size={20} />
      </div>

      <div className="agenda">
        {events.length === 0 && (
          <div className="emptyState">Nenhum evento cadastrado.</div>
        )}

        {events.map((item) => (
          <div className="agendaItem" key={item.id}>
            <strong>{item.event_day?.slice(0, 3) || "Dia"}</strong>

            <div>
              <h4>{item.title}</h4>
              <p>{item.event_time} · {item.department || "Todos"}</p>
              {item.description && <p>{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NoticesPage({ notices, online }) {
  return (
    <div className="page">
      <section className="welcome">
        <p>Mural</p>
        <h2>Avisos da igreja</h2>
      </section>

      <NoticesList notices={notices} online={online} />
    </div>
  );
}

function NoticesList({ notices, online }) {
  return (
    <section className="section">
      <div className="sectionTitle">
        <h3>Comunicados</h3>
        <Bell size={20} />
      </div>

      {!online && (
        <div className="emptyState">
          Não foi possível conectar no momento. Verifique sua rede e tente novamente.
        </div>
      )}

      {online && notices.length === 0 && (
        <div className="emptyState">Nenhum aviso publicado ainda.</div>
      )}

      {online && notices.map((notice) => (
        <div className="noticeCard" key={notice.id}>
          <strong>{notice.title}</strong>
          <p>{notice.message}</p>
          <small>{notice.target || "Todos"} · {notice.author || "Peniel"}</small>
        </div>
      ))}
    </section>
  );
}

function ContributionPage({ contribution, online }) {
  const pixKey = contribution?.pix_key || "pix-da-igreja@exemplo.com";
  const pixType = contribution?.pix_type || "E-mail";
  const churchName = contribution?.church_name || "Congregação Peniel";
  const bankName = contribution?.bank_name || "Banco da Igreja";
  const qrCodeUrl =
    contribution?.qr_code_url ||
    "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=PIX-DEMONSTRACAO-PENIEL";
  const description =
    contribution?.description || "Área destinada a dízimos, missões e campanhas.";

  async function copyPix() {
    try {
      await navigator.clipboard.writeText(pixKey);
      alert("Chave Pix copiada.");
    } catch {
      alert("Não foi possível copiar automaticamente. Copie manualmente a chave exibida.");
    }
  }

  function uploadProof() {
    alert("Na versão oficial, esta área permitirá enviar o comprovante para a tesouraria.");
  }

  return (
    <div className="page">
      <section className="welcome contributionHero">
        <p>Contribuição</p>
        <h2>Dízimos e Ofertas</h2>
      </section>

      {!online && (
        <section className="section">
          <div className="emptyState">
            Sem conexão. As informações exibidas podem estar desatualizadas.
          </div>
        </section>
      )}

      <section className="section qrSection">
        <div className="sectionTitle">
          <h3>QR Code Pix</h3>
          <QrCode size={21} />
        </div>

        <img
          src={qrCodeUrl}
          alt="QR Code Pix"
          style={{
            width: 190,
            height: 190,
            display: "block",
            margin: "10px auto 14px",
            padding: 10,
            borderRadius: 22,
            background: "#ffffff",
            border: "8px solid #f3f6fb",
            objectFit: "cover"
          }}
        />

        <p className="qrText">
          Escaneie o QR Code utilizando o aplicativo do seu banco.
        </p>
      </section>

      <section className="section pixBox">
        <div className="sectionTitle">
          <h3>Pix da igreja</h3>
          <CircleDollarSign size={21} />
        </div>

        <div className="pixInfo">
          <span>Igreja</span>
          <strong>{churchName}</strong>
        </div>

        <div className="pixInfo">
          <span>Tipo da chave</span>
          <strong>{pixType}</strong>
        </div>

        <div className="pixInfo">
          <span>Chave Pix</span>
          <strong>{pixKey}</strong>
        </div>

        <div className="pixInfo">
          <span>Banco</span>
          <strong>{bankName}</strong>
        </div>

        <p className="pixDescription">{description}</p>

        <button className="primaryBtn" onClick={copyPix}>
          <Copy size={18} />
          Copiar chave Pix
        </button>
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h3>Finalidade</h3>
        </div>

        <div className="campaignList">
          <button>Dízimo</button>
          <button>Missões</button>
          <button>Campanhas</button>
        </div>

        <button className="secondaryBtn" onClick={uploadProof}>
          <Upload size={18} />
          Enviar comprovante
        </button>
      </section>

      <section className="section">
        <div className="emptyState">
          Confirme os dados da igreja antes de concluir a transferência no aplicativo do seu banco.
        </div>
      </section>
    </div>
  );
}

function PrayerPage({ role, prayers, addPrayer, updatePrayerStatus, online }) {
  if (role === "pastor" || role === "leader") {
    return (
      <div className="page">
        <section className="welcome">
          <p>Centro de oração</p>
          <h2>Cuidado pastoral</h2>
        </section>

        <PrayerList prayers={prayers} updatePrayerStatus={updatePrayerStatus} showControls />
      </div>
    );
  }

  return (
    <div className="page">
      <section className="welcome">
        <p>Centro de oração</p>
        <h2>Como podemos cuidar de você?</h2>
      </section>

      {!online && (
        <section className="section">
          <div className="emptyState">
            Sem conexão. Não será possível enviar sua solicitação neste momento.
          </div>
        </section>
      )}

      <PrayerForm addPrayer={addPrayer} />

      <section className="section">
        <div className="emptyState">
          Sua solicitação será enviada de forma privada para a liderança responsável.
        </div>
      </section>
    </div>
  );
}

function PrayerForm({ addPrayer }) {
  const profile = getProfile();

  const [form, setForm] = useState({
    title: "",
    message: "",
    category: "Espiritual",
    followup_type: "Pedido de oração",
    anonymous: false
  });

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function submit() {
    if (!form.title.trim() || !form.message.trim()) {
      alert("Preencha o título e a mensagem.");
      return;
    }

    await addPrayer({
      name: profile.name,
      department: profile.dept,
      title: form.title,
      message: form.message,
      category: form.category,
      followup_type: form.followup_type,
      anonymous: form.anonymous,
      priority: form.followup_type === "Pedido de oração" ? "Normal" : "Alta"
    });

    setForm({
      title: "",
      message: "",
      category: "Espiritual",
      followup_type: "Pedido de oração",
      anonymous: false
    });
  }

  return (
    <section className="section">
      <div className="sectionTitle">
        <h3>Nova solicitação</h3>
        <HeartHandshake size={20} />
      </div>

      <div className="noticeForm">
        <label>Tipo de cuidado</label>
        <select
          value={form.followup_type}
          onChange={(e) => update("followup_type", e.target.value)}
        >
          {followupTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <label>Categoria</label>
        <select
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
        >
          {prayerCategories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <label>Título</label>
        <input
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Ex: Preciso de oração pela minha família"
        />

        <label>Mensagem</label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Digite sua solicitação..."
        />

        <button
          className="secondaryBtn"
          onClick={() => update("anonymous", !form.anonymous)}
        >
          {form.anonymous ? "✓ Enviar anonimamente" : "Enviar identificado"}
        </button>

        <button className="primaryBtn" onClick={submit}>
          Enviar solicitação
        </button>
      </div>
    </section>
  );
}

function PrayerList({ prayers, updatePrayerStatus, showControls }) {
  const received = prayers.filter(
    (p) => !p.status || p.status === "Pendente" || p.status === "Recebido"
  );
  const following = prayers.filter((p) => p.status === "Em acompanhamento");
  const done = prayers.filter((p) => p.status === "Atendido");

  function PrayerCard({ p }) {
    const high = p.priority === "Alta" || p.followup_type !== "Pedido de oração";

    return (
      <div className={`noticeCard ${high ? "prayerHigh" : ""}`} key={p.id}>
        <strong>{p.title || "Pedido de oração"}</strong>
        <p>{p.message || p.pedido}</p>

        <small>
          {p.anonymous ? "Anônimo" : p.name || p.membro} ·{" "}
          {p.department || "Não informado"}
        </small>

        <small>
          {p.category || "Outro"} · {p.followup_type || "Pedido de oração"}
        </small>

        {high && (
          <div className="careBadge">
            <ShieldAlert size={15} />
            Solicita acompanhamento
          </div>
        )}

        {showControls && (
          <>
            <button
              className="secondaryBtn"
              onClick={() => updatePrayerStatus(p.id, "Em acompanhamento")}
            >
              <Clock size={17} />
              Em acompanhamento
            </button>

            <button
              className="secondaryBtn"
              onClick={() => updatePrayerStatus(p.id, "Atendido")}
            >
              <CheckCircle2 size={17} />
              Marcar como atendido
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <section className="section">
        <div className="sectionTitle">
          <h3>Recebidos</h3>
          <HeartHandshake size={20} />
        </div>

        {received.length === 0 && (
          <div className="emptyState">Nenhuma solicitação recebida.</div>
        )}

        {received.map((p) => (
          <PrayerCard p={p} key={p.id} />
        ))}
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h3>Em acompanhamento</h3>
          <Clock size={20} />
        </div>

        {following.length === 0 && (
          <div className="emptyState">Nenhuma solicitação em acompanhamento.</div>
        )}

        {following.map((p) => (
          <PrayerCard p={p} key={p.id} />
        ))}
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h3>Atendidos</h3>
          <CheckCircle2 size={20} />
        </div>

        {done.length === 0 && (
          <div className="emptyState">Nenhuma solicitação atendida ainda.</div>
        )}

        {done.map((p) => (
          <PrayerCard p={p} key={p.id} />
        ))}
      </section>
    </>
  );
}

function AttendancePage({
  role,
  members,
  events,
  attendance,
  markAttendance,
  online
}) {
  if (role !== "pastor" && role !== "leader") {
    return (
      <div className="page">
        <section className="welcome">
          <p>Presença</p>
          <h2>Acompanhamento pastoral</h2>
        </section>

        <section className="section">
          <div className="emptyState">
            Esta área é usada pela liderança para registrar presença nos cultos e eventos.
          </div>
        </section>
      </div>
    );
  }

  const [selectedEventId, setSelectedEventId] = useState("");
  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const recordsForEvent = attendance.filter((a) => {
    if (!selectedEvent) return false;
    return String(a.event_id) === String(selectedEvent.id);
  });

  const presentCount = recordsForEvent.filter((r) => r.status === "Presente").length;
  const absentCount = recordsForEvent.filter((r) => r.status === "Ausente").length;

  function memberStatus(member) {
    const found = recordsForEvent.find(
      (r) => String(r.member_id) === String(member.id)
    );
    return found?.status || "Não marcado";
  }

  return (
    <div className="page">
      <section className="welcome">
        <p>Presença</p>
        <h2>Registro por liderança</h2>
      </section>

      {!online && (
        <section className="section">
          <div className="emptyState">
            Sem conexão. Não será possível salvar presenças neste momento.
          </div>
        </section>
      )}

      <section className="section">
        <div className="sectionTitle">
          <h3>Evento</h3>
          <CalendarDays size={20} />
        </div>

        {events.length === 0 && (
          <div className="emptyState">
            Cadastre um evento na agenda antes de registrar presença.
          </div>
        )}

        {events.length > 0 && (
          <>
            <label>Selecione o culto/evento</label>
            <select
              value={selectedEvent?.id || ""}
              onChange={(e) => setSelectedEventId(e.target.value)}
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title} · {event.event_day} {event.event_time}
                </option>
              ))}
            </select>
          </>
        )}
      </section>

      <div className="stats">
        <div>
          <strong>{presentCount}</strong>
          <span>Presentes</span>
        </div>

        <div>
          <strong>{absentCount}</strong>
          <span>Ausentes</span>
        </div>

        <div>
          <strong>{members.length}</strong>
          <span>Membros</span>
        </div>
      </div>

      <section className="section">
        <div className="sectionTitle">
          <h3>Lista de presença</h3>
          <CheckCircle2 size={20} />
        </div>

        {members.length === 0 && (
          <div className="emptyState">Nenhum membro cadastrado.</div>
        )}

        {members.map((member) => (
          <div className="member" key={member.id}>
            <strong>{member.nome || "Membro"}</strong>
            <span>
              {member.departamento || "Sem departamento"} · {memberStatus(member)}
            </span>

            <button
              className="secondaryBtn"
              onClick={() => markAttendance(selectedEvent, member, "Presente")}
            >
              Marcar presente
            </button>

            <button
              className="secondaryBtn"
              onClick={() => markAttendance(selectedEvent, member, "Ausente")}
            >
              Marcar ausente
            </button>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h3>Histórico recente</h3>
          <Clock size={20} />
        </div>

        {attendance.length === 0 && (
          <div className="emptyState">Nenhum registro de presença ainda.</div>
        )}

        {attendance.slice(0, 8).map((record) => (
          <div className="noticeCard" key={record.id}>
            <strong>{record.member_name}</strong>
            <p>{record.event_title}</p>
            <small>
              {record.department || "Não informado"} · {record.status}
            </small>
          </div>
        ))}
      </section>
    </div>
  );
}

function MediaPage({ role }) {
  function fakeUpload() {
    alert("Na versão oficial, esta área enviará fotos e vídeos para o Storage do Supabase.");
  }

  return (
    <div className="page">
      <section className="welcome">
        <p>Mural</p>
        <h2>Registros da Congregação</h2>
      </section>

      {(role === "pastor" || role === "leader") && (
        <section className="section">
          <div className="sectionTitle">
            <h3>Central da Mídia</h3>
            <Upload size={20} />
          </div>

          <div className="emptyState">
            A equipe de mídia poderá criar álbuns, anexar fotos, vídeos, artes e materiais da igreja.
          </div>

          <button className="primaryBtn" onClick={fakeUpload}>
            <Upload size={18} />
            Adicionar registro
          </button>
        </section>
      )}

      <section className="section">
        <div className="sectionTitle">
          <h3>Álbuns da igreja</h3>
          <Camera size={20} />
        </div>

        {mediaRecords.map((item) => (
          <div className="noticeCard" key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
            <small>
              {item.date} · {item.photos} fotos · {item.videos} vídeos
            </small>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h3>Categorias</h3>
          <Camera size={20} />
        </div>

        <div className="campaignList">
          <button>Cultos</button>
          <button>Jovens</button>
          <button>Batismos</button>
          <button>Eventos</button>
        </div>
      </section>
    </div>
  );
}

function ProfilePage({ role, logout }) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(getProfile());

  const roleName = getRoleName(role);

  function saveProfile() {
    localStorage.setItem("peniel_profile_name", profile.name);
    localStorage.setItem("peniel_profile_dept", profile.dept);
    localStorage.setItem("peniel_profile_phone", profile.phone);
    setEditing(false);
    alert("Perfil atualizado.");
  }

  return (
    <div className="page">
      <section className="welcome">
        <p>Perfil</p>
        <h2>Minha conta</h2>
      </section>

      <section className="section profileCard">
        <div className="profileAvatar">
          <User size={34} />
        </div>

        <h3>{profile.name}</h3>
        <p>{roleName}</p>
      </section>

      <section className="section">
        {!editing && (
          <>
            <div className="profileInfo">
              <span>Departamento</span>
              <strong>{profile.dept}</strong>
            </div>

            <div className="profileInfo">
              <span>Telefone</span>
              <strong>{profile.phone}</strong>
            </div>

            <div className="profileInfo">
              <span>Congregação</span>
              <strong>Peniel</strong>
            </div>

            <button className="secondaryBtn" onClick={() => setEditing(true)}>
              Editar perfil
            </button>

            <button className="primaryBtn" onClick={logout}>
              Sair da conta
            </button>
          </>
        )}

        {editing && (
          <>
            <label>Nome</label>
            <input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />

            <label>Departamento</label>
            <select
              value={profile.dept}
              onChange={(e) => setProfile({ ...profile, dept: e.target.value })}
            >
              <option>Não informado</option>
              {departments.map((d) => (
                <option key={d.name}>{d.name}</option>
              ))}
            </select>

            <label>Telefone</label>
            <input
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="(21) 99999-9999"
            />

            <button className="primaryBtn" onClick={saveProfile}>
              Salvar perfil
            </button>

            <button className="secondaryBtn" onClick={() => setEditing(false)}>
              Cancelar
            </button>
          </>
        )}
      </section>
    </div>
  );
}

function ChatPage({ online }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Olá. Como posso ajudar hoje?" }
  ]);

  const [text, setText] = useState("");

  function send() {
    if (!text.trim()) return;

    if (!online) {
      setMessages([
        ...messages,
        { from: "user", text },
        {
          from: "bot",
          text: "Não foi possível se conectar no momento. Verifique sua rede e tente novamente."
        }
      ]);
      setText("");
      return;
    }

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
          <p>{online ? "Converse com calma." : "Sem conexão no momento."}</p>
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

function LeaderPage({ members, attendance }) {
  const visibleMembers = members.filter((m) => {
    const dept = m.departamento || m.dept;
    return dept === "Jovens" || dept === "Adolescentes";
  });

  return (
    <div className="page">
      <section className="welcome">
        <p>Painel do líder</p>
        <h2>Jovens e adolescentes</h2>
      </section>

      <MembersList members={visibleMembers} limited />

      <section className="section">
        <div className="sectionTitle">
          <h3>Presença</h3>
          <CheckCircle2 size={20} />
        </div>

        <div className="emptyState">
          Use a aba Presença no menu lateral para registrar presença dos membros nos cultos e eventos.
        </div>
      </section>

      <Alerts />
    </div>
  );
}

function PastorPage({ members, notices, events, prayers, attendance }) {
  const [panelTab, setPanelTab] = useState("overview");

  const pendingPrayers = prayers.filter((p) => p.status !== "Atendido");
  const presentCount = attendance.filter((a) => a.status === "Presente").length;
  const absentCount = attendance.filter((a) => a.status === "Ausente").length;

  return (
    <div className="page">
      <section className="welcome">
        <p>Painel pastoral</p>
        <h2>Administração</h2>
      </section>

      <div className="pastorTabs">
        <button
          className={panelTab === "overview" ? "active" : ""}
          onClick={() => setPanelTab("overview")}
        >
          Geral
        </button>

        <button
          className={panelTab === "notices" ? "active" : ""}
          onClick={() => setPanelTab("notices")}
        >
          Avisos
        </button>

        <button
          className={panelTab === "agenda" ? "active" : ""}
          onClick={() => setPanelTab("agenda")}
        >
          Agenda
        </button>

        <button
          className={panelTab === "members" ? "active" : ""}
          onClick={() => setPanelTab("members")}
        >
          Membros
        </button>

        <button
          className={panelTab === "prayers" ? "active" : ""}
          onClick={() => setPanelTab("prayers")}
        >
          Cuidado
        </button>

        <button
          className={panelTab === "attendance" ? "active" : ""}
          onClick={() => setPanelTab("attendance")}
        >
          Presença
        </button>

        <button
          className={panelTab === "alerts" ? "active" : ""}
          onClick={() => setPanelTab("alerts")}
        >
          Alertas
        </button>
      </div>

      {panelTab === "overview" && (
        <>
          <div className="stats">
            <div>
              <strong>{members.length}</strong>
              <span>Membros</span>
            </div>

            <div>
              <strong>{pendingPrayers.length}</strong>
              <span>Cuidados</span>
            </div>

            <div>
              <strong>{presentCount}</strong>
              <span>Presenças</span>
            </div>
          </div>

          <section className="section">
            <div className="sectionTitle">
              <h3>Resumo</h3>
              <ShieldAlert size={20} />
            </div>

            <div className="emptyState">
              Use as abas acima para gerenciar avisos, agenda, membros, cuidado pastoral, presença e alertas.
            </div>
          </section>
        </>
      )}

      {panelTab === "notices" && <NoticeComposer />}

      {panelTab === "agenda" && (
        <>
          <EventComposer />
          <EventsList events={events} />
        </>
      )}

      {panelTab === "members" && <MembersList members={members} />}

      {panelTab === "prayers" && (
        <PrayerList prayers={prayers} updatePrayerStatus={() => {}} showControls={false} />
      )}

      {panelTab === "attendance" && (
        <>
          <div className="stats">
            <div>
              <strong>{presentCount}</strong>
              <span>Presentes</span>
            </div>

            <div>
              <strong>{absentCount}</strong>
              <span>Ausentes</span>
            </div>

            <div>
              <strong>{attendance.length}</strong>
              <span>Registros</span>
            </div>
          </div>

          <section className="section">
            <div className="sectionTitle">
              <h3>Histórico de presença</h3>
              <CheckCircle2 size={20} />
            </div>

            {attendance.length === 0 && (
              <div className="emptyState">Nenhum registro de presença ainda.</div>
            )}

            {attendance.slice(0, 12).map((record) => (
              <div className="noticeCard" key={record.id}>
                <strong>{record.member_name}</strong>
                <p>{record.event_title}</p>
                <small>{record.department || "Não informado"} · {record.status}</small>
              </div>
            ))}
          </section>
        </>
      )}

      {panelTab === "alerts" && <Alerts />}
    </div>
  );
}

function NoticeComposer() {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState({
    title: "",
    message: "",
    target: "Todos"
  });
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setNotice({ ...notice, [field]: value });
  }

  async function publishNotice() {
    if (!notice.title.trim() || !notice.message.trim()) {
      alert("Preencha o título e a mensagem do aviso.");
      return;
    }

    if (!navigator.onLine) {
      alert("Não foi possível publicar. Verifique sua conexão.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("notices").insert({
      title: notice.title,
      message: notice.message,
      target: notice.target,
      author: "Pastoral Peniel"
    });

    setSaving(false);

    if (error) {
      alert("Não foi possível publicar o aviso.");
      return;
    }

    setNotice({ title: "", message: "", target: "Todos" });
    setOpen(false);

    document.body.classList.add("successFlash");
    setTimeout(() => document.body.classList.remove("successFlash"), 700);
  }

  return (
    <section className="section">
      <div className="sectionTitle">
        <h3>Mural de avisos</h3>
        <Megaphone size={20} />
      </div>

      {!open && (
        <button className="primaryBtn" onClick={() => setOpen(true)}>
          <PlusCircle size={18} />
          Novo aviso
        </button>
      )}

      {open && (
        <div className="noticeForm">
          <label>Título do aviso</label>
          <input
            value={notice.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Ex: Ensaio do louvor"
          />

          <label>Mensagem</label>
          <textarea
            value={notice.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Digite o comunicado..."
          />

          <label>Destinatários</label>
          <select
            value={notice.target}
            onChange={(e) => update("target", e.target.value)}
          >
            <option>Todos</option>
            {departments.map((d) => (
              <option key={d.name}>{d.name}</option>
            ))}
          </select>

          <button className="primaryBtn" onClick={publishNotice}>
            {saving ? "Publicando..." : "Publicar aviso"}
          </button>

          <button className="secondaryBtn" onClick={() => setOpen(false)}>
            Cancelar
          </button>
        </div>
      )}
    </section>
  );
}

function EventComposer() {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState({
    title: "",
    event_day: "",
    event_time: "",
    department: "Todos",
    description: ""
  });

  function update(field, value) {
    setEvent({ ...event, [field]: value });
  }

  async function publishEvent() {
    if (!event.title.trim() || !event.event_day.trim() || !event.event_time.trim()) {
      alert("Preencha o título, dia e horário do evento.");
      return;
    }

    if (!navigator.onLine) {
      alert("Não foi possível criar o evento. Verifique sua conexão.");
      return;
    }

    const { error } = await supabase.from("dynamic_events").insert(event);

    if (error) {
      alert("Não foi possível criar o evento.");
      return;
    }

    setEvent({
      title: "",
      event_day: "",
      event_time: "",
      department: "Todos",
      description: ""
    });

    setOpen(false);
    alert("Evento cadastrado.");
  }

  return (
    <section className="section">
      <div className="sectionTitle">
        <h3>Agenda</h3>
        <CalendarDays size={20} />
      </div>

      {!open && (
        <button className="primaryBtn" onClick={() => setOpen(true)}>
          <PlusCircle size={18} />
          Novo evento
        </button>
      )}

      {open && (
        <div className="noticeForm">
          <label>Título</label>
          <input
            value={event.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Ex: Culto de jovens"
          />

          <label>Dia</label>
          <input
            value={event.event_day}
            onChange={(e) => update("event_day", e.target.value)}
            placeholder="Ex: Sexta-feira"
          />

          <label>Horário</label>
          <input
            value={event.event_time}
            onChange={(e) => update("event_time", e.target.value)}
            placeholder="Ex: 19:30"
          />

          <label>Departamento</label>
          <select
            value={event.department}
            onChange={(e) => update("department", e.target.value)}
          >
            <option>Todos</option>
            {departments.map((d) => (
              <option key={d.name}>{d.name}</option>
            ))}
          </select>

          <label>Descrição</label>
          <textarea
            value={event.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Detalhes do evento..."
          />

          <button className="primaryBtn" onClick={publishEvent}>
            Criar evento
          </button>

          <button className="secondaryBtn" onClick={() => setOpen(false)}>
            Cancelar
          </button>
        </div>
      )}
    </section>
  );
}

function MembersList({ members, limited }) {
  return (
    <section className="section">
      <div className="sectionTitle">
        <h3>{limited ? "Meus liderados" : "Lista de membros"}</h3>
      </div>

      {members.length === 0 && (
        <div className="member">
          <strong>Nenhum membro cadastrado</strong>
          <span>Cadastre um membro para aparecer aqui.</span>
        </div>
      )}

      {members.map((m, index) => (
        <div className="member" key={m.id || index}>
          <strong>{m.nome || m.name || "Novo membro"}</strong>

          <span>
            {m.idade || m.age || "--"} anos ·{" "}
            {m.departamento || m.dept || "Sem departamento"}
          </span>

          {m.username && <small>Usuário: {m.username}</small>}
          {(m.telefone || m.phone) && (
            <small>Telefone: {m.telefone || m.phone}</small>
          )}
          {(m.responsavel || m.responsible) && (
            <small>Responsável: {m.responsavel || m.responsible}</small>
          )}
          {(m.telefone_responsavel || m.responsiblePhone) && (
            <small>
              Contato: {m.telefone_responsavel || m.responsiblePhone}
            </small>
          )}
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
        <div
          className={`alert ${a.level === "Urgente" ? "danger" : ""}`}
          key={a.name}
        >
          <strong>{a.level}</strong>
          <h4>{a.name}</h4>
          <p>{a.text}</p>
        </div>
      ))}
    </section>
  );
}

export default function App() {
  const [role, setRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [tab, setTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const [members, setMembers] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [prayers, setPrayers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [contribution, setContribution] = useState(null);

  const [splash, setSplash] = useState(true);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const savedRole = localStorage.getItem("peniel_role");

    if (savedRole) {
      setRole(savedRole);
      setSelectedRole(null);
      setTab("home");
    }

    const timer = setTimeout(() => setSplash(false), 1800);

    loadMembers();
    loadNotices();
    loadContribution();
    loadEvents();
    loadPrayers();
    loadAttendance();

    const noticeChannel = supabase
      .channel("notices-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "notices" }, () =>
        loadNotices()
      )
      .subscribe();

    const prayerChannel = supabase
      .channel("prayers-feed")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "prayer_requests" },
        () => loadPrayers()
      )
      .subscribe();

    const eventChannel = supabase
      .channel("events-feed")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "dynamic_events" },
        () => loadEvents()
      )
      .subscribe();

    const attendanceChannel = supabase
      .channel("attendance-feed")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "attendance_records" },
        () => loadAttendance()
      )
      .subscribe();

    function goOnline() {
      setOnline(true);
      loadMembers();
      loadNotices();
      loadContribution();
      loadEvents();
      loadPrayers();
      loadAttendance();
    }

    function goOffline() {
      setOnline(false);
    }

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      clearTimeout(timer);
      supabase.removeChannel(noticeChannel);
      supabase.removeChannel(prayerChannel);
      supabase.removeChannel(eventChannel);
      supabase.removeChannel(attendanceChannel);
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  function login(selected) {
    localStorage.setItem("peniel_role", selected);
    setRole(selected);
    setSelectedRole(null);
    setTab("home");
  }

  async function loginWithCredentials(selectedRole, username, password) {
    if (!navigator.onLine) {
      alert("Não foi possível entrar. Verifique sua conexão.");
      return;
    }

    const cleanUsername = username.trim().toLowerCase();

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("username", cleanUsername)
      .eq("password", password.trim())
      .limit(1);

    if (error || !data || data.length === 0) {
      alert("Usuário ou senha incorretos.");
      return;
    }

    const user = data[0];

    localStorage.setItem("peniel_profile_name", user.nome || "Usuário Peniel");
    localStorage.setItem("peniel_profile_dept", user.departamento || "Não informado");
    localStorage.setItem("peniel_profile_phone", user.telefone || "Não informado");

    login(selectedRole);
  }

  function logout() {
    localStorage.removeItem("peniel_role");
    setRole(null);
    setSelectedRole(null);
    setTab("home");
    setMenuOpen(false);
  }

  async function loadMembers() {
    if (!navigator.onLine) return;

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setMembers(data);
  }

  async function loadNotices() {
    if (!navigator.onLine) return;

    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setNotices(data);
  }

  async function loadEvents() {
    if (!navigator.onLine) return;

    const { data, error } = await supabase
      .from("dynamic_events")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setEvents(data);
  }

  async function loadPrayers() {
    if (!navigator.onLine) return;

    const { data, error } = await supabase
      .from("prayer_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setPrayers(data);
  }

  async function loadAttendance() {
    if (!navigator.onLine) return;

    const { data, error } = await supabase
      .from("attendance_records")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setAttendance(data);
  }

  async function loadContribution() {
    if (!navigator.onLine) return;

    const { data, error } = await supabase
      .from("contribution_settings")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(1);

    if (!error && data && data.length > 0) {
      setContribution(data[0]);
    }
  }

  async function addMember(member) {
    if (!navigator.onLine) {
      alert("Não foi possível conectar no momento. Verifique sua rede e tente novamente.");
      return { error: true };
    }

    const cleanUsername = member.username.trim().toLowerCase();
    const cleanPhone = member.phone.trim();

    const { data: allMembers, error: searchError } = await supabase
      .from("members")
      .select("*");

    if (searchError) return { error: true };

    const duplicate = allMembers.some((m) => {
      const sameUsername = (m.username || "").toLowerCase() === cleanUsername;
      const samePhone = cleanPhone && (m.telefone || "") === cleanPhone;
      const sameNameBirth =
        (m.nome || "").trim().toLowerCase() === member.name.trim().toLowerCase() &&
        String(m.nascimento || "") === String(member.birth || "");

      return sameUsername || samePhone || sameNameBirth;
    });

    if (duplicate) return { duplicate: true };

    const { error } = await supabase.from("members").insert({
      nome: member.name,
      username: cleanUsername,
      password: member.password,
      nascimento: member.birth,
      idade: member.age,
      telefone: member.phone,
      departamento: member.dept,
      responsavel: member.responsible,
      telefone_responsavel: member.responsiblePhone,
      cargo:
        member.role === "pastor"
          ? "Pastor"
          : member.role === "leader"
          ? "Líder / Coordenador"
          : "Membro",
      ativo: true
    });

    if (error) return { error: true };

    await loadMembers();
    return { success: true };
  }

  async function addPrayer(prayer) {
    if (!navigator.onLine) {
      alert("Não foi possível enviar a solicitação. Verifique sua conexão.");
      return;
    }

    const { error } = await supabase.from("prayer_requests").insert({
      name: prayer.name,
      department: prayer.department,
      title: prayer.title,
      message: prayer.message,
      category: prayer.category,
      followup_type: prayer.followup_type,
      anonymous: prayer.anonymous,
      priority: prayer.priority,
      private_to_leadership: true,
      membro: prayer.name,
      pedido: prayer.message,
      status: "Recebido"
    });

    if (error) {
      alert("Não foi possível enviar a solicitação.");
      return;
    }

    await loadPrayers();
    alert("Solicitação enviada. Estamos orando e cuidando de você. 💙");
  }

  async function updatePrayerStatus(id, status) {
    if (!navigator.onLine) {
      alert("Sem conexão.");
      return;
    }

    const { error } = await supabase
      .from("prayer_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Não foi possível atualizar a solicitação.");
      return;
    }

    await loadPrayers();
  }

  async function markAttendance(event, member, status) {
    if (!event) {
      alert("Cadastre ou selecione um evento primeiro.");
      return;
    }

    if (!navigator.onLine) {
      alert("Sem conexão. Não foi possível salvar presença.");
      return;
    }

    const existing = attendance.find(
      (a) => String(a.event_id) === String(event.id) && String(a.member_id) === String(member.id)
    );

    if (existing) {
      const { error } = await supabase
        .from("attendance_records")
        .update({ status })
        .eq("id", existing.id);

      if (error) {
        alert("Não foi possível atualizar presença.");
        return;
      }
    } else {
      const { error } = await supabase.from("attendance_records").insert({
        event_id: event.id,
        event_title: event.title,
        member_id: member.id,
        member_name: member.nome,
        department: member.departamento,
        status,
        marked_by: "Liderança Peniel"
      });

      if (error) {
        alert("Não foi possível registrar presença.");
        return;
      }
    }

    await loadAttendance();
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
        login={login}
        addMember={addMember}
        loginWithCredentials={loginWithCredentials}
      />
    );
  } else if (tab === "agenda") {
    content = <AgendaPage events={events} online={online} />;
  } else if (tab === "notices") {
    content = <NoticesPage notices={notices} online={online} />;
  } else if (tab === "contribution") {
    content = <ContributionPage contribution={contribution} online={online} />;
  } else if (tab === "prayer") {
    content = (
      <PrayerPage
        role={role}
        prayers={prayers}
        addPrayer={addPrayer}
        updatePrayerStatus={updatePrayerStatus}
        online={online}
      />
    );
  } else if (tab === "attendance") {
    content = (
      <AttendancePage
        role={role}
        members={members}
        events={events}
        attendance={attendance}
        markAttendance={markAttendance}
        online={online}
      />
    );
  } else if (tab === "media") {
    content = <MediaPage role={role} />;
  } else if (tab === "chat") {
    content = <ChatPage online={online} />;
  } else if (tab === "profile") {
    content = <ProfilePage role={role} logout={logout} />;
  } else {
    content = (
      <HomePage
        role={role}
        members={members}
        notices={notices}
        events={events}
        prayers={prayers}
        attendance={attendance}
        online={online}
        setTab={setTab}
      />
    );
  }

  return (
    <div className="app">
      <div className="phone">
        <Header role={role} logout={logout} openMenu={() => setMenuOpen(true)} />

        <SideMenu
          open={menuOpen}
          closeMenu={() => setMenuOpen(false)}
          tab={tab}
          setTab={setTab}
          role={role}
          logout={logout}
        />

        <OfflineBanner online={online} />

        {content}
      </div>
    </div>
  );
}
