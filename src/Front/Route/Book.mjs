const i18next = self.teqfw.i18next;


i18next.addResourceBundle('lv', 'route-book', {
    action: {
        send: 'Nosūtīt'
    },
    email: 'Jūsu e-pasts',
    emailPH: 'e-pasts: user@domain.com',
    master: 'Meistars',
    masterLabel: {
        elena: 'Helena',
        natalie: 'Natalija',
    },
    masterSelect: 'Izvēlieties meistaru',
    name: 'Jūsu vārds',
    namePH: 'vārds: John Doe',
    phone: 'Jūsu telefons',
    phonePH: 'telefons: 29101010',
    service: 'Pakalpojums',
    serviceLabel: {
        haircut_man: 'Vīriešu frizūra ({{time}})',
        haircut_women: 'Sieviešu frizūra ({{time}})',
        haircut_child: 'Bērnu frizūra ({{time}})',
        color_simple: 'Vienkārša krāsošana ({{time}})',
        color_complex: 'Kompleksa krāsošana ({{time}})',
        color_highlight: 'Izcelšana ({{time}})',
        perm: 'Perm ({{time}})',
    },
    serviceSelect: 'Izvēlieties pakalpojumu',
    title: 'Pierakstīties',
}, true);
i18next.addResourceBundle('ru', 'route-book', {
    action: {
        send: 'Отправить'
    },
    email: 'Ваш email',
    emailPH: 'email: user@domain.com',
    master: 'Мастер',
    masterLabel: {
        elena: 'Елена',
        natalie: 'Наталья',
    },
    masterSelect: 'Выберите мастера',
    name: 'Ваше имя',
    namePH: 'имя: Василий Пупкин',
    phone: 'Ваш телефон',
    phonePH: 'телефон: 29101010',
    service: 'Услуга',
    serviceLabel: {
        haircut_man: 'Стрижка мужская ({{time}})',
        haircut_women: 'Стрижка женская ({{time}})',
        haircut_child: 'Стрижка детская ({{time}})',
        color_simple: 'Окрашивание простое ({{time}})',
        color_complex: 'Окрашивание сложное ({{time}})',
        color_highlight: 'Мелирование ({{time}})',
        perm: 'Химическая завивка ({{time}})',
    },
    serviceSelect: 'Выберите услугу',
    title: 'Записаться',
}, true);

const template = `
<div>
    <h1>{{$t('route-book:title')}}</h1>
    <form class="form_c1" onsubmit="return false">
        <div class="fld-name form_row">
            <div class="form_label">
                <span>{{$t('route-book:name')}}:</span>
            </div>
            <div class="form_field">
                <input type="text" name="name" v-model="name" :placeholder="$t('route-book:namePH')">
            </div>       
        </div>
        <div class="fld-phone form_row">
            <div class="form_label">
                <span>{{$t('route-book:phone')}}:</span>
            </div>
            <div class="form_field">
                <input type="text" name="phone" v-model="phone" :placeholder="$t('route-book:phonePH')">
            </div>       
        </div>
        <div class="fld-email form_row">
            <div class="form_label">
                <span>{{$t('route-book:email')}}:</span>
            </div>
            <div class="form_field">
                <input type="text" name="email" v-model="email" :placeholder="$t('route-book:emailPH')">
            </div>       
        </div>
        <div class="fld-service form_row">
            <div class="form_label">
                <span>{{$t('route-book:service')}}:</span>
            </div>
            <div class="form_field">
                <select name="service" v-model="service">
                    <option disabled value="null">{{$t('route-book:serviceSelect')}}</option>
                    <option v-for="(one) in serviceOptions" :value="one.id" :disabled="one.disabled">
                        {{ $t('route-book:serviceLabel.' + one.code, {time:one.duration}) }}
                    </option>
                </select>
            </div>       
        </div>
        <div class="fld-master form_row" v-show="service && name && (phone || email)">
            <div class="form_label">
                <span>{{$t('route-book:master')}}:</span>
            </div>
            <div class="form_field">
                <select name="master" v-model="master">
                    <option disabled value="null">{{$t('route-book:masterSelect')}}</option>
                    <option v-for="(one) in masterOptions" :value="one.id" :disabled="one.disabled">
                        {{ $t('route-book:masterLabel.' + one.code) }}
                    </option>
                </select>
            </div>       
        </div>
        <div class="fld-date form_row" v-show="master">
            <date-picker ref="datePicker"
                :min="tdDateMin"
                :max="tdDateMax"
                :dates-disabled="tdDatesDisabled"
                @selected="setDate"
            ></date-picker>
        </div>
        <div class="fld-time form_row" v-show="date">
            <div class="form_label">
                <span>{{$t('route-book:time')}}:</span>
            </div>
            <div class="form_field">
                <time-picker ref="timePicker"
                    :begin="tpBegin" 
                    :end="tpEnd" 
                    :step="tpStep"
                     @selected="setTime"
                ></time-picker>
            </div>       
        </div>
        
        <div class="form_actions">
            <div>
                <button v-on:click="send" v-show="time">{{$t('route-book:action.send')}}</button>
            </div>
        </div>
    </form>
</div>
`;

