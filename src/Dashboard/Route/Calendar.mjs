const i18next = self.teqfw.i18next;
i18next.addResources('lv', 'route-about', {});
i18next.addResources('ru', 'route-about', {});

const template = `
<div>
    <booking></booking>
</div>
`;

export default function Fl32_Leana_Dashboard_Route_Calendar(spec) {
    /** @type {Fl32_Leana_Dashboard_Widget_Booking} */
    const booking = spec.Fl32_Leana_Dashboard_Widget_Booking$;
    return {
        template,
        components: {
            booking
        },
        data: function () {
            return {
                /** @type {Fl32_Leana_Shared_Api_Route_Dashboard_Calendar_Get_Response} */
                calendar: {}
            };
        },
        async mounted() {
            // DEFINE INNER FUNCTIONS
            async function _loadData() {
                const res = await fetch('../api/desktop/calendar/get', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                return await res.json();
            }

            // MAIN FUNCTIONALITY
            const {data} = await _loadData();
            this.calendar = data;
        }
    };
}
