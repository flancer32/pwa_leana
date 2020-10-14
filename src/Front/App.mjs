const i18next = self.i18n.i18next;
i18next.addResources('en', 'app', {
    msg: 'You clicked me {{ count }} times.',
    lang: 'Change language.',
});
i18next.addResources('ru', 'app', {
    msg: 'Ты кликнул по мне {{ count }} раз.',
    lang: 'Сменить язык.',
});

const template = `
<div>
    <div id='app'>
        <div id='layer_base'>
            <main>
                <router-view></router-view>
            </main>
        </div>
        <div id="layer_nav_bar">
            <app-nav-bar></app-nav-bar>
        </div>
        <div id="layer_overlay">
<!--            <app_display_image></app_display_image>-->
        </div>
        <div id="layer_notification">
<!--            <app_notification></app_notification>-->
        </div>
    </div>
</div>
`;

export default function Fl32_Leana_Front_App(spec) {
    const foo = spec.Fl32_Leana_Front_Foo$;
    const appNavBar = spec.Fl32_Leana_Front_App_NavBar$;

    const routes = [
        {path: '/', component: foo}
    ];

    const router = new self.VueRouter({
        // mode: 'history',
        routes
    });

    return {
        template,
        data: function () {
            return {
                count: 0
            };
        },
        methods: {
            changeLang() {
                const current = this._i18n.i18next.language;
                const next = (current === 'en') ? 'ru' : 'en';
                this._i18n.i18next.changeLanguage(next);
            }
        },
        i18n: self.i18n,
        router,
        components: {
            'foo': foo,
            'AppNavBar': appNavBar
        }
    };
}
