import 'dotenv/config';
import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
	DISCORD_TOKEN: str(),

	OPENAI_ORGANIZATION: str(),
	OPENAI_API_KEY: str()
});

const config = {
	DISCORD_TOKEN: env.DISCORD_TOKEN,

	OPENAI_ORGANIZATION: env.OPENAI_ORGANIZATION,
	OPENAI_API_KEY: env.OPENAI_API_KEY
};

export default config;
