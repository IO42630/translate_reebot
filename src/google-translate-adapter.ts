import { GoogleLang } from './model';

const {Translate} = require('@google-cloud/translate').v2;

const projectId = 'translate-reebot';
const translator = new Translate({projectId});
translator.key = require('../keys.json').GOOGLE;

export async function translate(text: string, dstLang: string): Promise<string> {
    return translator.translate(text, dstLang)
        .then(
            ([result] : any) => result,
            (error: any) => console.log(error)
        );
}

export async function detect(text: string): Promise<string> {
    return translator.detect(text)
        .then(
            ([result] : any) => !(result.language in GoogleLang) ? 'en' : result.language,
            (error: any) => console.log(error)
        );
}
