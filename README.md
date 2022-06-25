# Translate ReeBot

### About
* Uses DeepL for Telegram inline translations to `de`, `en` and `ru` (there is no `ua` in DeepL).


### How To Use
* **setup**
  * go to `@translate_reebot`
  * type `/start`
* **usage**
  * go to any chat
  * type `@translate_reebot hello,,`
    * replace `hello` with text of your choice.
    * (`,,` is the "send query" command)
    * this will translate to `de`
  * can also type `@translate_reebot hello,,ru` or `@translate_reebot hello,,en`
    * this will translate to `ru` or `en`
  * for next use should be able to type `@tr` and `TAB`
  * if it stops working, write me at ivan ; olexyn ; com.

### Как использовать
* **установка**
    * зайдите на `@translate_reebot`
    * введите `/start`
* **использование**
    * зайдите в любой чат
    * введите `@translate_reebot hello,,`
        * замените `hello` на текст по вашему выбору.
        * (`,,` - это команда "отправить запрос")
        * это будет переведено как `de`
    * можно также ввести `@translate_reebot hello,,ru` или `@translate_reebot hello,,en`
        * это переведет на `ru` или `en`.
    * для следующего использования должна быть возможность набирать `@tr` и `TAB`
    * если он перестанет работать, напишите мне по адресу ivan ; olexyn ; com.

### How To Run
* enter API-keys into `keys-template.json`, then rename to `keys.json`.
* see `Dockerfile`


### Special Thanks
* https://github.com/baitun/node-telegram-translate-bot
* https://github.com/yagop/node-telegram-bot-api
