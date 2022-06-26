const {Translate} = require('@google-cloud/translate').v2;

const projectId = 'translate-reebot';
const translator = new Translate({projectId});
translator.key = require('../keys.json').GOOGLE;

export async function translate(text: string, lang: string): Promise<string> {
    return translator.translate(text, lang)
        .then(([result] : any) => result);
}

export async function detect(text: string): Promise<string> {
    return translator.detect(text)
        .then(([result] : any) => result.language);
}
