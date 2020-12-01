/**
 * Special route to develop widgets.
 */
const i18next = self.teqfw.i18next;
i18next.addResources('lv', 'route-about', {});
i18next.addResources('ru', 'route-about', {});

const template = `
<div>
    <task-edit :params="params"></task-edit>
</div>`;

export default function Fl32_Leana_Realm_Desk_Route_Dev(spec) {
    const wgTaskEdit = spec.Fl32_Leana_Realm_Desk_Widget_Task_Edit$;
    const Task = spec['Fl32_Leana_Realm_Desk_Widget_Api_Task#'];
    return {
        template,
        components: {
            taskEdit: wgTaskEdit
        },
        data: function () {
            return {
                params: new Task()
            };
        },
    };
}
