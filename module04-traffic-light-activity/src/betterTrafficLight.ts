export type Color = 'red' | 'green' | 'yellow';
// add a new type to contain the duration of the light that can vary between color and the traffic light.
// the duration is in seconds
export type LightDuration = { duration: number };

const defaultRedTime: LightDuration = { duration: 20 };
const defaultYellowTime: LightDuration = { duration: 5 };
const defaultGreenTime: LightDuration = { duration: 15 };

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
  // Use a map that is specific for each traffic light to map from color to time in seconds:
  public colorToDuration: Map<Color, LightDuration> = new Map<Color, LightDuration>();

  public color: Color = 'red';

  // This is also in seconds, representing the amount of time left for the current color before switching to the next:
  public timeLeft: number;

  constructor() {
    // Set default values for the map for backwards compatibility:
    this.colorToDuration.set('red', defaultRedTime);
    this.colorToDuration.set('yellow', defaultYellowTime);
    this.colorToDuration.set('green', defaultGreenTime);

    this.timeLeft = this.getColorTime();
  }

  // Allow the time for any given color to be set manually for each traffic light individually:
  public setColorTime(color: Color, time: number) {
    this.colorToDuration.set(color, { duration: time });
  }

  // Get the amount of time matching the current color:
  public getColorTime(): number {
    const duration = this.colorToDuration.get(this.color);
    if (duration === undefined) {
      throw new Error('Color duration is undefined.');
    }
    return duration.duration;
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
