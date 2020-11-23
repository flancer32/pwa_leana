/**
 * Data structure for entry's task in Booking Panel (booked service).
 */
export default class Fl32_Leana_Dashboard_Widget_Booking_Api_Task {
    /**
     * Unique ID for DOM element.
     * @type {string}
     */
    id
    /**
     * Label for the task
     * @type {string}
     */
    title
    /**
     * Start time for the task in minutes from day begin (00:00)
     * @type {number} 540
     */
    begin
    /**
     * End time for the task in minutes from day begin (00:00)
     * @type {number} 570
     */
    end
    /**
     * Duration in minutes.
     * @type {Number} 30
     */
    duration
    /**
     * Total active tasks for the period (row - hour, half, etc.).
     * @type {number} 1, 2, 3, ...
     */
    activeTasks
    /**
     * Position in row to print out task.
     * @type {number} 1,2,3
     */
    column
}
