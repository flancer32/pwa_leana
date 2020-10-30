const i18next = self.teqfw.i18next;
i18next.addResourceBundle('lv', 'widget_timePicker', {
    noEntries: 'Tukšs',
    timePicker: 'Izvēlieties laiku',
}, true);
i18next.addResourceBundle('ru', 'widget_timePicker', {
    noEntries: 'Пусто',
    timePicker: 'Выберите время',
}, true);

const template = `
<div class="timepicker">
    <div class="inputs">
        <div>
            <button v-on:click="showEntries = !showEntries">...</button>
        </div>
        <div>
            <input type="text" name="timePicker" v-model="interval" disabled
                   :placeholder="$t('widget_timePicker:timePicker')">
        </div>
    </div>
    <div v-show="showEntries">
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
        <div v-show="entries.length===0">{{ $t('widget_timePicker:noEntries') }}</div>
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
        props: {
            entries: Array,
            begin: String,
            end: String,
            taskDuration: Number
        },
        emits: ['selected'],
        data: function () {
            return {
                interval: null,
                selected: null,
                showEntries: false,
            };
        },
        computed: {
            /**
             * Calculate array with time picker entries.
             * @returns {[]}
             */
            entriesOld() {
                let result = [];
                const beginMins = util.convertHrsMinsToMins(this.begin);
                const endMins = util.convertHrsMinsToMins(this.end);
                const duration = util.convertHrsMinsToMins(this.taskDuration);
                let id = 1;
                for (let time = beginMins; (time + duration) <= endMins; time += duration) {
                    result.push({id: id++, label: util.convertMinsToHrsMins(time, true)});
                }
                return result;
            }
        },
        methods: {
            entryIsSelected(label) {
                const start = util.convertHrsMinsToMins(label);
                const end = start + Number.parseInt(this.taskDuration);
                const startHM = util.convertMinsToHrsMins(start);
                const endHM = util.convertMinsToHrsMins(end);
                this.interval = `${startHM}-${endHM}`;
                this.$emit('selected', label);
                this.showEntries = false;
            }
        }
    };
}
