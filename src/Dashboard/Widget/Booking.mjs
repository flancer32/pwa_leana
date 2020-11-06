const template = `
<div class="booking">
    <div>
        <booking-panel
            :begin="'0900'"
            :end="'2000'"
            :step="60"
        ></booking-panel>
    </div> 
</div>
`;

export default function Fl32_Leana_Dashboard_Widget_Booking(spec) {
    /** @type {Fl32_Leana_Dashboard_Widget_Booking_Panel} */
    const bookingPanel = spec.Fl32_Leana_Dashboard_Widget_Booking_Panel$;
    return {
        template,
        components: {
            bookingPanel
        },
        props: {
            entries: Array
        },
        emits: ['selected'],
        data: function () {
            return {};
        },
        computed: {},
        methods: {}
    };
}
