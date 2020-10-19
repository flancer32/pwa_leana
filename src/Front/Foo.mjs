const router = self.teqfw.router;
const i18next = self.teqfw.i18next;

i18next.addResources('en', 'app', {
    home: 'HOme'
});
i18next.addResources('ru', 'app', {
    home: 'homE'
});

const template = `
<div>
    <p>
        <router-link to="/">Go to Home</router-link>
        <router-link to="/about">Go to About</router-link>
    </p>
    <div>Counter: {{counter}}</div>
    <router-view></router-view>
</div>
`;

const Home = {template: '<div>Home: {{$t("app:home")}}</div>'};
const About = {template: '<div>About</div>'};


router.addRoute({path: '/', component: Home});
router.addRoute({path: '/about', component: About});

export default function Fl32_Leana_Front_Foo() {
    return {
        template,
        data() {
            return {
                counter: 0
            };
        },
        mounted() {
            setInterval(() => {
                this.counter++;
            }, 1000);
        }
    };
}
