const app = self.teqfw.app;

const template = `
<div id="layer_overlay" v-on:click="hideOverlay">
    <component :is="currentComponent"></component>
</div>
`;

export default function Fl32_Leana_Dashboard_Layout_StatusBar() {
    app.component('tab-home', {
        template: '<div>Home component</div>'
    });
    app.component('tab-posts', {
        template: '<div>Posts component</div>'
    });
    app.component('tab-archive', {
        template: '<div>Archive component</div>'
    });

    return {
        template,
        props: {
            name: String,    // name of the component to display in popup
        },
        data: function () {
            return {};
        },
        computed: {
            currentComponent() {
                return this.name;
            }
        },
        methods: {
            hideOverlay() {
                const elOverlay = self.document.querySelector('#layer_overlay');
                elOverlay.style.visibility = 'hidden';
                elOverlay.style.opacity = '0';
            },
            show() {
                const elOverlay = self.document.querySelector('#layer_overlay');
                elOverlay.style.visibility = 'visible';
                elOverlay.style.opacity = '1';
            }
        },
    };
}
