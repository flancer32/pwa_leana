export default function Fl32_Leana_Dashboard_State(spec) {
    const app = spec.Fl32_Leana_Dashboard_State_App$;
    const calendar = spec.Fl32_Leana_Dashboard_State_Calendar$;
    return {
        namespaced: true,
        modules: {app, calendar},
    };
}
