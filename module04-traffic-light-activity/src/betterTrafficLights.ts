export type Color = 'red' | 'green' | 'yellow';

export function colorAtNextSecond(color: Color, time: number): Color {
  switch (color) {
    case 'red':
      return time === 1 ? 'green' : 'red';
    case 'yellow':
      return time === 1 ? 'red' : 'yellow';
    case 'green':
      return time === 1 ? 'yellow' : 'green';
    default:
      throw new Error("This error shouldn't occur.");
  }
}

export class TrafficLight {
  public colorToDuration: Map<Color, number> = new Map<Color, number>();

  public color: Color = 'red';

  constructor() {
    this.colorToDuration.set('red', 20);
    this.colorToDuration.set('yellow', 5);
    this.colorToDuration.set('green', 15);
  }

  public setColorTime(color: Color, time: number) {
    this.colorToDuration.set(color, time);
  }

  public getColorTime(): number {
    const duration = this.colorToDuration.get(this.color);
    if (duration === undefined) {
      throw new Error('Color duration is undefined.');
    }
    return duration;
  }

  public timeLeft = this.getColorTime();

  /* simulate one second passing */
  public tick() {
    this.color = colorAtNextSecond(this.color, this.getColorTime());
    if (this.timeLeft === 1) {
      switch (this.color) {
        case 'red':
          this.getColorTime() = 20;
          break;
        case 'yellow':
          this.timeLeft = 5;
          break;
        case 'green':
          this.timeLeft = 15;
          break;
        default:
          throw new Error("This error shouldn't occur.");
      }
    } else {
      this.timeLeft -= 1;
    }
  }

  public setTime(t: number) {
    this.timeLeft = t;
  }

  public getColor() {
    return this.color;
  }
}
