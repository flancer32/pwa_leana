const i18next = self.teqfw.i18next;
// see index.html
const vuejsDatepicker = self.vuejsDatepicker;

i18next.addResourceBundle('lv', 'route-book', {
    action: {
        send: 'Nosūtīt'
    },
    category: 'Kategorija',
    categoryLabel: {
        1: 'Frizūra',
        2: 'Krāsošana',
    },
    categorySelect: 'Izvēlieties kategoriju',
    date: 'Datums',
    datePH: 'Izvēlieties datumu',
    email: 'Jūsu e-pasts',
    emailPH: 'e-pasts: user@domain.com',
    master: 'Meistars',
    masterLabel: {
        1: 'Agata',
        2: 'Barbara',
        3: 'Ciļa',
    },
    masterSelect: 'Izvēlieties meistaru',
    name: 'Jūsu vārds',
    namePH: 'vārds: John Doe',
    phone: 'Jūsu telefons',
    phonePH: 'telefons: 29101010',
    service: 'Pakalpojums',
    serviceLabel: {
        1: 'Vīriešu matu griezums (30 min.)',
        2: 'Vīriešu matu griezums + bārda (1 st.)',
        3: 'Frizūra sievietēm, īsi mati (30 min.)',
        4: 'Frizūra sievietēm, gari mati (1 st.)',
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
    category: 'Категория',
    categoryLabel: {
        1: 'Стрижка',
        2: 'Окраска',
    },
    categorySelect: 'Выберите категорию',
    date: 'Дата',
    datePH: 'Выберите дату',
    email: 'Ваш email',
    emailPH: 'email: user@domain.com',
    master: 'Мастер',
    masterLabel: {
        1: 'Алина',
        2: 'Беата',
        3: 'Варвара',
    },
    masterSelect: 'Выберите мастера',
    name: 'Ваше имя',
    namePH: 'имя: Василий Пупкин',
    phone: 'Ваш телефон',
    phonePH: 'телефон: 29101010',
    service: 'Услуга',
    serviceLabel: {
        1: 'Стрижка мужская (30 мин.)',
        2: 'Стрижка мужская + борода (1ч.)',
        3: 'Стрижка женская, короткие волосы (30 мин.)',
        4: 'Стрижка женская, длинные волосы (1ч.)'
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
                <span>{{$t('route-book:category')}}:</span>
            </div>
            <div class="form_field">
                <select name="category" v-model="category">
                    <option disabled value="">{{$t('route-book:categorySelect')}}</option>
                    <option v-for="one in categoryOptions" :value="one.id" :disabled="one.disabled">
                        {{ $t('route-book:categoryLabel.' + one.id) }}
                    </option>
                </select>
            </div>       
        </div>
        <div class="form_row" v-show="category">
            <div class="form_label">
                <span>{{$t('route-book:service')}}:</span>
            </div>
            <div class="form_field">
                <select name="service" v-model="service">
                    <option disabled value="">{{$t('route-book:serviceSelect')}}</option>
                    <option v-for="one in serviceOptions" :value="one.id" :disabled="one.disabled">
                        {{ $t('route-book:serviceLabel.' + one.id) }}
                    </option>
                </select>
            </div>       
        </div>
        <div class="form_row" v-show="service">
            <div class="form_label">
                <span>{{$t('route-book:master')}}:</span>
            </div>
            <div class="form_field">
                <select name="master" v-model="master">
                    <option disabled value="">{{$t('route-book:masterSelect')}}</option>
                    <option v-for="one in masterOptions" :value="one.id" :disabled="one.disabled">
                        {{ $t('route-book:masterLabel.' + one.id) }}
                    </option>
                </select>
            </div>       
        </div>
        <div class="form_row" v-show="master">
            <div class="form_label">
                <span>{{$t('route-book:date')}}:</span>
            </div>
            <div class="form_field">
                <input id="pick" type="text">
            </div>
        </div>
        <div class="form_row" v-show="date">
            <div class="form_label">
                <span>{{$t('route-book:time')}}:</span>
            </div>
            <div class="form_field">
                <time-picker 
                    begin="10:00" 
                    end="18:00" 
                    step="45"
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
    const timePicker = spec.Fl32_Leana_Front_Widget_TimePicker$;
    return {
        template,
        components: {
            timePicker,
            vuejsDatepicker
        },
        data: function () {
            return {
                name: '',
                date: null,
                time: null,
                phone: null,
                email: null,
                category: '',
                categoryOptions: [
                    {id: 1},
                    {id: 2},
                ],
                service: '',
                serviceOptions: [
                    {id: 1},
                    {id: 2},
                    {id: 3},
                    {id: 4}
                ],
                master: '',
                masterOptions: [
                    {id: 1},
                    {id: 2, disabled: true},
                    {id: 3}
                ],
            };
        },
        methods: {
            setTime(label) {
                this.time = label;
            },
            send() {
                console.log('send data to server');
            }
        },
        mounted() {
            const week3Forward = ((d) => {
                d.setDate(d.getDate() + 21);
                return d;
            })(new Date);
            self.datepicker('#pick', {
                disableYearOverlay: true,
                maxDate: week3Forward,
                minDate: new Date(),
                showAllDates: true,
                disabledDates: [new Date(2020, 9, 20), new Date(2020, 9, 22), new Date(2020, 9, 28),],
                onSelect: inst => {
                    this.date = inst.dateSelected;
                }
            });
        }
    };
}
