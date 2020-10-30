const template = `
<div @click="$emit('selected', id)">
    <input type="radio" name="timePickerEntry" :id="domId"> <label :for="domId">{{label}}</label>
</div>
`;

export default function Fl32_Leana_Front_Widget_TimePicker_Entry() {
    return {
        template,
        props: ['id', 'label'],
        emits: ['selected'],
        computed: {
            domId() {
                return `tpEntry_${this.id}`;
            }
        }
    };
}
