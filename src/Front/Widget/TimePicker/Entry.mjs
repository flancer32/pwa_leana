const i18next = self.teqfw.i18next;
i18next.addResourceBundle('lv', 'widget_timePicker', {}, true);
i18next.addResourceBundle('ru', 'widget_timePicker', {}, true);

const template = `
<div @click="$emit('selected', label)">
    <input type="radio" name="timePickerEntry" :id="domId"> <label :for="domId">{{label}}</label>
</div>
`;

export default function Fl32_Leana_Front_Widget_TimePicker_Entry() {
    return {
        template,
        props: ['id', 'label', 'inactive'],
        emits: ['selected'],
        computed: {
            domId() {
                return `tpEntry_${this.id}`;
            }
        }
    };
}
