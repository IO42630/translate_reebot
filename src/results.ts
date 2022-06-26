import { InlineQueryResultArticle } from 'node-telegram-bot-api';

let id = 0;

export function makeResult(title: string, message: string) : InlineQueryResultArticle {
    return {
        type: 'article',
        id: '' + ++id,
        title: title,
        input_message_content: { message_text:  message}
    };
}
