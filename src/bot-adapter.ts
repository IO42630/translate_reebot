import TelegramBot, { InlineQuery } from 'node-telegram-bot-api';
import { Options } from 'request';

const translate = require('./translate-adapter').translate;
const keys = require('../keys.json');

let request_options: Options = {url: ''};

let options: TelegramBot.ConstructorOptions = {
    polling: true,
    request: request_options
};
const bot = new TelegramBot(keys.TRANSLATE_REEBOT, options);

bot.on('inline_query', async (msg: InlineQuery) => {
    if (msg.query.length > 1) {
        const translated = (await translate(msg.query, 'de')).text;
        const results: Array<TelegramBot.InlineQueryResult> = [
            {
                type: 'article',
                id: 'hello_id',
                title: translated,
                input_message_content: {
                    message_text: translated
                }
            }
        ];
        await bot.answerInlineQuery(msg.id, results);
    }
});
