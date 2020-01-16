import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'change-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {

  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr', 'ta']);
    translate.setDefaultLang('en');
  }
  activeCode = 'en'

  changeLanguage(code) {
    this.activeCode = code
    this.translate.use(code)
  }
}
