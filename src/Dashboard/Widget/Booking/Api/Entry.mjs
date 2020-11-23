/**
 * Data structure for Booking Panel entry (hour with bound tasks).
 */
export default class Fl32_Leana_Dashboard_Widget_Booking_Api_Entry {
    /**
     * Unique ID for DOM element.
     * @type {string}
     */
    id
    /**
     * Label for the row (HH:MM)
     * @type {string}
     */
    timestamp
    /**
     * Start of the entry interval in minutes from the day beginning (inclusive).
     * @type {number} 540
     */
    begin
    /**
     * End of the entry interval in minutes from the day beginning (exclusive).
     * @type {number} 600
     */
    end
    /** @type {Object.<string, Fl32_Leana_Dashboard_Widget_Booking_Api_Task>} */
    tasks
    /**
     * Total active tasks for the period (row - hour, half, etc.).
     * Some tasks can be started in other periods.
     * @type {number} 1, 2, 3, ...
     */
    activeTasks
    /** @type {number} */
    cssZindex
}
