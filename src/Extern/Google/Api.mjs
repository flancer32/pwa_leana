/**
 * Module description.
 */
// NODE.JS IMPORTS
import {google} from 'googleapis';


// MODULE'S PRIVATE MEMBERS
// Google API authorization scopes
const SCOPE_CALENDAR = 'https://www.googleapis.com/auth/calendar';
const SCOPE_EVENTS = 'https://www.googleapis.com/auth/calendar.events';

/**
 * Google API authorization.
 *
 * @param {string} email
 * @param {string} key
 * @returns {Promise<JWT>}
 */
async function $authorize(email, key) {
    const jwt = new google.auth.JWT(email, null, key, [SCOPE_CALENDAR, SCOPE_EVENTS]);
    await jwt.authorize();
    return jwt;
}

// MODULE'S EXPORT
export default class Fl32_Leana_Extern_Google_Api {
    /** @type {Fl32_Leana_App_Logger} */
    _logger
    _calendar

    /**  @param {Object} spec */
    constructor(spec) {
        // INJECT DEPENDENCIES INTO THIS INSTANCE (PROPS AND VARS IN THE CLOSURE OF THE CONSTRUCTOR)
        this._config = spec.Fl32_Leana_App_Config$;
        this._calendar = google.calendar('v3');

        // POPULATE CURRENT INSTANCE WITH BASE CLASSES METHODS (COMPOSITION INSTEAD OF INHERITANCE)
        // const base = spec.Vendor_Module_Base_Class$;
        // objFactory.assignPrototypeMethods(this, base);

        // INIT OWN PROPERTIES AND DEFINE WORKING VARS
        // let _registry = 0; // instance level variable is started with '_'

        // DEFINE INNER FUNCTIONS (AVAILABLE FOR CURRENT INSTANCE ONLY)
        // function _inner() {
        //     return (_registry += 1);
        // }

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)

    }


    /**
     * Create new event in Google Calendar.
     *
     * @param {string} summary
     * @param {number} description
     * @param {Object} start
     * @param {Object} end
     * @returns {Promise<{}>}
     */
    async addEvent({summary, description, start, end}) {
        const api = this._config.get('local/service/google/api');
        const {email, key} = api.access;
        const auth = await $authorize(email, key);
        const event = {
            summary,
            description,
            start: {
                'dateTime': '2020-10-20T18:00:00+02:00',
                'timeZone': 'Europe/Riga',
            },
            end: {
                'dateTime': '2020-10-20T18:30:00+02:00',
                'timeZone': 'Europe/Riga',
            }
        };
        const res = await this._calendar.events.insert({
            auth: auth,
            calendarId: api.calendarId,
            resource: event,
        });
        if (res.status && res.status === 200) {
            // this._logger.debug('');
        } else {
            // this._logger.error('Cannot add new event: ' + JSON.stringify(res));
        }
    }
}