export default function Fl32_Leana_Front_Route_Book(spec) {
    /** @type {Fl32_Leana_Front_Widget_DatePicker} */
    const datePicker = spec.Fl32_Leana_Front_Widget_DatePicker$;
    /** @type {Fl32_Leana_Front_Widget_TimePicker} */
    const timePicker = spec.Fl32_Leana_Front_Widget_TimePicker$;
    /** @type {Fl32_Leana_Shared_Util_DateTime} */
    const utilDate = spec.Fl32_Leana_Shared_Util_DateTime$;
    /** @type {Fl32_Leana_Shared_Util_Mix} */
    const utilMix = spec.Fl32_Leana_Shared_Util_Mix$;

    return {
        template,
        components: {
            datePicker,
            timePicker
        },
        data: function () {
            return {
                date: null,
                duration: null,
                email: null,
                master: null,
                name: null,
                phone: null,
                service: null,
                time: null,
                /** @type {Fl32_Leana_Shared_Api_Route_Book_State_Get_Response} */
                bookingState: null,
                tpBegin: '9:00',
                tpEnd: '20:00',
            };
        },
        computed: {
            masterOptions() {
                let result = [];
                if (this.bookingState && Array.isArray(this.bookingState.employees)) {
                    for (const one of this.bookingState.employees) {
                        if (Array.isArray(one.services) && one.services.includes(this.service)) {
                            result.push({id: one.id, code: one.code});
                        }
                    }
                }
                return result;
            },
            serviceOptions() {
                let result = [];
                if (this.bookingState && Array.isArray(this.bookingState.services)) {
                    result = this.bookingState.services;
                }
                return result;
            },
            tdDateMax() {
                return utilDate.forwardDate(21);
            },
            tdDateMin() {
                return new Date();
            },
            tdDatesDisabled() {
                const result = [];
                if (this.bookingState && Array.isArray(this.bookingState.employees)) {
                    const work = utilMix.getOptionPropById(this.bookingState.employees, this.master, 'workTime');
                    if (work) {
                        let date = this.tdDateMin;
                        let dateMax = this.tdDateMax;
                        while (date < dateMax) {
                            date = utilDate.forwardDate(1, date);
                            const formatted = utilDate.formatDate(date);
                            if (!work[formatted]) {
                                const disabled = utilDate.unformatDate(formatted);
                                result.push(disabled);
                            }
                        }
                    }
                }
                return result;
            },
            /**
             * Time-picker step in minutes (15, 30, 45, ...).
             * @returns {number}
             */
            tpStep() {
                let result = 30; // default value for time picker step
                if (this.service !== null) {
                    const option = utilMix.getOptionById(this.serviceOptions, this.service);
                    if (option && option.duration) {
                        result = utilDate.convertHrsMinsToMins(option.duration);
                    }
                }
                return result;
            }

        },
        methods: {
            /**
             * Handler for datePicker's event.
             *
             * @param {Date} date
             */
            setDate(date) {
                this.date = date;
            },
            /**
             * Handler for timePicker's event.
             *
             * @param {string} label
             */
            setTime(label) {
                this.time = label;
            },
            async send() {
                function getCode(options, id) {
                    let result = null;
                    const key = Number.parseInt(id);
                    const found = options.find(function (o) {
                        return Number.parseInt(o.id) === key;
                    });
                    if (found) {
                        result = found.code;
                    }
                    return result;
                }

                // get local variable with 'date' value
                const date = new Date(this.date.getTime());
                const [hours, minutes] = this.time.split(':');
                date.setHours(hours, minutes);
                const data = {
                    date: date,
                    duration: this.duration,
                    email: this.email,
                    master: getCode(this.masterOptions, this.master),
                    name: this.name,
                    phone: this.phone,
                    service: getCode(this.serviceOptions, this.service),
                };
                const res = await fetch('./api/book/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({data})
                });
                const result = await res.json();
                // result in the response is the same data if succeed
                if (result.data.name === this.name) {
                    this.name = null;
                    this.email = null;
                    this.phone = null;
                    this.service = null;
                    this.master = null;
                    this.date = null;
                    this.time = null;
                }
            }
        },
        async mounted() {
            // DEFINE INNER FUNCTIONS
            async function _loadData() {
                const res = await fetch('./api/book/state/get', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                return await res.json();
            }

            function _initEmployees(data) {
                const items = [];
                for (const one of data) {
                    // map backend data to frontend data (the data is the same in this case)
                    const {id, code} = one;
                    items.push({id, code});
                }
                me.masterOptions = items;
            }

            function _initServices(data) {
                const items = [];
                for (const one of data) {
                    // map backend data to frontend data (the data is the same in this case)
                    const {id, code, duration} = one;
                    const hm = utilDate.convertMinsToHrsMins(duration);
                    items.push({id, code, duration: hm});
                }
                me.serviceOptions = items;
            }

            // MAIN FUNCTIONALITY
            const me = this;
            const {data} = await _loadData();
            this.bookingState = data;
            _initServices(data.services);
            _initEmployees(data.employees);
        }
    };
}
