import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  array: number[] = [0, 1, 2];

  constructor(
    private swUpdate: SwUpdate,
  ) {
  }

  ngOnInit(): void {

    // TODO проверяем поддерживает ли браузер sw
    if (this.swUpdate.isEnabled) {
      this.checkVersion();
    }

  }

  // при первой загрузке sw узнает о том есть ли новая версия, при второй - скачивает новую версию
  checkVersion() {
    // TODO проверка на наличие актуальной версии
    this.swUpdate
      .available
      .subscribe(
        () => {
          if (confirm('Доступна новая версия приложения. Загрузить новую версию?')) {
            window.location.reload();
          }
        }
      );
  }

}

