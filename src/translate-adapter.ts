import { TextResult, Translator } from 'deepl-node';

const keys = require('../keys.json');
const translator = new Translator(keys.DEEPL);

export const translate: (a: String, b: String) => Promise<TextResult> =
    (async (textToTranslate: any, lang: any) => {
        return await translator.translateText(textToTranslate, null, lang);
    });
