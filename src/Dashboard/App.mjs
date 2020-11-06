const router = self.teqfw.router;
const i18next = self.teqfw.i18next;
i18next.addResources('lv', 'app', {});
i18next.addResources('ru', 'app', {});

const template = `
<div>
    <div id='app'>
        <div id='layer_base'>
            <main>
                <router-view></router-view>
            </main>
        </div>
        <div id="layer_status_bar">
            <app-status-bar></app-status-bar>
        </div>
        <div id="layer_side_bar">
<!--            <app-side-bar></app-side-bar>-->
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

export default function Fl32_Leana_Dashboard_App(spec) {
    /** @type {Fl32_Leana_Dashboard_Layout_StatusBar} */
    const appStatusBar = spec.Fl32_Leana_Dashboard_Layout_StatusBar$;
    const routeCalendar = spec.Fl32_Leana_Dashboard_Route_Calendar$;
    const routeClients = spec.Fl32_Leana_Dashboard_Route_Clients$;
    const routeEmployees = spec.Fl32_Leana_Dashboard_Route_Employees$;
    const routeServices = spec.Fl32_Leana_Dashboard_Route_Services$;

    // router.addRoute({path: '/', component: routeAbout});
    router.addRoute({path: '/calendar', component: routeCalendar});
    router.addRoute({path: '/clients', component: routeClients});
    router.addRoute({path: '/employees', component: routeEmployees});
    router.addRoute({path: '/services', component: routeServices});

    // mount router here to enable routing on the first load of the page
    self.teqfw.app.use(router);

    return {
        template,
        components: {
            appStatusBar
        }
    };
}
