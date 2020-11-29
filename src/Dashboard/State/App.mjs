/**
 * State for common functionality of the dashboard application.
 *
 * @return {Object}
 * @constructor
 */
export default function Fl32_Leana_Dashboard_State_App() {
    return {
        namespaced: true,
        state: {
            overlay: {name: String, params: Object},
        },
        getters: {},
        mutations: {
            setOverlay(state, {name, params}) {
                state.overlay = {name, params};
            },
            resetOverlay(state) {
                state.overlay = {name: null, params: {}};
            }
        },
        actions: {},
    };
}
