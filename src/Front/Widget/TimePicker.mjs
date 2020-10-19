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

/**
 *  Convert minutes to 'hours:minutes'.
 *
 * @param {Number} mins
 * @returns {string}
 */
function convertMinsToHrsMins(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m}`;
}

/**
 * Convert 'hours:minutes' to minutes.
 *
 * @param {string} hm 10:00
 * @returns {number} 600
 */
function convertHrsMinsToMins(hm) {
    let result;
    if (hm.includes(':')) {
        const [h, m] = hm.split(':');
        result = Number(h) * 60 + Number(m);
    } else {
        result = Number(hm);
    }
    return result;
}

export default function Fl32_Leana_Front_Widget_TimePicker(spec) {
    const entry = spec.Fl32_Leana_Front_Widget_TimePicker_Entry$;
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
                const beginMins = convertHrsMinsToMins(this.begin);
                const endMins = convertHrsMinsToMins(this.end);
                const step = convertHrsMinsToMins(this.step);
                let id = 1;
                for (let time = beginMins; (time + step) <= endMins; time += step) {
                    result.push({id: id++, label: convertMinsToHrsMins(time)});
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
