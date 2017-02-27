import { Component } from '@angular/core';
import { languages, lang } from '../global/languages'

import 'script.js'

@Component({
  selector: 'start-app',
  template: `
    <div class="col-sm-12">
        <h1>{{languages.getLang(lang.lang,'start').get('firsttext')}}</h1>
    </div>
  `
})

export class StartComponent{
    languages = languages
    lang = lang
    langcomponentRu
    langcomponentEn
    constructor(){
      this.langcomponentRu = languages.getLang("Ru", "start")
      this.langcomponentEn = languages.getLang("En", "start")
      
      this.langcomponentRu.set("firsttext","Выберите страницу сайта")
      this.langcomponentEn.set("firsttext","Choose a page of site")
    }
}
