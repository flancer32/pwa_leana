const i18next = self.i18n.i18next;
i18next.addResources('en', 'app', {});
i18next.addResources('ru', 'app', {});

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
    const appNavBar = spec.Fl32_Leana_Front_App_NavBar$;
    const routeAbout = spec.Fl32_Leana_Front_Route_About$;
    const routeBook = spec.Fl32_Leana_Front_Route_Book$;

    const routes = [
        {path: '/', component: routeAbout},
        {path: '/about', component: routeAbout},
        {path: '/book', component: routeBook},
    ];

    const router = new self.VueRouter({
        routes
    });

    return {
        template,
        data: function () {
            return {};
        },
        methods: {},
        i18n: self.i18n,
        router,
        components: {
            'AppNavBar': appNavBar
        }
    };
}
