import { Configuration, OpenAIApi } from 'openai';
import config from '../../config';

const configuration = new Configuration({
	organization: config.OPENAI_ORGANIZATION,
	apiKey: config.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export default openai;
