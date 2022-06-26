import { Translator} from 'deepl-node';

const translator = new Translator(require('../keys.json').DEEPL);

export async function translate(text: string, srcLang:any, targetLang: any): Promise<string> {
    targetLang = targetLang === 'en' ? 'en-US' : targetLang;
    return translator.translateText(text, srcLang, targetLang)
        .then((textResult => textResult.text));
}
