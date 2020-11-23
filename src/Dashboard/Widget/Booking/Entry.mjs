const template = `
<div class="book_panel_entry" :id="id">
    <div class="panel_entry_time">{{timestamp}}</div>
    <div class="panel_entry_tasks">
        <div v-for="one of tasks" 
            class="panel_entry_tasks_item"
            :style="getStyle(one)"
        >
            {{one.id}} / {{one.title}} 
        </div>
    </div>
</div>
`;
/**
 * One row in
 * @return {Object}
 * @constructor
 */
export default function Fl32_Leana_Dashboard_Widget_Booking_Entry() {
    return {
        template,
        components: {},
        props: {
            id: String,
            interval: Number,
            tasks: Array,
            timestamp: String,
            begin: Number,
            end: Number,
        },
        emits: ['selected'],
        data: function () {
            return {};
        },
        computed: {},
        methods: {
            /**
             *
             * @param {Fl32_Leana_Dashboard_Widget_Booking_Api_Task} task
             * @return {string}
             */
            getStyle(task) {
                const cssVarRowHeight = window.getComputedStyle(document.body)
                    .getPropertyValue('--booking-row-height');
                const rowHeight = cssVarRowHeight.replace('px', '').trim();
                const k = task.duration / this.interval;
                const widthPercent = 100 / task.activeTasks;
                const cssWidth = `width:${widthPercent - 1}%`;
                const cssHeight = `height:${Number.parseInt(rowHeight * k) - 5}px`;

                const cssLeft = `left: ${(task.column - 1) * widthPercent}%`;
                const beginDelta = (task.begin - this.begin);
                const topIndent = (beginDelta / this.interval) * rowHeight;
                const cssTop = `top: ${topIndent}px`;
                return `${cssHeight}; ${cssWidth}; ${cssTop};  ${cssLeft}`;
            }
        }
    };
}
