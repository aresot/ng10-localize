import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "tod",
})
export class TimeOfDayPipe implements PipeTransform {
  transform(value: number): string {
    if (value > 5 && value < 12) {
      return "morning";
    }
    if (value >= 12 && value < 18) {
      return "afternoon";
    }
    if (value >= 18 && value < 22) {
      return "evening";
    }
    return "night";
  }
}
