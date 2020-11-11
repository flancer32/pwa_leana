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
    /** @type {Object.<string, Fl32_Leana_Dashboard_Widget_Booking_Api_Task>} */
    tasks
    /** @type {number} */
    cssZindex
}
