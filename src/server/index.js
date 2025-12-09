// server/index.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Carrega variáveis de ambiente. Tenta, por ordem:
// 1) src/.env (caminho relativo a src/server -> ../.env)
// 2) projeto raiz ./ .env
// 3) fallback para process.env se nenhuma existir
const envPaths = [
  path.resolve(__dirname, "../.env"),
  path.resolve(process.cwd(), ".env"),
];
let loadedFrom = null;
for (const p of envPaths) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
    loadedFrom = p;
    console.log(`[dotenv] carregado de ${p}`);
    break;
  }
}
if (!loadedFrom) {
  dotenv.config();
  console.log(
    "[dotenv] nenhum arquivo .env encontrado em 'src/.env' ou './.env' - usando process.env"
  );
}

const app = express();
app.use(express.json());
app.use(cors()); // ajuste origin se quiser restringir

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "fefelbf@gmail.com"; // destinatário (pode trocar via .env)

// transporter configurado via env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // ex: "smtp.sendgrid.net" ou host do seu provedor
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: process.env.SMTP_SECURE === "true", // true se usar 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Diagnostics: log SMTP config (mask password) and verify connection early
const mask = (s) => (s ? `${s.slice(0, 2)}***${s.slice(-2)}` : s);
console.log("[smtp] host:", process.env.SMTP_HOST);
console.log("[smtp] port:", process.env.SMTP_PORT);
console.log("[smtp] secure:", process.env.SMTP_SECURE);
console.log("[smtp] user:", mask(process.env.SMTP_USER));

if (
  !process.env.SMTP_HOST ||
  !process.env.SMTP_USER ||
  !process.env.SMTP_PASS
) {
  console.warn(
    "[smtp] Aviso: variáveis SMTP faltando. Verifique SMTP_HOST, SMTP_USER e SMTP_PASS no .env"
  );
}

transporter.verify((error, success) => {
  if (error) {
    console.error(
      "[smtp] Falha ao verificar transporter:",
      error && error.message
    );
    if (error && error.code) console.error("[smtp] error.code =", error.code);
  } else {
    console.log("[smtp] Transporter verificado com sucesso");
  }
});

// util: sanitize (remoção simples de tags HTML)
const sanitize = (str = "") =>
  String(str)
    .replace(/<[^>]*>?/gm, "")
    .trim();

// health
app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/api/contact", async (req, res) => {
  // Espera: { name, email, phone, service, message, consent, honeypot }
  const {
    name = "",
    email = "",
    phone = "",
    service = "",
    message = "",
    consent = false,
    honeypot = "",
  } = req.body || {};

  // Honeypot: se preenchido, não envia (trata como spam). Retornamos 200 para não dar dica a bots.
  if (honeypot && honeypot.trim() !== "") {
    console.log("[contact] honeypot triggered, descartando envio");
    return res.status(200).json({ ok: true });
  }

  // Validação básica (compatível com validações do front)
  const errors = [];

  if (!name || sanitize(name).length < 3) {
    errors.push("name");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(String(email))) {
    errors.push("email");
  }

  const phoneNumbersOnly = String(phone || "").replace(/\D/g, "");
  if (!phone || phoneNumbersOnly.length < 10) {
    errors.push("phone");
  }

  if (!message || sanitize(message).length < 10) {
    errors.push("message");
  }

  if (consent !== true && consent !== "true") {
    // front envia boolean; aqui aceitamos string "true" ou boolean true
    errors.push("consent");
  }

  if (errors.length > 0) {
    return res
      .status(400)
      .json({ ok: false, error: "validation_failed", fields: errors });
  }

  // Prepara conteúdo do e-mail (sanitize basicamente o message)
  const safeName = sanitize(name);
  const safeEmail = sanitize(email);
  const safePhone = sanitize(phone);
  const safeService = sanitize(service || "Não especificado");
  const safeMessage = sanitize(message).replace(/\n/g, "<br/>");
  const consentText = consent === true || consent === "true" ? "Sim" : "Não";

  // meta: ip e user-agent para auditoria
  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    (req.ip ? req.ip : "desconhecido");
  const userAgent = req.headers["user-agent"] || "desconhecido";

  const mailOptions = {
    from: `"Lead - Site" <${process.env.SMTP_USER}>`,
    to: CONTACT_EMAIL,
    subject: `Novo lead - ${safeName}`,
    text: `Nome: ${safeName}\nE-mail: ${safeEmail}\nTelefone: ${safePhone}\nServiço: ${safeService}\nConsentimento: ${consentText}\nIP: ${ip}\nUser-Agent: ${userAgent}\n\nMensagem:\n${message}`,
    html: `
      <h3>Novo lead</h3>
      <p><strong>Nome:</strong> ${safeName}</p>
      <p><strong>E-mail:</strong> ${safeEmail}</p>
      <p><strong>Telefone:</strong> ${safePhone}</p>
      <p><strong>Serviço:</strong> ${safeService}</p>
      <p><strong>Consentimento LGPD:</strong> ${consentText}</p>
      <p><strong>IP:</strong> ${ip}</p>
      <p><strong>User-Agent:</strong> ${userAgent}</p>
      <p><strong>Mensagem:</strong><br/>${safeMessage}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    return res
      .status(500)
      .json({ ok: false, error: "mail_error", detail: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
