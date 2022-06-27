import { InlineQueryResultArticle } from 'node-telegram-bot-api';

let id = 0;

export function makeResult(title: string, message: string): InlineQueryResultArticle {
    if (id + 1 == Number.MAX_SAFE_INTEGER) { id = 0; }
    return {
        type: 'article',
        id: '' + ++id,
        title: title,
        input_message_content: {message_text: message}
    };
}

export function makeError(): InlineQueryResultArticle {
    if (id + 1 == Number.MAX_SAFE_INTEGER) { id = 0; }
    return {
        type: 'article',
        id: '' + ++id,
        title: 'Error.',
        input_message_content: {message_text: ''}
    };
}
