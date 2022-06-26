import TelegramBot, { InlineQuery, InlineQueryResultArticle } from 'node-telegram-bot-api';
import { Options } from 'request';

const translateDeepL = require('./deepl-translate-adapter').translate;
const translateGoogle = require('./google-translate-adapter').translate;
const detectGoogle = require('./google-translate-adapter').detect;
const makeResult = require('./results').makeResult;
const keys = require('../keys.json');

const request_options: Options = {url: ''};
const options: TelegramBot.ConstructorOptions = {
    polling: true,
    request: request_options
};
const bot = new TelegramBot(keys.TEST ? keys.TEST_TRANSLATE_REEBOT : keys.TRANSLATE_REEBOT, options);
const eol = ',,';
const max = 62;

function makeLines(text: string): string[] {
    let lines: string[] = [];
    let split = text.split(' ').reverse();
    let line = '';
    while (split.length !== 0) {
        let word = split.pop();
        line = line + ' ' + word;
        if (line.length + word.length + 1 >= max) {
            lines.push(line);
            line = '';
        }
    }
    if (line.trim() !== '') { lines.push(line); }
    return lines;
}

bot.on('inline_query', async (query: InlineQuery) => {
    const queryText = query.query;
    const length = queryText.length;
    if (length < 3) { return; }
    const basicQuery = queryText.endsWith(eol);
    const customQuery = !basicQuery && (
        queryText.endsWith(eol + 'de') ||
        queryText.endsWith(eol + 'en') ||
        queryText.endsWith(eol + 'ua') ||
        queryText.endsWith(eol + 'uk') ||
        queryText.endsWith(eol + 'es') ||
        queryText.endsWith(eol + 'fr') ||
        queryText.endsWith(eol + 'it') ||
        queryText.endsWith(eol + 'ru')
    );
    let lang: string;
    let text: string;
    if (basicQuery) {
        lang = 'de';
        text = queryText.slice(0, length - 2);
    } else if (customQuery) {
        lang = queryText.slice(length - 2, length);
        lang = lang === 'ua' || lang === 'ru' ? 'uk' : lang;
        text = queryText.slice(0, length - 4);
    } else {
        return;
    }
    let translated: string;
    const srcLang: string = await detectGoogle(text);
    if (srcLang === 'uk' || lang === 'uk') {
        translated = await translateGoogle(text, lang);
    } else {
        translated = await translateDeepL(text, srcLang, lang);
    }
    const results: Array<InlineQueryResultArticle> = [];
    if (translated.length < max) {
        results.push(makeResult(translated, translated));
    } else {
        makeLines(translated).forEach((line: string) => {
            results.push(makeResult(line, translated));
        });
    }
    await bot.answerInlineQuery(query.id, results, {cache_time: 0, is_personal: true});
});
