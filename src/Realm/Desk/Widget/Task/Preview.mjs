const i18next = self.teqfw.i18next;
const mapMutations = self.teqfw.lib.Vuex.mapMutations;

i18next.addResources('lv', 'taskPreview', {});
i18next.addResources('ru', 'taskPreview', {
    customer: 'Клиент',
    date: 'Дата',
    email: 'Email',
    employee: 'Мастер',
    notes: 'Заметки',
    phone: 'Телефон',
    service: 'Задача',
    task: 'Задача',
});

const template = `
<div class="">
    <actions></actions>
<!--    <h1>{{ $t('taskPreview:task') }} {{ params.id }}</h1>-->
    <h1>{{ params.customer.name }}</h1>
    <form class="preview" onsubmit="return false">
<!--        <div class="row">-->
<!--            <div class="label">-->
<!--                <span>{{ $t('taskPreview:customer') }}:</span>-->
<!--            </div>-->
<!--            <div class="field">-->
<!--                <span>{{ customer.name }}</span>-->
<!--            </div>-->
<!--        </div>-->
        <div class="row" v-show="customer.email">
            <div class="label">
                <span>{{ $t('taskPreview:email') }}:</span>
            </div>
            <div class="field">
                <a href="mailto:{{ customer.email }}">{{ customer.email }}</a>
            </div>
        </div>
        <div class="row" v-show="customer.phone">
            <div class="label">
                <span>{{ $t('taskPreview:phone') }}:</span>
            </div>
            <div class="field">
                <a href="tel:{{ customer.phone }}">{{ customer.phone }}</a>
            </div>
        </div>
        <div class="row">
            <div class="label">
                <span>{{ $t('taskPreview:date') }}:</span>
            </div>
            <div class="field editable">
                <div class="value">{{ dateSchedule }}</div>
                <div class="action">
                    <button v-on:click="actionEditDate">...</button>
                </div>
            </div>
        </div>
        <div class="row" v-show="employee.code">
            <div class="label">
                <span>{{ $t('taskPreview:employee') }}:</span>
            </div>
            <div class="field">
                <span>{{ employee.code }}</span>
            </div>
        </div>
        <div class="row" v-show="service.code">
            <div class="label">
                <span>{{ $t('taskPreview:service') }}:</span>
            </div>
            <div class="field">
                <span>{{ service.code }}</span>
            </div>
        </div>
        <div class="row">
            <div class="label">
                <span>{{ $t('taskPreview:notes') }}:</span>
            </div>
            <div class="field">
                <span>
                    Проверка на сворачиваемость текста. Проверка на сворачиваемость текста. 
                    Проверка на сворачиваемость текста. Проверка на сворачиваемость текста. 
                    Проверка на сворачиваемость текста. Проверка на сворачиваемость текста. 
                    Проверка на сворачиваемость текста. Проверка на сворачиваемость текста. 
                    Проверка на сворачиваемость текста. Проверка на сворачиваемость текста. 
                </span>
            </div>
        </div>
        <div class="controls dtp_widget">
            <date-time-picker
                :yearMin="2020"
                :yearMax="2021"
                :hourMin="9"
                :hourMax="20"
                :minsStep="15"
                :initDate="item.dateBook"
            ></date-time-picker>
        </div>
    </form>
</div>
`;
/**
 * Widget to preview task details in dashboard overlay.
 */
export default function Fl32_Leana_Realm_Desk_Widget_Task_Preview(spec) {
    const actions = spec.Fl32_Leana_Realm_Desk_Widget_Task_Preview_Actions$$;    // new instance
    const wgDateTimePicker = spec.Fl32_Leana_Realm_Shared_Widget_DateTimePicker$; // singleton
    const Task = spec['Fl32_Leana_Realm_Desk_Widget_Api_Task#'];    // class
    return {
        template,
        components: {
            actions,
            dateTimePicker: wgDateTimePicker,
        },
        props: {
            /** @type {Fl32_Leana_Realm_Desk_Widget_Api_Task} */
            params: new Task()
        },
        computed: {
            /**
             * @return {{}|Fl32_Leana_Realm_Desk_Widget_Api_Customer}
             */
            customer() {
                /** @type {Fl32_Leana_Realm_Desk_Widget_Api_Task} */
                const result = this.params;
                if (result && result.customer) {
                    return result.customer;
                } else {
                    return {};
                }
            },
            /**
             * @return {{}|Fl32_Leana_Realm_Desk_Widget_Api_Employee}
             */
            employee() {
                /** @type {Fl32_Leana_Realm_Desk_Widget_Api_Task} */
                const result = this.params;
                if (result && result.employee) {
                    return result.employee;
                } else {
                    return {};
                }
            },
            /**
             * @return {{}|Fl32_Leana_Realm_Desk_Widget_Api_Task}
             */
            item() {
                /** @type {Fl32_Leana_Realm_Desk_Widget_Api_Task} */
                const result = this.params;
                if (result) {
                    return result;
                } else {
                    return {};
                }
            },
            /**
             * @return {Fl32_Leana_Realm_Desk_Widget_Api_Service|{}}
             */
            service() {
                /** @type {Fl32_Leana_Realm_Desk_Widget_Api_Task} */
                const result = this.params;
                if (result && result.service) {
                    return result.service;
                } else {
                    return {};
                }
            },
            dateSchedule() {
                let result = '';
                if (
                    this.item.dateBook &&
                    (typeof this.item.dateBook.toLocaleDateString === 'function')
                ) {
                    const locale = i18next.language;
                    result = this.item.dateBook.toLocaleDateString(locale, {
                        weekday: 'short',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    });
                }
                return result;
            },
        },
        methods: {
            actionClose() {
                this.resetOverlay();
            },
            actionEditDate() {
                console.log(`Edit date for task #'${this.item.id}'.`);
                const elControl = this.$el.querySelector('.controls.dtp_widget');
                elControl.style.visibility = 'visible';
            },
            ...mapMutations({
                resetOverlay: 'app/resetOverlay',
            }),
        }
    };
}
