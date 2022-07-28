export default interface NextSlideItem {
  /**
   * The ID of the running process to change the next slide.
   */
  id: number | null;
  /**
   * The time for which the current slide should change and go to the next one.
   */
  duration: number;
  /**
   * Has there been a change between slide.
   */
  isForced: boolean;
  /**
   * The time when the slide change process started.
   */
  startTime: number;
}
