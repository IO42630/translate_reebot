import { Translator, TargetLanguageCode } from 'deepl-node';

const translator = new Translator(require('../keys.json').DEEPL);

export async function translate(text: string, lang: TargetLanguageCode): Promise<string> {
    let textResult = await translator.translateText(text, null, lang);
    return new Promise<string>(() => textResult.text);
}
