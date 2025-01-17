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
  color: Color = 'red';

  timeLeft = 20;

  /* simulate one second passing */
  public tick() {
    this.color = colorAtNextSecond(this.color, this.timeLeft);
    if (this.timeLeft === 1) {
      switch (this.color) {
        case 'red':
          this.timeLeft = 20;
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
