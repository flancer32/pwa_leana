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
    /** @type {Fl32_Leana_Dashboard_Widget_Booking} */
    const booking = spec.Fl32_Leana_Dashboard_Widget_Booking$;
    /** @type {Fl32_Leana_Shared_Util_DateTime} */
    const utilDate = spec.Fl32_Leana_Shared_Util_DateTime$;
    const TaskUi = spec['Fl32_Leana_Dashboard_Widget_Booking_Api_Task#'];

    return {
        template,
        components: {
            booking
        },
        data: function () {
            return {
                /** @type {Fl32_Leana_Shared_Api_Route_Dashboard_Calendar_Get_Response} */
                calendarData: {},
                /** @type {Object.<string,Object<number, Fl32_Leana_Dashboard_Widget_Booking_Api_Task>>} */
                bookedTasks: {},
            };
        },
        async mounted() {
            // DEFINE INNER FUNCTIONS

            /**
             * Load all booked tasks from server.
             * @return {Promise<any>}
             * @private
             */
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
             * @return {Object.<string, Object.<number, Fl32_Leana_Dashboard_Widget_Booking_Api_Task>>} {'YYYYMMDD':{id:{TaskUI}}}
             */
            function _prepareBookedTasks(data) {
                const result = {};
                for (const taskId in data.tasks) {
                    /** @type {Fl32_Leana_Shared_Api_Data_Dashboard_Task} */
                    const taskApi = data.tasks[taskId];
                    const bookedDate = taskApi.bookedDate;  // 20201120
                    result[bookedDate] = result[bookedDate] || {};
                    const minsBegin = utilDate.convertDbHrsMinsToMins(taskApi.bookedBegin); // 615
                    const minsEnd = utilDate.convertDbHrsMinsToMins(taskApi.bookedEnd); // 645
                    const duration = minsEnd - minsBegin;       // 30
                    /** @type {Fl32_Leana_Dashboard_Widget_Booking_Api_Task} */
                    const taskUi = new TaskUi();
                    const employeeId = taskApi.employeeRef;
                    const serviceId = taskApi.serviceRef;
                    const employeeCode = data.employees[employeeId]['code'];
                    const serviceCode = data.services[serviceId]['code'];
                    const customer = taskApi.customerName;
                    const email = taskApi.customerEmail ?? '';
                    const phone = taskApi.customerPhone ?? '';
                    const title = `${customer} (${email}, ${phone}) (${employeeCode}: ${serviceCode})`;
                    const id = Number.parseInt(taskApi.id);
                    taskUi.id = id; // 1
                    taskUi.title = title;   // "elena: haircut_man"
                    taskUi.begin = minsBegin;   // 540
                    taskUi.end = minsEnd;       // 570
                    taskUi.duration = duration; // 30
                    result[bookedDate][id] = taskUi;
                }
                return result;
            }

            // MAIN FUNCTIONALITY
            const {data} = await _loadData();
            this.calendarData = data;
            this.bookedTasks = _prepareBookedTasks(data);
        }
    };
}
