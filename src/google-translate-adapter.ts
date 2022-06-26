const {Translate} = require('@google-cloud/translate').v2;

const projectId = 'translate-reebot';
const translator = new Translate({projectId});
translator.key = require('../keys.json').GOOGLE;

export async function translate(text: string, lang: string) {
    const [translation] = await translator.translate(text, lang);
    return new Promise<string>(() => translation);
}

export async function detect(text: string) {
    const [result] = await translator.detect(text);
    return new Promise<string>(() => result.language);
}
