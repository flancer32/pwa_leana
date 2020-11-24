export default function Fl32_Leana_Dashboard_App_State() {
    return {
        namespaced: true,
        state: {
            overlay: {name: String, params: Object}
        },
        getters: {},
        mutations: {
            setOverlay(state, {name, params}) {
                state.overlay = {name, params};
            }
        },
        actions: {},
    };
}
