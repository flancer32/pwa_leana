const i18next = self.teqfw.i18next;
// see index.html
const vuejsDatepicker = self.vuejsDatepicker;

i18next.addResourceBundle('lv', 'route-book', {
    action: {
        send: 'Nosūtīt'
    },
    date: 'Datums',
    datePH: 'Izvēlieties datumu',
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
    time: 'Laiks',
    timePH: 'Izvēlieties laiku',
    title: 'Pierakstīties',
}, true);
i18next.addResourceBundle('ru', 'route-book', {
    action: {
        send: 'Отправить'
    },
    date: 'Дата',
    datePH: 'Выберите дату',
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
    time: 'Время',
    timePH: 'Выберите время',
    title: 'Записаться',
}, true);

const template = `
<div>
    <h1>{{$t('route-book:title')}}</h1>
    <form class="form_c1" onsubmit="return false">
        <div class="form_row">
            <div class="form_label">
                <span>{{$t('route-book:name')}}:</span>
            </div>
            <div class="form_field">
                <input type="text" name="name" v-model="name" :placeholder="$t('route-book:namePH')">
            </div>       
        </div>
        <div class="form_row">
            <div class="form_label">
                <span>{{$t('route-book:phone')}}:</span>
            </div>
            <div class="form_field">
                <input type="text" name="phone" v-model="phone" :placeholder="$t('route-book:phonePH')">
            </div>       
        </div>
        <div class="form_row">
            <div class="form_label">
                <span>{{$t('route-book:email')}}:</span>
            </div>
            <div class="form_field">
                <input type="text" name="email" v-model="email" :placeholder="$t('route-book:emailPH')">
            </div>       
        </div>
        <div class="form_row">
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
        <div class="form_row" v-show="service && name && (phone || email)">
            <div class="form_label">
                <span>{{$t('route-book:master')}}:</span>
            </div>
            <div class="form_field">
                <select name="master" v-model="master">
                    <option disabled value="null">{{$t('route-book:masterSelect')}}</option>
                    <option v-for="(one) in masterOptions" :value="one.id" :disabled="one.disabled">
                        {{ $t('route-book:masterLabel.' + one.code, one.duration) }}
                    </option>
                </select>
            </div>       
        </div>
        <div class="form_row" v-show="master">
            <div class="form_label">
                <span>{{$t('route-book:date')}}:</span>
            </div>
            <div class="form_field">
                <input id="bookDate" type="text" autocomplete="off" :placeholder="$t('route-book:datePH')">
            </div>
        </div>
        <div class="form_row" v-show="date">
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
    /** @type {Fl32_Leana_Front_Widget_TimePicker} */
    const timePicker = spec.Fl32_Leana_Front_Widget_TimePicker$;
    /** @type {Fl32_Leana_Shared_Util_DateTime} */
    const util = spec.Fl32_Leana_Shared_Util_DateTime$;

    return {
        template,
        components: {
            timePicker,
            vuejsDatepicker
        },
        data: function () {
            return {
                tpBegin: '9:00',
                tpEnd: '20:00',
                tpStep: '30',
                /** @type {Date} */
                date: null,
                duration: null,
                email: null,
                master: null,
                masterOptions: [],
                name: null,
                phone: null,
                service: null,
                serviceOptions: [],
                time: null,
            };
        },
        methods: {
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
                    // TMP: disable form cleaning
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
            async function loadData() {
                const res = await fetch('./api/book/state/get', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                return await res.json();
            }

            function initEmployees(data) {
                const items = [];
                for (const one of data) {
                    // map backend data to frontend data (the data is the same in this case)
                    const {id, code} = one;
                    items.push({id, code});
                }
                me.masterOptions = items;
            }

            function initServices(data) {
                const items = [];
                for (const one of data) {
                    // map backend data to frontend data (the data is the same in this case)
                    const {id, code, duration} = one;
                    const hm = util.convertMinsToHrsMins(duration);
                    items.push({id, code, duration: hm});
                }
                me.serviceOptions = items;
            }

            function initDatepicker() {
                const week3Forward = ((d) => {
                    d.setDate(d.getDate() + 21);
                    return d;
                })(new Date);

                self.datepicker('#bookDate', {
                    disabledDates: [],
                    disableYearOverlay: true,
                    maxDate: week3Forward,
                    minDate: new Date(),
                    showAllDates: true,
                    startDay: 1,
                    onSelect: inst => {
                        function getSelected(options, id) {
                            const key = Number.parseInt(id);
                            return options.find(function (o) {
                                return Number.parseInt(o.id) === key;
                            });
                        }

                        me.date = inst.dateSelected;
                        const selected = getSelected(me.serviceOptions, me.service);
                        me.duration = selected.duration;
                        me.tpStep = util.convertHrsMinsToMins(me.duration);
                    }
                });
            }

            const me = this;
            const {data} = await loadData();
            initEmployees(data.employees);
            initServices(data.services);
            initDatepicker();
        }
    };
}
