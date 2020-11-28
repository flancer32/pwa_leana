/**
 * State for calendar related functionality.
 *
 * @return {Object}
 * @constructor
 */
export default function Fl32_Leana_Dashboard_State_Calendar() {
    return {
        namespaced: true,
        state: {
            dateSelected: Date,
        },
        getters: {},
        mutations: {
            setDateSelected(state, date) {
                state.dateSelected = date;
            },
        },
        actions: {},
    };
}
