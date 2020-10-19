const i18next = self.teqfw.i18next;
i18next.addResourceBundle('lv', 'widget_timePicker', {}, true);
i18next.addResourceBundle('ru', 'widget_timePicker', {}, true);

const template = `
<div>
    <span @click="$emit('select')">{{label}} ({{inactive}})</span>
</div>
`;

export default function Fl32_Leana_Front_Widget_TimePicker_Entry() {
    return {
        template,
        props: ['label', 'inactive'],
        emits: ['select'],
        data: function () {
            return {
                count: 0
            };
        },
        methods: {
            select() {
                console.log('selected: ' + this.label);
            }
        },
        i18n: self.i18n
    };
}
