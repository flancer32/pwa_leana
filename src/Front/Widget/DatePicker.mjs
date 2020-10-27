const i18next = self.teqfw.i18next;

i18next.addResourceBundle('lv', 'widget_datePicker', {
    datePicker: 'Izvēlieties datumu'
}, true);
i18next.addResourceBundle('ru', 'widget_datePicker', {
    datePicker: 'Выберите дату'
}, true);

const template = `
<div class="datepicker">
    <div>
        <input type="text" id="bookDate" name="datePicker" disabled :placeholder="$t('widget_datePicker:datePicker')">
    </div>
    <div><button v-on:click="showHide">...</button></div>
</div>
`;

export default function Fl32_Leana_Front_Widget_TimePicker(spec) {
    /** @type {Fl32_Leana_Shared_Util_DateTime} */
    const util = spec.Fl32_Leana_Shared_Util_DateTime$;
    return {
        template,
        components: {},
        props: ['begin', 'end', 'step'],
        emits: ['selected'],
        data: function () {
            return {
                widgetPicker: null
            };
        },
        computed: {},
        methods: {
            showHide(event) {
                event.stopPropagation();
                const isHidden = this.widgetPicker.calendarContainer.classList.contains('qs-hidden');
                this.widgetPicker[isHidden ? 'show' : 'hide']();
            }
        },
        async mounted() {
            function initDatepicker() {
                const week3Forward = util.forwardDate(21);

                me.widgetPicker = self.datepicker('#bookDate', {
                    disabledDates: [],
                    disableYearOverlay: true,
                    maxDate: week3Forward,
                    minDate: new Date(),
                    showAllDates: true,
                    startDay: 1,
                    onSelect: (inst) => {
                        me.$emit('selected', inst.dateSelected);
                    }
                });
            }

            const me = this;
            initDatepicker();
        }
    };
}
