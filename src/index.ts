import { AxiosError } from 'axios';
import * as Discord from 'discord.js';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import config from './config';
import openai from './utils/openai';

const bot = new Discord.Client();

bot.on('ready', () => {
	bot.generateInvite(['ADMINISTRATOR']).then((link) => {
		console.log(link);
	});
});

type UsersContext = {
	[key: string]: Array<{ role: ChatCompletionRequestMessageRoleEnum; content: string }>;
};

const users = {} as UsersContext;

bot.on('message', async (message) => {
	if (message.author.bot) return;

	const command = message.content.split(' ')[0];
	const userId = message.author.id;

	if (!users[userId]) {
		users[userId] = [];
	}

	if (command === '/gpt') {
		const text = message.content.substring(5);
		users[userId].push({ role: 'user', content: text });
		try {
			const completion = await openai.createChatCompletion({
				model: 'gpt-3.5-turbo',
				messages: users[userId]
			});

			const data = completion.data.choices[0].message;

			if (!data) throw new Error('Unknown error');

			users[userId].push(data);
			message.channel.send(`<@${userId}> \n${data.content}`);
		} catch (error: unknown) {
			if (error instanceof AxiosError && error?.response?.status === 429) {
				message.channel.send('Too many requests');
			} else if (error instanceof Error) {
				message.channel.send(error.message);
			}
		}
	}
});

bot.login(config.DISCORD_TOKEN);
