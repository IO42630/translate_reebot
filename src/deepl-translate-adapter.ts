import { Translator, TargetLanguageCode } from 'deepl-node';

const translator = new Translator(require('../keys.json').DEEPL);

export async function translate(text: string, lang: TargetLanguageCode): Promise<string> {
    return translator.translateText(text, null, lang)
        .then((textResult => textResult.text));
}
