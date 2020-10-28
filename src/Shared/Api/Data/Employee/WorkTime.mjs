/**
 * Service data.
 */
export default class Fl32_Leana_Shared_Api_Data_Employee_WorkTime {
    /**
     * Reference to the employee.
     * Optional if substructure of Employee.
     *
     * @type {number}
     */
    employeeRef
    /**
     * Date as 'YYYYMMDD' string.
     *
     * @type {string}
     */
    date
    /**
     * First available working time  as 'HHMM' string.
     *
     * @type {string}
     */
    from
    /**
     * Last available working time  as 'HHMM' string.
     *
     * @type {string}
     */
    to
}
