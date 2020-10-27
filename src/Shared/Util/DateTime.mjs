/**
 * Shared functions to process date-time values (are used on front and back).
 */


// MODULE'S EXPORT
export default class Fl32_Leana_Shared_Util_DateTime {
    /**
     *  Convert minutes to 'hours:minutes'.
     *
     * @param {Number} mins
     * @param {boolean} addLeadingZero to hours only
     * @returns {string}
     */
    convertMinsToHrsMins(mins, addLeadingZero = false) {
        let h = 0;
        let m = 0;
        if (mins) {
            h = Math.floor(mins / 60);
            m = mins % 60;
        }
        if (addLeadingZero) {
            h = h < 10 ? '0' + h : h;
        }
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

    /**
     * Convert `dateIn` into 'YYYYMMDD'. `new Date()` is used if `dateIn` is null.
     *
     * @param {Date|null} dateIn
     * @returns {string}
     */
    formatDate(dateIn = null) {
        /** @type {Date} */
        const date = (dateIn) ? dateIn : new Date();
        const y = date.getFullYear();
        let m = (date.getMonth() + 1);
        let d = date.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        return `${y}${m}${d}`;
    }

    /**
     * Return `date` forwarded up to `days`.
     *
     * @param {number} days
     * @param {Date|null} date
     * @returns {Date}
     */
    forwardDate(days, date = null) {
        let result = (date) ? new Date(date.getTime()) : new Date();
        result.setDate(result.getDate() + days);
        return result;
    }
}
