const mapMutations = self.teqfw.lib.Vuex.mapMutations;

const i18next = self.teqfw.i18next;
i18next.addResources('lv', 'taskPreview', {});
i18next.addResources('ru', 'taskPreview', {
    actionClose: 'Закрыть',
    actionEdit: 'Изменить',
    customer: 'Клиент',
    email: 'Email',
    phone: 'Телефон',
    task: 'Задача',
});

const template = `
<div class="">
    <div class="actions">
        [{{$t('taskPreview:actionEdit')}}]
        <span v-on:click="actionClose">[{{$t('taskPreview:actionClose')}}]</span>
    </div>
    <h1>{{$t('taskPreview:task')}} {{ params.id }}</h1>
    <form class="preview" onsubmit="return false">
        <div class="row">
            <div class="label">
                <span>{{ $t('taskPreview:customer') }}:</span>
            </div>
            <div class="field">
                <span>{{ customer.name }}:</span>
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
    </form>
</div>
`;
/**
 * Widget to preview task details in dashboard overlay.
 */
export default function Fl32_Leana_Dashboard_Widget_Task_Preview(spec) {
    const Fl32_Leana_Dashboard_Widget_Api_Task = spec['Fl32_Leana_Dashboard_Widget_Api_Task#'];
    return {
        template,
        props: {
            /** @type {Fl32_Leana_Dashboard_Widget_Api_Task} */
            params: new Fl32_Leana_Dashboard_Widget_Api_Task()
        },
        computed: {
            customer() {
                /** @type {Fl32_Leana_Dashboard_Widget_Api_Task} */
                const result = this.params;
                if (result && result.customer) {
                    return result.customer;
                } else {
                    return {};
                }
            },
            item() {
                /** @type {Fl32_Leana_Dashboard_Widget_Api_Task} */
                const result = this.params;
                if (result) {
                    return result;
                } else {
                    return {};
                }
            }
        },
        methods: {
            actionClose() {
                this.setOverlay({name: null, params: {}});
            },
            ...mapMutations('app', [
                'setOverlay'
            ]),
        }
    };
}
