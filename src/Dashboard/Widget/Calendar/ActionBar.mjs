const template = `
<div class="calendar_action_bar">

</div>
`;

export default function Fl32_Leana_Dashboard_Widget_Calendar_ActionBar(spec) {
    /** @type {Fl32_Leana_Dashboard_Widget_Action_Bar} */
    const actionBar = spec.Fl32_Leana_Dashboard_Widget_Action_Bar$$;   // new instance


    return {
        template,
        components: {
            actionBar
        },
        props: {
            params: Object
        },
        computed: {
            actions() {
                return [];
            }
        }
    };
}
