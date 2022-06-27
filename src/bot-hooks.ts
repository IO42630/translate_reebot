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

async function translate(text: string, dstLang: string): Promise<string> {
    const srcLang: string = await detectGoogle(text);
    dstLang = dstLang === 'ua' || dstLang === 'ru' ? 'uk' : dstLang;
    if (srcLang === 'uk' || dstLang === 'uk') {
        return translateGoogle(text, dstLang);
    } else {
        return await translateDeepL(text, srcLang, dstLang);
    }
}

function makeResults(translated: string): Array<InlineQueryResultArticle> {
    const results: Array<InlineQueryResultArticle> = [];
    if (translated.length === 0) {
        return;
    } else if (translated.length < max) {
        results.push(makeResult(translated, translated));
    } else {
        makeLines(translated).forEach((line: string) => {
            results.push(makeResult(line, translated));
        });
    }
    return results;
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
    let dstLang: string;
    let text: string;
    if (basicQuery) {
        dstLang = 'de';
        text = queryText.slice(0, length - 2);
    } else if (customQuery) {
        dstLang = queryText.slice(length - 2, length);
        text = queryText.slice(0, length - 4);
    } else {
        return;
    }
    const translated = await translate(text, dstLang);
    const results = makeResults(translated);
    await bot.answerInlineQuery(query.id, results, {cache_time: 0, is_personal: true});
});
