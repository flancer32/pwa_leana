const template = `
<div class="action_bar" style="width: 100%; height: 20px; background-color: #c1433b">

</div>
`;

export default function Fl32_Leana_Dashboard_Widget_Action_Bar(spec) {
    /** @type {Fl32_Leana_Dashboard_Widget_Action_Bar} */
    const actionBar = spec.Fl32_Leana_Dashboard_Widget_Action_Bar$$;   // new instance

    return {
        template,
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
