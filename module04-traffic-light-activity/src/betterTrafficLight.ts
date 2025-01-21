export type Color = 'red' | 'green' | 'yellow';
// add a new type to contain the duration of the light that can vary between color and the traffic light.
// the duration is in seconds
export type LightDuration = { duration: number };

const defaultRedTime: LightDuration = { duration: 20 };
const defaultYellowTime: LightDuration = { duration: 5 };
const defaultGreenTime: LightDuration = { duration: 15 };

export class TrafficLight {
  // Use a map that is specific for each traffic light to map from color to time in seconds:
  public colorToDuration: Map<Color, LightDuration> = new Map<Color, LightDuration>();

  public color: Color;

  // This is also in seconds, representing the amount of time left for the current color before switching to the next:
  public timeLeft: number;

  constructor() {
    // Set default values for the map for backwards compatibility:
    this.colorToDuration.set('red', defaultRedTime);
    this.colorToDuration.set('green', defaultGreenTime);
    this.colorToDuration.set('yellow', defaultYellowTime);

    this.color = 'red';
    this.timeLeft = this.getColorTime();
  }

  // Return the color this light will be at the next second
  private _colorAtNextSecond(): Color {
    if (this.timeLeft > 1) {
      return this.getColor();
    }

    // At this point, we know timeLeft is <= 1 so a color switch is needed.
    const colors = Array.from(this.colorToDuration.keys());
    const currentIndex = colors.indexOf(this.getColor());

    // Calculate the next index, looping around if at the end of the array
    const nextIndex = (currentIndex + 1) % colors.length;

    // Return the color at the next index
    return colors[nextIndex];
  }

  // Allow the time for any given color to be set manually for each traffic light individually.
  public setColorTime(color: Color, time: number) {
    this.colorToDuration.set(color, { duration: time });
  }

  // Get the amount of time matching the current color.
  public getColorTime(): number {
    const duration = this.colorToDuration.get(this.getColor());
    if (duration === undefined) {
      throw new Error('Color duration is undefined.');
    }
    return duration.duration;
  }

  /* simulate one second passing */
  public tick() {
    // First transition the color to the next if time is up
    this.color = this._colorAtNextSecond();

    if (this.timeLeft === 1) {
      // If we just transitioned, update the time
      this.timeLeft = this.getColorTime();
    } else {
      // We did not transition, so just subtract 1 from time.
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
