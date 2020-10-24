const i18next = self.teqfw.i18next;
i18next.addResourceBundle('lv', 'widget_timePicker', {
    timePicker: 'Выберите дату'
}, true);
i18next.addResourceBundle('ru', 'widget_timePicker', {
    timePicker: 'Выберите дату'
}, true);

const template = `
<div class="timepicker">
    <span>{{$t('widget_timePicker:timePicker')}} ({{begin}} - {{end}} / {{step}} min.)</span>
    <div class="entries">
        <time-picker-entry
                v-for="one in entries"
                :key="one.id"
                :id="one.id"
                :label="one.label"
                :inactive="one.inactive"
                @selected="entryIsSelected"
        ></time-picker-entry>
    </div>
</div>
`;

export default function Fl32_Leana_Front_Widget_TimePicker(spec) {
    /** @type {Fl32_Leana_Front_Widget_TimePicker_Entry} */
    const entry = spec.Fl32_Leana_Front_Widget_TimePicker_Entry$;
    /** @type {Fl32_Leana_Shared_Util_DateTime} */
    const util = spec.Fl32_Leana_Shared_Util_DateTime$;
    return {
        template,
        components: {
            timePickerEntry: entry
        },
        props: ['begin', 'end', 'step'],
        emits: ['selected'],
        data: function () {
            return {
                selected: null
            };
        },
        computed: {
            /**
             * Calculate array with time picker entries.
             * @returns {[]}
             */
            entries() {
                let result = [];
                const beginMins = util.convertHrsMinsToMins(this.begin);
                const endMins = util.convertHrsMinsToMins(this.end);
                const step = util.convertHrsMinsToMins(this.step);
                let id = 1;
                for (let time = beginMins; (time + step) <= endMins; time += step) {
                    result.push({id: id++, label: util.convertMinsToHrsMins(time, true)});
                }
                return result;
            }
        },
        methods: {
            entryIsSelected(label) {
                this.$emit('selected', label);
            }
        }
    };
}
