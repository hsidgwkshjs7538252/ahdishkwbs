const {Telegraf} = require('telegraf');
const fs = require('fs');
const crypto = require('crypto');
const ytdl = require('ytdl-core')

const bot = new Telegraf('5442359215:AAEpSs8-0J2-42dmZC7Mjm07s-RRTUcBFMQ');

bot.command('start',ctx=>{
  ctx.reply('Welcome to this bot.\n\nDeveloped By Zubayer Ahmed\nDeveloper\'s Channel:@techzbd');
})

bot.command('mp3',async ctx=>{
  const link = ctx.message.text.replace('/mp3 ','');
  if(link !== '' && link !== '/mp3'){
    
    const m = await ctx.reply('Downloading Audio...');
    const mid = await m.message_id;
    const tk = crypto.randomBytes(5).toString('hex');
    fs.mkdirSync(tk)
    
    const aa = ytdl(link,{filter:'audioonly'})
    aa.on('error',()=>{
      ctx.reply('Invalid Youtube Link')
    })
    aa.on('finish',()=>{
      bot.telegram.sendDocument(ctx.chat.id,{source:`./${tk}/audio.mp3`}).then(x=>{
        bot.telegram.deleteMessage(ctx.chat.id,mid)
      })
    })
    aa.pipe(fs.createWriteStream('./'+tk+'/audio.mp3'));
  }
})


bot.launch()
