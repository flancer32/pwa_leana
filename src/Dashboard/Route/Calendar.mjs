const i18next = self.teqfw.i18next;
i18next.addResources('lv', 'route-about', {});
i18next.addResources('ru', 'route-about', {});

const template = `
<div>
    <booking 
        :tasks="bookedTasks"
        :begin="'0900'"
        :end="'2000'"
        :step="60"
    ></booking>
</div>
`;

export default function Fl32_Leana_Dashboard_Route_Calendar(spec) {
    /** @type {TeqFw_Di_Container} */
    const container = spec.TeqFw_Di_Container$;
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
                calendar: {},
                bookedTasks: {},
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

            /**
             * Convert API data to UI data.
             * @param {Fl32_Leana_Shared_Api_Route_Dashboard_Calendar_Get_Response} data
             */
            async function _prepareBookedTasks(data) {
                const result = {};
                for (const taskId in data.tasks) {
                    /** @type {Fl32_Leana_Shared_Api_Data_Dashboard_Task} */
                    const taskApi = data.tasks[taskId];
                    /** @type {Fl32_Leana_Dashboard_Widget_Booking_Api_Task} */
                    const taskUi = await container.get('Fl32_Leana_Dashboard_Widget_Booking_Api_Task');
                    const employeeId = taskApi.employeeRef;
                    const serviceId = taskApi.serviceRef;
                    const employeeCode = data.employees[employeeId]['code'];
                    const serviceCode = data.services[serviceId]['code'];
                    const title = `${employeeCode}: ${serviceCode}`;
                    const id = Number.parseInt(taskApi.id);
                    taskUi.id = id;
                    taskUi.title = title;
                    result[id] = taskUi;
                }
                return result;
            }

            // MAIN FUNCTIONALITY
            const {data} = await _loadData();
            this.calendar = data;
            this.bookedTasks = _prepareBookedTasks(data);
        }
    };
}
