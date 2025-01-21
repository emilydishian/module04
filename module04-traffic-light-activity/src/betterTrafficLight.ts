export type Color = 'red' | 'green' | 'yellow';

const DEFAULT_RED_TIME = 20;
const DEFAULT_YELLOW_TIME = 5;
const DEFAULT_GREEN_TIME = 15;

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
  // Use a map that is specific for each traffic light to map from color to time:
  public colorToDuration: Map<Color, number> = new Map<Color, number>();

  public color: Color = 'red';

  public timeLeft: number;

  constructor() {
    // Set default values for the map for backwards compatibility:
    this.colorToDuration.set('red', DEFAULT_RED_TIME);
    this.colorToDuration.set('yellow', DEFAULT_YELLOW_TIME);
    this.colorToDuration.set('green', DEFAULT_GREEN_TIME);

    this.timeLeft = this.getColorTime();
  }

  // Allow the time for any given color to be set manually for each traffic light individually:
  public setColorTime(color: Color, time: number) {
    this.colorToDuration.set(color, time);
  }

  // Get the amount of time matching the current color:
  public getColorTime(): number {
    const duration = this.colorToDuration.get(this.color);
    if (duration === undefined) {
      throw new Error('Color duration is undefined.');
    }
    return duration;
  }

  /* simulate one second passing */
  public tick() {
    this.color = colorAtNextSecond(this.color, this.timeLeft);
    if (this.timeLeft === 1) {
      this.timeLeft = this.getColorTime();
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
