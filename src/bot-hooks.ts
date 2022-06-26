import TelegramBot, { InlineQuery } from 'node-telegram-bot-api';
import { Options } from 'request';

const translate = require('./translate-adapter').translate;
const keys = require('../keys.json');

const request_options: Options = {url: ''};
const options: TelegramBot.ConstructorOptions = {
    polling: true,
    request: request_options
};
const bot = new TelegramBot(keys.TRANSLATE_REEBOT, options);
const eol = ',,';

bot.on('inline_query', async (query: InlineQuery) => {
    const queryText = query.query;
    const length = queryText.length;
    const basicQuery = queryText.endsWith(eol);
    const customQuery =
        queryText.endsWith(eol + 'de') ||
        queryText.endsWith(eol + 'en') ||
        queryText.endsWith(eol + 'ru');
    let lang: string;
    let transText: string;
    if (basicQuery) {
        lang = 'de';
        transText = queryText.slice(0, length - 2);
    } else if (customQuery) {
        lang = queryText.slice(length - 2, length);
        lang = lang === 'en' ? 'en-US' : lang;
        transText = queryText.slice(0, length - 4);
    } else {
        return;
    }
    const translated = await translate(transText, lang);
    const results: Array<TelegramBot.InlineQueryResult> = [
        {
            type: 'article',
            id: 'hello',
            title: translated,
            input_message_content: {
                message_text: translated
            }
        }
    ];
    await bot.answerInlineQuery(query.id, results);
});
