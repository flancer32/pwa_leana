const template = `
<div class="calendar_action_bar">
    <action-bar :params="actions"></action-bar>
</div>
`;

export default function Fl32_Leana_Dashboard_Widget_Calendar_ActionBar(spec) {
    /** @type {Fl32_Leana_Dashboard_Widget_Action_Bar} */
    const actionBar = spec.Fl32_Leana_Dashboard_Widget_Action_Bar$$;   // new instance
    const Bar = spec['Fl32_Leana_Dashboard_Widget_Action_Api#Bar'];
    const Item = spec['Fl32_Leana_Dashboard_Widget_Action_Api#Item'];

    function fnAdd() {
        console.log('add action here...');
    }

    function fnSetDate() {
        console.log('setDate action here...');
    }

    return {
        template,
        components: {
            actionBar
        },
        computed: {
            actions() {
                /** @type {Fl32_Leana_Dashboard_Widget_Action_Api_Item} */
                const add = new Item();
                add.code = 'add';
                add.func = fnAdd;
                add.icon = 'far fa-calendar-plus';
                add.title = 'addTitle';
                /** @type {Fl32_Leana_Dashboard_Widget_Action_Api_Item} */
                const setDate = new Item();
                setDate.code = 'setDate';
                setDate.func = fnSetDate;
                setDate.icon = 'fas fa-calendar-day';
                setDate.title = 'setDateTitle';
                // compose result
                /** @type {Fl32_Leana_Dashboard_Widget_Action_Api_Bar} */
                const result = new Bar();
                result.items = {add, setDate};
                return result;
            }
        }
    };
}
