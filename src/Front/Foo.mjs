const i18next = self.i18n.i18next;
i18next.addResources('en', 'foo', {
    msg: 'You clicked me {{ count }} times.',
    lang: 'Change language.',
});
i18next.addResources('ru', 'foo', {
    msg: 'Ты кликнул по мне {{ count }} раз.',
    lang: 'Сменить язык.',
});

const template = `
<div>
    <span>Foo</span>
<!--    <button v-on:click="count++">{{ $t("foo:msg", {count}) }}</button>-->
<!--    <button v-on:click="changeLang">{{ $t("foo:lang") }}</button>-->
</div>
`;

export default function Fl32_Leana_Front_Foo() {
    return {
        template,
        data: function () {
            return {
                count: 0
            };
        },
        methods: {
            // changeLang() {
            //     const current = this._i18n.i18next.language;
            //     const next = (current === 'en') ? 'ru' : 'en';
            //     this._i18n.i18next.changeLanguage(next);
            // }
        },
        // i18n: self.i18n
    };
}
