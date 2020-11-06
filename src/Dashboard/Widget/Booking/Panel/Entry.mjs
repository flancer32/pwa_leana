const template = `
<div class="book_panel_entry" :id="id">
    <div class="panel_entry_time">{{timestamp}}</div>
    <div class="panel_entry_tasks">
        <div v-for="one of tasks" 
            class="panel_entry_tasks_item"
            :style="getStyle(one)"
        >
            {{one.id}} / {{one.title}} / {{one.begin}} / {{one.duration}}
        </div>
    </div>
</div>
`;

export default function Fl32_Leana_Dashboard_Widget_Booking_Panel_Entry() {
    return {
        template,
        components: {},
        props: {
            id: String,
            interval: Number,
            tasks: Array,
            timestamp: String,
        },
        emits: ['selected'],
        data: function () {
            return {};
        },
        computed: {},
        methods: {
            getStyle(task) {
                const cssVarRowHeight = window.getComputedStyle(document.body)
                    .getPropertyValue('--booking-row-height');
                const rowHeight = cssVarRowHeight.replace('px', '').trim();
                const boo = task.duration / this.interval;
                return 'height: ' + Number.parseInt(rowHeight * boo) + 'px';
            }
        }
    };
}
