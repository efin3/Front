export class API {
  data: data;
  onDataChange: (data: data) => void;

  constructor(onDataChange: (data: data) => void) {
    this.data = {
      history: [],
      highScore: 0,
    };
    this.onDataChange = onDataChange;
  }

  savePlay(play: Play) {
    this.data.history.push(play);
    if (play.score > this.data.highScore) {
      this.data.highScore = play.score;
    }
    this.onDataChange(this.data);
  }
}

export class Wrapper {
  private isFound: boolean;
  private isActive: boolean;
  private isAvailable: boolean;
  private callback: (data: data) => void;
  private onFinish: () => void;
  API: API | undefined;

  constructor(callback: (data: data) => void, onFinish: () => void) {
    this.isFound = false;
    this.isActive = false;
    this.isAvailable = true;
    this.API = undefined;
    this.callback = callback;
    this.onFinish = onFinish;
  }

  findAPI(): boolean {
    let win: Window = window;
    while (!window.API) {
      if (win === win.parent) {
        break;
      }
      win = win.parent;
    }
    this.isFound = !!win.API;
    return this.isFound;
  }

  initAPI(): void {
    const api = new API(this.callback);
    window.API = api;
    this.API = api;
    this.isFound = true;
  }

  getData(): data | undefined {
    if (this.isFound) {
      return this.API!.data;
    }
  }

  getHighScore(): number {
    if (this.isFound) {
      return this.API!.data.highScore;
    }
    return 0;
  }
}

interface Play {
  playedAt: Date;
  score: number;
}

export interface data {
  history: Play[];
  highScore: number;

  [key: string]: unknown;
}
