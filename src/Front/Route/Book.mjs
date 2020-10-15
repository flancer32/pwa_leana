// see index.html
const vuejsDatepicker = self.vuejsDatepicker;
const i18next = self.i18n.i18next;

i18next.addResources('en', 'route-book', {});
i18next.addResources('ru', 'route-book', {});

const template = `
<div>
    <span>Book</span>
    <vuejs-datepicker :monday-first="true" :disabled-dates="state.disabledDates"></vuejs-datepicker>
    <button v-on:click="boo">Disable</button>
</div>
`;

export default function Fl32_Leana_Front_Route_Book() {

    return {
        template,
        components: {
            vuejsDatepicker
        },
        data: function () {
            return {
                state: {
                    disabledDates: {
                        to: new Date(2020, 9, 15), // Disable all dates up to specific date
                        from: new Date(2020, 11, 1), // Disable all dates after specific date
                        days: [6, 0], // Disable Saturday's and Sunday's
                        daysOfMonth: [29, 30, 31], // Disable 29th, 30th and 31st of each month
                        // dates: [ // Disable an array of dates
                        //     new Date(2016, 9, 16),
                        //     new Date(2016, 9, 17),
                        //     new Date(2016, 9, 18)
                        // ],
                        // ranges: [{ // Disable dates in given ranges (exclusive).
                        //     from: new Date(2016, 11, 25),
                        //     to: new Date(2016, 11, 30)
                        // }, {
                        //     from: new Date(2017, 1, 12),
                        //     to: new Date(2017, 2, 25)
                        // }],
                        // a custom function that returns true if the date is disabled
                        // this can be used for wiring you own logic to disable a date if none
                        // of the above conditions serve your purpose
                        // this function should accept a date and return true if is disabled
                        customPredictor: function (date) {
                            // disables the date if it is a multiple of 5
                            if (date.getDate() % 5 == 0) {
                                return true;
                            }
                        }
                    }
                }
            };
        },
        methods: {
            boo() {
                this.state.disabledDates.daysOfMonth = [28, 29, 30];
            }
        },
        created() {
            // const me = this;

        }
    };
}
