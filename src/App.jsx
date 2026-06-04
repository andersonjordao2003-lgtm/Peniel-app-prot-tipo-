import React, { useEffect, useState } from "react";
import {
  Bell, CalendarDays, Home, LogOut, MessageCircle, Send,
  ShieldAlert, Users, Music, Camera, Baby, UserRound, Heart,
  ChevronRight, HandHeart, Mail, Phone, UserPlus, KeyRound,
  WifiOff, Megaphone, PlusCircle, Copy, QrCode, Upload,
  CircleDollarSign, User, HeartHandshake, CheckCircle2,
  Menu, X
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

const alerts = [
  { level: "Atenção", name: "Mariana Souza", text: "Acompanhamento pastoral recomendado." },
  { level: "Urgente", name: "Usuário teste", text: "Alerta crítico demonstrativo." }
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
    { id: "prayer", label: "Pedidos de oração", icon: HeartHandshake },
    { id: "chat", label: "Assistente IA", icon: MessageCircle },
    { id: "profile", label: "Meu perfil", icon: User }
  ];

  const roleName =
    role === "pastor"
      ? "Pastor"
      : role === "leader"
      ? "Líder / Coordenador"
      : "Membro";

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
            <p>{roleName}</p>
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

function AuthPage({ selectedRole, setSelectedRole, login, addMember }) {
  const [mode, setMode] = useState("login");
  const [method, setMethod] = useState("google");

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

      <div className="authMethods twoMethods">
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
        <LoginForm selectedRole={selectedRole} login={login} method={method} />
      ) : (
        <RegisterForm
          selectedRole={selectedRole}
          login={login}
          method={method}
          addMember={addMember}
          setMode={setMode}
        />
      )}
    </main>
  );
}

function LoginForm({ selectedRole, login, method }) {
  return (
    <section className="section">
      {method === "google" && (
        <button className="googleBtn" onClick={() => login(selectedRole)}>
          <Mail size={18} />
          Entrar com Google
        </button>
      )}

      {method === "phone" && (
        <>
          <label>Número de telefone</label>
          <input placeholder="(21) 99999-9999" />

          <button className="primaryBtn" onClick={() => login(selectedRole)}>
            Entrar
          </button>
        </>
      )}
    </section>
  );
}

