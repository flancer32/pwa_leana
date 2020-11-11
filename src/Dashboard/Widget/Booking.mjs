const template = `
<div class="booking">
    <div>
        <div class="book_panel">
            <booking-entry
                v-for="one in Object.values(panelEntries)"
                :style="{'z-index': one.z}"
                :id="one.id"
                :timestamp="one.hm"
                :tasks = "one.tasks"
                :interval="step"
            ></booking-entry>
        </div>
    </div> 
</div>
`;

export default function Fl32_Leana_Dashboard_Widget_Booking(spec) {
    /** @type {TeqFw_Di_Container} */
    const container = spec.TeqFw_Di_Container$;
    /** @type {Fl32_Leana_Shared_Util_DateTime} */
    const utilDate = spec.Fl32_Leana_Shared_Util_DateTime$;
    /** @type {Fl32_Leana_Dashboard_Widget_Booking_Entry} */
    const bookingEntry = spec.Fl32_Leana_Dashboard_Widget_Booking_Entry$;
    return {
        template,
        components: {
            bookingEntry
        },
        props: {
            begin: String,
            end: String,
            step: Number,
            tasks: Object,
        },
        data: function () {
            return {};
        },
        computed: {
            beginMins() {
                return utilDate.convertDbHrsMinsToMins(this.begin);
            },
            endMins() {
                return utilDate.convertDbHrsMinsToMins(this.begin);
            },
            /**
             * Compose array with 'hours' in rows and tasks being bound to the rows.
             * @return {[]}
             */
            panelEntries() {
                const me = this;

                // DEFINE INNER FUNCTIONS
                function _getTasks() {
                    const result = {};
                    if (Object.keys(me.tasks).length) {
                        for (const one in me.tasks) {
                            const boo = one;
                            debugger;
                        }
                    }
                    return result;
                }

                // MAIN FUNCTIONALITY
                const result = {};
                let intervalBegin = utilDate.convertDbHrsMinsToMins(this.begin);
                const dayEnd = utilDate.convertDbHrsMinsToMins(this.end);
                const tasksSrc = [
                    {id: 21, title: 'Task 001', begin: '09:00', duration: 120},
                    {id: 22, title: 'Task 002', begin: '09:00', duration: 30},
                    {id: 23, title: 'Task 003', begin: '10:00', duration: 30},
                    {id: 24, title: 'Task 004', begin: '14:00', duration: 60},
                    {id: 25, title: 'Task 005', begin: '14:30', duration: 90}
                ];
                tasksSrc.forEach((one) => {
                    one.begin = utilDate.convertHrsMinsToMins(one.begin);
                });
                while (intervalBegin <= dayEnd) {
                    const id = intervalBegin;
                    const hm = utilDate.convertMinsToHrsMins(intervalBegin, true);
                    // filter tasks that started in interval [begin, end].
                    const intervalEnd = intervalBegin + this.step;
                    const tasks = tasksSrc.filter(one => (one.begin >= intervalBegin) && (one.begin < intervalEnd));
                    // const tasks = _getTasks();
                    const z = 1500 - intervalBegin; // z-index (from high to low)
                    // const entry = await container.get('Fl32_Leana_Dashboard_Widget_Booking_Api_Entry');
                    result[id] = Object.assign({}, {id, hm, z, tasks});
                    intervalBegin += this.step;
                }
                return result;
            },
            // panelEntries() {
            //     return {
            //         [2]: {id: 2, hm: '90:90', z: 123, tasks: {}}
            //     };
            // }
        },
        methods: {}
    };
}
