/**
 * Save single booking.
 */
// MODULE'S EXPORT
export default class Fl32_Leana_Back_Route_Book_Save {

    constructor(spec) {
        /** @type {Fl32_Leana_App_Config} */
        const _config = spec.Fl32_Leana_App_Config$;
        /** @type {Fl32_Leana_Shared_Util_DateTime} */
        const _utilDate = spec.Fl32_Leana_Shared_Util_DateTime$;
        /** @type {Fl32_Leana_Extern_Google_Api} */
        const _googleApi = spec.Fl32_Leana_Extern_Google_Api$;

        this.handle = async function (req, res) {
            // PARSE INPUT & DEFINE WORKING VARS
            const body = req.body;
            const dataIn = body.data;
            const data = {};
            Object.assign(data, dataIn);

            try {
                const summary = `${dataIn.name} (${dataIn.master})`;
                const description = `
Name: ${dataIn.name}
Email: ${dataIn.email}
Phone: ${dataIn.phone}
Master: ${dataIn.master}
Service: ${dataIn.service}
`;
                const start = new Date(Date.parse(dataIn.date));
                const minutes = _utilDate.convertHrsMinsToMins(dataIn.duration);
                const end = new Date(Date.parse(dataIn.date) + (minutes * 60 * 1000));
                const opts = {summary, description, start, end};
                await _googleApi.addEvent(opts);

                res.setHeader('Content-Type', 'application/json; charset=UTF-8');
                res.end(JSON.stringify({data}));
            } catch (error) {
                console.error(error);
                res.setHeader('Content-Type', 'application/json');
                res.code = 500;
                res.end(JSON.stringify({error}));
            }
        };
    }
}