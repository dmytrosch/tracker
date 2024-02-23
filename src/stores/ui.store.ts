import { makeAutoObservable } from 'mobx';
import { Theme } from '../types/types';
import { THEMES } from '../constants';

class UIStore {
  theme: Theme = THEMES.LIGHT;

  constructor() {
    makeAutoObservable(this);
  }

  toggleTheme(): void {
    this.theme = this.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  }

  get isDark(): boolean {
    return this.theme === THEMES.DARK;
  }
}

export default UIStore;
