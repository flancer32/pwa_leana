/**
 * Save single booking.
 */
// MODULE'S EXPORT
export default class Fl32_Leana_Back_Route_Book_Save {
    /** @type {Fl32_Leana_App_Config} */
    _config

    constructor(spec) {
        this._config = spec.Fl32_Leana_App_Config$;

        this.handle = async function (req, res) {
            // PARSE INPUT & DEFINE WORKING VARS
            const body = req.body;
            const apiReq = body.data;
            const data = {};
            Object.assign(data, apiReq);

            res.setHeader('Content-Type', 'application/json; charset=UTF-8');
            res.end(JSON.stringify({data}));
        };
    }
}
