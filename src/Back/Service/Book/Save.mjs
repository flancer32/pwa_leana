export default class Fl32_Leana_Back_Service_Book_Save {
    /** @type {Fl32_Leana_Extern_Google_Api} */
    #googleApi
    /** @type {Fl32_Leana_Shared_Util_DateTime} */
    #utilDate

    /**  @param {Object} spec */
    constructor(spec) {
        this.#googleApi = spec.Fl32_Leana_Extern_Google_Api$;
        this.#utilDate = spec.Fl32_Leana_Shared_Util_DateTime$;
    }

    /**
     * Method is bound to object prototype (one function for all instances).
     *
     * @param {Function} trx
     * @param {Fl32_Leana_Shared_Api_Route_Book_Save_Request} req
     * @returns {Promise<{}>}
     */
    async exec({trx, req}) {
        // PARSE INPUT & DEFINE WORKING VARS
        const result = {};
        const me = this;
        const apiDate = new Date(req.date);

        // DEFINE INNER FUNCTIONS

        async function saveToDb() {
            const date = me.#utilDate.formatDate(apiDate);
            const hh = `${apiDate.getHours()}`.padStart(2, 0);
            const mm = `${apiDate.getMinutes()}`.padStart(2, 0);
            const from = `${hh}${mm}`;
            const fromMin = me.#utilDate.convertDbHrsMinsToMins(from);
            const toMin = fromMin + Number.parseInt(req.duration);
            const to = me.#utilDate.convertMinsToDbHrsMins(toMin);
            // register ID for entity
            const rs = await trx('book').insert({});
            const bookId = rs[0];
            // add details for new entity
            await trx('book_detail').insert({
                book_ref: bookId,
                employee_ref: req.masterId,
                service_ref: req.serviceId,
                date, from, to
            });
            return bookId;
        }

        async function getEmployeeName(employeeId) {
            const query = trx.select();
            query.from('employee');
            query.where('id', employeeId);
            const rs = await query;
            const data = rs[0];
            return data.code;
        }

        async function getServiceName(serviceId) {
            const query = trx.select();
            query.from('service');
            query.where('id', serviceId);
            const rs = await query;
            const data = rs[0];
            return data.code;
        }

        async function saveToGoogle(bookId, master, service) {
            const summary = `${req.name} (${master})`;
            const description = `
Name: ${req.name}
Email: ${req.email}
Phone: ${req.phone}
Lang: ${req.lang}
Master: ${master}
Service: ${service}
`;
            const end = new Date(apiDate.getTime() + (req.duration * 60 * 1000));
            const opts = {summary, description, start: apiDate, end};
            await me.#googleApi.addEvent(opts);
        }

        // MAIN FUNCTIONALITY
        const bookId = await saveToDb();
        const master = await getEmployeeName(req.masterId);
        const service = await getServiceName(req.serviceId);
        await saveToGoogle(bookId, master, service);

        // COMPOSE RESULT
        return result;
    }
}