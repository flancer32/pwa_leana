const app = self.teqfw.app;
const mapMutations = self.teqfw.lib.Vuex.mapMutations;

const template = `
<div class="calendar_action_bar">
    <action-bar :params="actions"></action-bar>
</div>
`;

export default function Fl32_Leana_Realm_Desk_Widget_Calendar_ActionBar(spec) {
    /** @type {Fl32_Leana_Realm_Desk_Widget_Action_Bar} */
    const actionBar = spec.Fl32_Leana_Realm_Desk_Widget_Action_Bar$$;   // new instance
    const Bar = spec['Fl32_Leana_Realm_Desk_Widget_Action_Api#Bar'];
    const Item = spec['Fl32_Leana_Realm_Desk_Widget_Action_Api#Item'];
    const calendarSetDate = spec.Fl32_Leana_Realm_Desk_Widget_Calendar_SetDate$$;

    app.component('calendarSetDate', calendarSetDate);

    return {
        template,
        components: {
            actionBar
        },
        computed: {
            actions() {
                /** @type {Fl32_Leana_Realm_Desk_Widget_Action_Api_Item} */
                const add = new Item();
                add.code = 'add';
                add.func = this.actionAddTask;
                add.icon = 'far fa-calendar-plus';
                add.title = 'addTitle';
                /** @type {Fl32_Leana_Realm_Desk_Widget_Action_Api_Item} */
                const setDate = new Item();
                setDate.code = 'setDate';
                setDate.func = this.actionSetDate;
                setDate.icon = 'fas fa-calendar-day';
                setDate.title = 'setDateTitle';
                // compose result
                /** @type {Fl32_Leana_Realm_Desk_Widget_Action_Api_Bar} */
                const result = new Bar();
                result.items = {add, setDate};
                return result;
            }
        },
        methods: {
            actionAddTask() {
                console.log('add task should be here...');
            },
            actionSetDate() {
                this.setOverlay({name: 'calendarSetDate', params: {}});
            },
            ...mapMutations('app', [
                'setOverlay'
            ]),
        }
    };
}
