const template = `
<div class="booking">
    <div>
        <div class="book_panel">
            <panel-entry
                v-for="one in panelEntries"
                :style="{'z-index': one.z}"
                :id="one.id"
                :timestamp="one.hm"
                :tasks = "one.tasks"
                :interval="step"
            />
        </div>
<!--        <div class="book_day">
            <div class="hours_grid">
                <div><div>09:00</div></div>
                <div><div>09:30</div></div>
                <div><div>10:00</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
                <div><div>10:30</div></div>
            </div>
            <div class="task_grid">
                <div style="z-index: 1000">
                    <div class="task task01">Task 1</div>
                    <div class="task task02">Task 2</div>
                </div>
                <div style="z-index: 990"></div>
                <div style="z-index: 980"></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>-->
    </div> 
</div>
`;

export default function Fl32_Leana_Dashboard_Widget_Booking_Panel(spec) {
    /** @type {Fl32_Leana_Shared_Util_DateTime} */
    const utilDate = spec.Fl32_Leana_Shared_Util_DateTime$;
    /** @type {Fl32_Leana_Dashboard_Widget_Booking_Panel_Entry} */
    const panelEntry = spec.Fl32_Leana_Dashboard_Widget_Booking_Panel_Entry$;
    return {
        template,
        components: {panelEntry},
        props: {
            begin: String,
            end: String,
            step: Number,
            tasks: Array
        },
        emits: ['selected'],
        data: function () {
            return {};
        },
        computed: {
            panelEntries() {
                const result = [];
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
                    const id = utilDate.convertMinsToDbHrsMins(intervalBegin);
                    const hm = utilDate.convertMinsToHrsMins(intervalBegin, true);
                    // filter tasks that started in interval [begin, end].
                    const intervalEnd = intervalBegin + this.step;
                    const tasks = tasksSrc.filter(one => (one.begin >= intervalBegin) && (one.begin < intervalEnd));
                    const z = 1500 - intervalBegin; // z-index (from high to low)
                    result.push({id, hm, z, tasks});
                    intervalBegin += this.step;
                }
                return result;
            }
        },
        methods: {}
    };
}
