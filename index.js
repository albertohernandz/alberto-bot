// Constantes y conexión
const config = require('./config/config.json');

const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('🤖 La conexion del bot fue exitosa!');
});

// Banner
const cfonts = require('cfonts');

cfonts.say('Alberto|Bot', {
	font: 'block',
	align: 'center',
	colors: ['blue', 'yellow']
});

// Función
client.on('message', async (message) => {
	if(message.body === 'hola') {
		message.reply('👋 ¡Hola! *Alberto Bot* ya esta en funcion...');
	} else if(message.type === 'image' && message.body.startsWith(`${config.prefix}sticker`)) {
        client.sendMessage(message.from, "*[🚀]* *Converting...*");
        const media = await message.downloadMedia();
        try {
            client.sendMessage(message.from, media, {
                sendMediaAsSticker: true,
                stickerName: config.name,
                stickerAuthor: config.author
            }).then(() => {
                client.sendMessage(message.from, "*[✨]* *Successfully created!*");
            });
        } catch {
            client.sendMessage(message.from, "*[🚧]* *An error occurred!*");
        }
    }
});

client.initialize();