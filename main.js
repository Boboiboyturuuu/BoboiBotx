import axios from 'axios'
import fetch from 'node-fetch'
import katz from '@vitalets/google-translate-api';
const indo = 'id';
const eangrais = 'en'
const payloads = {
    character_id: "8cda8312-1cbd-4b82-8069-7d47b1ae42d2",
    message: "",
    enable_nsfw: true
};

const handler = async (m, { conn, args, text, usedPrefix, command, isOwner }) => {
  if (!text) throw `${usedPrefix}${command} hallo eula. apa kabar sayang?
` 
    if (isOwner) {
  if (args[0] === 'set') {
    if (args.length % 2 !== 1) {
      return m.reply('Invalid arguments.');
    }

    for (let i = 1; i < args.length; i += 2) {
      const key = args[i];
      const value = args[i + 1];
      if (key && value) {
        payloads[key] = value;
        m.reply(`*${key}* has been set to *${value}*.`);
      }
    }
    return;
  }
const { translate } = katz;

  if (args[0] === 'payload') {
    let payloadInfo = '*Payloads*:';
    for (const [key, value] of Object.entries(payloads)) {
      payloadInfo += `\n${key}: ${value}`;
    }
    return m.reply(payloadInfo);
  }
}
  await sleep(2000)
  const mmk = await translate(text, { to: eangrais, autoCorrect: true }).catch(_ => null) 
  const updatedPayloads = { ...payloads, message: mmk.text.toString() };
  const { data } = await axios.request({
    baseURL: "https://api.itsrose.life",
    url: "/cai/chat",
    method: "POST",
    headers: { Authorization: `${global.rose}` },
    data: updatedPayloads,
  }).catch((e) => e?.response);

  const { status, result } = data;

  if (!status) {
    return m.reply(message); 
  } else {
    const { message } = result;
    const maxim = await translate(message, { to: indo, autoCorrect: true }).catch(_ => null);
          m.reply(maxim.text.toString())
   }
};

handler.help = handler.command = ['cai', 'chat_ai'];
handler.tags = ['ai'];
handler.limit = true;
handler.register = false;
handler.premium = false;

export default handler

const sleep = (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}

import { exec } from 'child_process';
const boboibotz = '6281243673506@s.net'
const handler = async (m, { conn, args, text, isOwner }) => {
    if (!i
    if (!isOwner) return; 
    if (args.length !== 1) {
        return m.reply('Format: npmi <nama_modul>');
    }
    const moduleName = args[0];
    m.reply(`Sedang menginstal modul ${moduleName}...`);
    exec(`npm install ${moduleName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return m.reply(`Terjadi kesalahan saat menginstal ${moduleName}: ${error.message}`);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            if (stderr.includes('404')) {
                return m.reply(`Modul ${moduleName} tidak ditemukan.`);
            }
            return m.reply(`Terjadi kesalahan saat menginstal ${moduleName}: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        m.reply(`Modul ${moduleName} berhasil diinstal!`);
    });
};

handler.command = ['npmi'];
handler.tags = ['admin'];
handler.owner = true
export default handler;
