import TelegramBot from "node-telegram-bot-api";
import { Options } from "request";

const translate = require('./translate-adapter').translate
const keys = require('../keys.json');

let request_options: Options = { url: "" };

let options: TelegramBot.ConstructorOptions = {
    polling: true,
    request: request_options
};
const bot = new TelegramBot(keys.TRANSLATE_REEBOT, options);

bot.on("inline_query", async msg => {
    console.log(JSON.stringify(msg));
    let results: Array<TelegramBot.InlineQueryResult> = [];
    if (msg.query.length <= 1) return;
    if (msg.query.length > 1) {
        let translated  = await translate(msg.query, 'de');
        results = [
            {
                type: 'article',
                id: 'hello_id',
                title: translated.text,
                input_message_content: {
                    message_text: translated.text
                }
            }
        ];
    }
    bot.answerInlineQuery(msg.id, results);
});