function RegisterForm({ selectedRole, login, method, addMember, setMode }) {
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

  async function submit() {
    const result = await addMember({
      ...form,
      age,
      responsible: minor ? form.responsible : "",
      responsiblePhone: minor ? form.responsiblePhone : ""
    });

    if (result?.duplicate) {
      const goLogin = window.confirm(
        "Já existe um cadastro com essas informações. Deseja ir para a tela de login?"
      );

      if (goLogin) {
        setMode("login");
      }

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

      {method === "phone" && (
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

function HomePage({ role, members, notices, events, online, prayers, updatePrayerStatus }) {
  if (role === "leader") return <LeaderPage members={members} />;
  if (role === "pastor") {
    return (
      <PastorPage
        members={members}
        notices={notices}
        events={events}
        prayers={prayers}
        updatePrayerStatus={updatePrayerStatus}
      />
    );
  }

  const nextEvent = events[0];

  return (
    <div className="page">
      <section className="welcome">
        <p>Bem-vindo</p>
        <h2>Congregação Peniel</h2>
      </section>

      <section className="nextEvent">
        <div>
          <p>Próximo compromisso</p>
          <h3>{nextEvent?.title || "Culto de Ensino"}</h3>
          <span>
            {nextEvent
              ? `${nextEvent.event_day} · ${nextEvent.event_time}`
              : "Quarta-feira · 19:00"}
          </span>
        </div>
        <CalendarDays size={30} />
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
          <p>Oração</p>
          <h2>Pedidos recebidos</h2>
        </section>

        <PrayerList
          prayers={prayers}
          updatePrayerStatus={updatePrayerStatus}
          showControls
        />
      </div>
    );
  }

  return (
    <div className="page">
      <section className="welcome">
        <p>Oração</p>
        <h2>Pedido de oração</h2>
      </section>

      {!online && (
        <section className="section">
          <div className="emptyState">
            Sem conexão. Não será possível enviar pedidos neste momento.
          </div>
        </section>
      )}

      <PrayerForm addPrayer={addPrayer} />

      <section className="section">
        <div className="emptyState">
          Seu pedido será enviado para a liderança da igreja para acompanhamento em oração.
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
    anonymous: false
  });

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function submit() {
    if (!form.title.trim() || !form.message.trim()) {
      alert("Preencha o título e o pedido de oração.");
      return;
    }

    await addPrayer({
      name: profile.name,
      department: profile.dept,
      title: form.title,
      message: form.message,
      anonymous: form.anonymous
    });

    setForm({
      title: "",
      message: "",
      anonymous: false
    });
  }

  return (
    <section className="section">
      <div className="sectionTitle">
        <h3>Novo pedido</h3>
        <HeartHandshake size={20} />
      </div>

      <div className="noticeForm">
        <label>Título</label>
        <input
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Ex: Saúde da minha família"
        />

        <label>Pedido</label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Digite seu pedido de oração..."
        />

        <button
          className="secondaryBtn"
          onClick={() => update("anonymous", !form.anonymous)}
        >
          {form.anonymous ? "✓ Enviar anonimamente" : "Enviar identificado"}
        </button>

        <button className="primaryBtn" onClick={submit}>
          Enviar pedido
        </button>
      </div>
    </section>
  );
}

function PrayerList({ prayers, updatePrayerStatus, showControls }) {
  const pending = prayers.filter((p) => p.status !== "Atendido");
  const done = prayers.filter((p) => p.status === "Atendido");

  return (
    <>
      <section className="section">
        <div className="sectionTitle">
          <h3>Pendentes</h3>
          <HeartHandshake size={20} />
        </div>

        {pending.length === 0 && (
          <div className="emptyState">Nenhum pedido pendente.</div>
        )}

        {pending.map((p) => (
          <div className="noticeCard" key={p.id}>
            <strong>{p.title || "Pedido de oração"}</strong>
            <p>{p.message || p.pedido}</p>
            <small>
              {p.anonymous ? "Anônimo" : p.name || p.membro} · {p.department || "Não informado"}
            </small>

            {showControls && (
              <button
                className="secondaryBtn"
                onClick={() => updatePrayerStatus(p.id, "Atendido")}
              >
                <CheckCircle2 size={17} />
                Marcar como atendido
              </button>
            )}
          </div>
        ))}
      </section>

      <section className="section">
        <div className="sectionTitle">
          <h3>Atendidos</h3>
          <CheckCircle2 size={20} />
        </div>

        {done.length === 0 && (
          <div className="emptyState">Nenhum pedido atendido ainda.</div>
        )}

        {done.map((p) => (
          <div className="noticeCard" key={p.id}>
            <strong>{p.title || "Pedido de oração"}</strong>
            <p>{p.message || p.pedido}</p>
            <small>
              {p.anonymous ? "Anônimo" : p.name || p.membro} · Atendido
            </small>
          </div>
        ))}
      </section>
    </>
  );
}

function ProfilePage({ role, logout }) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(getProfile());

  const roleName =
    role === "pastor"
      ? "Pastor"
      : role === "leader"
      ? "Líder / Coordenador"
      : "Membro";

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

function LeaderPage({ members }) {
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
      <Alerts />
    </div>
  );
}

function PastorPage({ members, notices, events, prayers, updatePrayerStatus }) {
  const [panelTab, setPanelTab] = useState("overview");

  const pendingPrayers = prayers.filter((p) => p.status !== "Atendido");

  return (
    <div className="page">
      <section className="welcome">
        <p>Painel pastoral</p>
        <h2>Administração</h2>
      </section>

      <div className="pastorTabs">
        <button className={panelTab === "overview" ? "active" : ""} onClick={() => setPanelTab("overview")}>
          Geral
        </button>
        <button className={panelTab === "notices" ? "active" : ""} onClick={() => setPanelTab("notices")}>
          Avisos
        </button>
        <button className={panelTab === "agenda" ? "active" : ""} onClick={() => setPanelTab("agenda")}>
          Agenda
        </button>
        <button className={panelTab === "members" ? "active" : ""} onClick={() => setPanelTab("members")}>
          Membros
        </button>
        <button className={panelTab === "prayers" ? "active" : ""} onClick={() => setPanelTab("prayers")}>
          Oração
        </button>
        <button className={panelTab === "alerts" ? "active" : ""} onClick={() => setPanelTab("alerts")}>
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
              <strong>{notices.length}</strong>
              <span>Avisos</span>
            </div>

            <div>
              <strong>{pendingPrayers.length}</strong>
              <span>Orações</span>
            </div>
          </div>

          <section className="section">
            <div className="sectionTitle">
              <h3>Resumo</h3>
              <ShieldAlert size={20} />
            </div>

            <div className="emptyState">
              Use as abas acima para gerenciar avisos, agenda, membros, pedidos de oração e alertas pastorais.
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
        <PrayerList
          prayers={prayers}
          updatePrayerStatus={updatePrayerStatus}
          showControls
        />
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
            {m.idade || m.age || "--"} anos · {m.departamento || m.dept || "Sem departamento"}
          </span>

          {(m.telefone || m.phone) && (
            <small>Telefone: {m.telefone || m.phone}</small>
          )}

          {(m.responsavel || m.responsible) && (
            <small>Responsável: {m.responsavel || m.responsible}</small>
          )}

          {(m.telefone_responsavel || m.responsiblePhone) && (
            <small>Contato: {m.telefone_responsavel || m.responsiblePhone}</small>
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
        <div className={`alert ${a.level === "Urgente" ? "danger" : ""}`} key={a.name}>
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

    const noticeChannel = supabase
      .channel("notices-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "notices" }, () => loadNotices())
      .subscribe();

    const prayerChannel = supabase
      .channel("prayers-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "prayer_requests" }, () => loadPrayers())
      .subscribe();

    const eventChannel = supabase
      .channel("events-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "dynamic_events" }, () => loadEvents())
      .subscribe();

    function goOnline() {
      setOnline(true);
      loadMembers();
      loadNotices();
      loadContribution();
      loadEvents();
      loadPrayers();
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

  async function loadContribution() {
    if (!navigator.onLine) return;

    const { data, error } = await supabase
      .from("contribution_settings")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(1);

    if (!error && data && data.length > 0) setContribution(data[0]);
  }

  async function addMember(member) {
    if (!navigator.onLine) {
      alert("Não foi possível conectar no momento. Verifique sua rede e tente novamente.");
      return { error: true };
    }

    const cleanName = member.name.trim().toLowerCase();
    const cleanPhone = member.phone.trim();

    const { data: existingMembers, error: searchError } = await supabase
      .from("members")
      .select("*")
      .or(
        `telefone.eq.${cleanPhone},and(nome.ilike.${member.name.trim()},nascimento.eq.${member.birth})`
      );

    if (searchError) {
      return { error: true };
    }

    if (existingMembers && existingMembers.length > 0) {
      return { duplicate: true };
    }

    const { error } = await supabase
      .from("members")
      .insert({
        nome: member.name,
        nascimento: member.birth,
        idade: member.age,
        telefone: member.phone,
        departamento: member.dept,
        responsavel: member.responsible,
        telefone_responsavel: member.responsiblePhone,
        cargo: "Membro",
        ativo: true
      });

    if (error) return { error: true };

    await loadMembers();
    return { success: true };
  }

  async function addPrayer(prayer) {
    if (!navigator.onLine) {
      alert("Não foi possível enviar o pedido. Verifique sua conexão.");
      return;
    }

    const { error } = await supabase.from("prayer_requests").insert({
      name: prayer.name,
      department: prayer.department,
      title: prayer.title,
      message: prayer.message,
      anonymous: prayer.anonymous,
      membro: prayer.name,
      pedido: prayer.message,
      status: "Pendente"
    });

    if (error) {
      alert("Não foi possível enviar o pedido.");
      return;
    }

    await loadPrayers();
    alert("Pedido de oração enviado.");
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
      alert("Não foi possível atualizar o pedido.");
      return;
    }

    await loadPrayers();
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
        updatePrayerStatus={updatePrayerStatus}
        online={online}
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
