import { makeAutoObservable } from 'mobx';
import { Theme } from '../types/types';
import { THEMES } from '../constants';
import { makePersistable } from 'mobx-persist-store';

class UIStore {
  theme: Theme = THEMES.LIGHT;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      storage: window.localStorage,
      name: 'mobx:store:ui',
      properties: ['theme'],
    });
  }

  toggleTheme(): void {
    this.theme = this.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  }

  get isDark(): boolean {
    return this.theme === THEMES.DARK;
  }
}

export default UIStore;
