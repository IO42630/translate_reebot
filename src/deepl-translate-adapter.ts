import { Translator, TextResult } from 'deepl-node';
import { DeeplInLang, DeeplOutLang } from './model';


const translator = new Translator(require('../keys.json').DEEPL);

export async function translate(text: string, srcLang:any, dstLang: any): Promise<string> {
    dstLang = dstLang === 'en' ? 'en-US' : dstLang;
    if (!(srcLang in DeeplInLang)) { srcLang = 'en'; }
    if (!(dstLang in DeeplOutLang)) { dstLang = 'en'; }
    return translator.translateText(text, srcLang, dstLang)
        .then(
            (textResult: TextResult) => {return textResult.text;},
            () => ''
        );
}
