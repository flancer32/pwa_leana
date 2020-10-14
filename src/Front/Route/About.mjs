const i18next = self.i18n.i18next;
i18next.addResources('en', 'route-about', {});
i18next.addResources('ru', 'route-about', {});

const template = `
<div>
    <div v-html="content"></div>
</div>
`;

export default function Fl32_Leana_Front_Route_About() {

    return {
        template,
        data: function () {
            return {
                content: ''
            };
        },
        created() {
            const me = this;

            async function loadContent(lang) {
                const code = lang.substring(0, 2);
                const res = await fetch(`/static/mod/leana/block/md/about.${code}.md`);
                return await res.text();
            }

            // subscribe to 'change language' event
            i18next.on('languageChanged', async function (lang) {
                me.content = await loadContent(lang);
            });

            const lang = i18next.language;
            loadContent(lang).then(res => me.content = res);
        }
    };
}
