const i18next = self.teqfw.i18next;
i18next.addResources('lv', 'route-about', {});
i18next.addResources('ru', 'route-about', {});

const template = `
<div>
    <div>Employees</div>
</div>
`;

export default function Fl32_Leana_Dashboard_Route_Employees() {

    return {
        template,
        data: function () {
            return {};
        },
    };
}
