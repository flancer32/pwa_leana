/**
 * Shared functions to process date-time values (are used on front and back).
 */


// MODULE'S EXPORT
export default class Fl32_Leana_Shared_Util_DateTime {
    /**
     *  Convert minutes to 'hours:minutes'.
     *
     * @param {Number} mins
     * @returns {string}
     */
    convertMinsToHrsMins(mins) {
        let h = 0;
        let m = 0;
        if (mins) {
            h = Math.floor(mins / 60);
            m = mins % 60;
        }
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return `${h}:${m}`;
    }

    /**
     * Convert 'hours:minutes' to minutes.
     *
     * @param {string} hm 10:00
     * @returns {number} 600
     */
    convertHrsMinsToMins(hm) {
        let result = 0;
        if (
            (typeof hm === 'string') &&
            (hm.includes(':'))
        ) {
            const [h, m] = hm.split(':');
            result = Number(h) * 60 + Number(m);
        } else if (hm) {
            result = Number(hm);
        }
        return result;
    }
}
