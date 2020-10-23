/**
 * Get booking state (categories, services, masters, ...).
 */
export default class Fl32_Leana_Back_Route_Book_State_Get {

    constructor(spec) {
        /** @type {Fl32_Leana_App_Db_Connector} */
        const _db = spec.Fl32_Leana_App_Db_Connector$;

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)
        /**
         * API route handler to get booking state.
         *
         * @param req
         * @param res
         * @returns {Promise<void>}
         * @see Fl32_Leana_App_Server.addApiRoute
         */
        this.handle = async function (req, res) {
            // PARSE INPUT & DEFINE WORKING VARS
            const data = {};

            // DEFINE INNER FUNCTIONS (AVAILABLE FOR CURRENT INSTANCE ONLY)

            async function _getEmployees(trx) {
                const result = [];
                const query = trx.select();
                query.from('employee');
                const rs = await query;
                for (const one of rs) {
                    result.push(Object.assign({}, one));
                }
                return result;
            }

            async function _getServices(trx) {
                const result = [];
                const query = trx.select();
                query.from('service');
                const rs = await query;
                for (const one of rs) {
                    result.push(Object.assign({}, one));
                }
                return result;
            }

            async function _getServicesMap(trx) {
                const result = [];
                const query = trx.select();
                query.from('employee_service');
                const rs = await query;
                for (const one of rs) {
                    result.push(Object.assign({}, one));
                }
                return result;
            }

            async function _getWorkTime(trx) {
                const result = [];
                const query = trx.select();
                query.from('employee_time_work');
                const rs = await query;
                for (const one of rs) {
                    result.push(Object.assign({}, one));
                }
                return result;
            }

            // MAIN FUNCTIONALITY
            const trx = await _db.startTransaction();
            try {
                const employees = await _getEmployees(trx);
                const services = await _getServices(trx);
                const servicesMap = await _getServicesMap(trx);
                const workTime = await _getWorkTime(trx);
                Object.assign(data, {employees, services, servicesMap, workTime});
                trx.commit();
                // COMPOSE SUCCESS RESPONSE
                res.setHeader('Content-Type', 'application/json; charset=UTF-8');
                res.end(JSON.stringify({data}));
            } catch (error) {
                trx.rollback();
                // COMPOSE FAILURE RESPONSE
                console.error(error);
                res.setHeader('Content-Type', 'application/json');
                res.code = 500;
                res.end(JSON.stringify({error}));
            }
        };
    }
}
