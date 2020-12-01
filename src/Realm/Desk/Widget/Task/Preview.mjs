const i18next = self.teqfw.i18next;
const mapMutations = self.teqfw.lib.Vuex.mapMutations;

i18next.addResources('lv', 'taskPreview', {});
i18next.addResources('ru', 'taskPreview', {
    customer: 'Клиент',
    date: 'Дата',
    email: 'Email',
    phone: 'Телефон',
    task: 'Задача',
    time: 'Время',
});

const template = `
<div class="">
    <actions></actions>
    <h1>{{$t('taskPreview:task')}} {{ params.id }}</h1>
    <form class="preview" onsubmit="return false">
        <div class="row">
            <div class="label">
                <span>{{ $t('taskPreview:customer') }}:</span>
            </div>
            <div class="field">
                <span>{{ customer.name }}</span>
            </div>
        </div>
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
        <div class="row" >
            <div class="label">
                <span>{{ $t('taskPreview:date') }}:</span>
            </div>
            <div class="field editable">
                <div class="value">{{ dateSchedule }}</div>
                <div class="action"><button v-on:click="actionEditDate">...</button></div>
            </div>
        </div>
        <div class="row" >
            <div class="label">
                <span>{{ $t('taskPreview:time') }}:</span>
            </div>
            <div class="field editable">
                <div class="value">{{ timeSchedule }}</div>
                <div class="action"><button v-on:click="actionEditTime">...</button></div>
            </div>
        </div>
    </form>
</div>
`;
/**
 * Widget to preview task details in dashboard overlay.
 */
export default function Fl32_Leana_Realm_Desk_Widget_Task_Preview(spec) {
    const actions = spec.Fl32_Leana_Realm_Desk_Widget_Task_Preview_Actions$$;    // new instance
    const Task = spec['Fl32_Leana_Realm_Desk_Widget_Api_Task#'];
    return {
        template,
        components: {
            actions
        },
        props: {
            /** @type {Fl32_Leana_Realm_Desk_Widget_Api_Task} */
            params: new Task()
        },
        computed: {
            customer() {
                /** @type {Fl32_Leana_Realm_Desk_Widget_Api_Task} */
                const result = this.params;
                if (result && result.customer) {
                    return result.customer;
                } else {
                    return {};
                }
            },
            item() {
                /** @type {Fl32_Leana_Realm_Desk_Widget_Api_Task} */
                const result = this.params;
                if (result) {
                    return result;
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
                        day: 'numeric'
                    });
                }
                return result;
            },
            timeSchedule() {
                let result = '';
                if (
                    this.item.dateBook &&
                    (typeof this.item.dateBook.toLocaleDateString === 'function')
                ) {
                    const locale = i18next.language;
                    result = this.item.dateBook.toLocaleTimeString(locale, {
                        hour: '2-digit',
                        minute: '2-digit',
                    });
                }
                return result;
            }
        },
        methods: {
            actionClose() {
                this.resetOverlay();
            },
            actionEditDate() {
                console.log(`Edit date for task #'${this.item.id}'.`);
            },
            actionEditTime() {
                console.log(`Edit time for task #'${this.item.id}'.`);
            },
            ...mapMutations({
                resetOverlay: 'app/resetOverlay',
            }),
        }
    };
}
