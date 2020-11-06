const i18next = self.teqfw.i18next;
i18next.addResources('lv', 'route-about', {});
i18next.addResources('ru', 'route-about', {});

const template = `
<div>
    <booking></booking>
</div>
`;

export default function Fl32_Leana_Dashboard_Route_Calendar(spec) {
    /** @type {Fl32_Leana_Dashboard_Widget_Booking} */
    const booking = spec.Fl32_Leana_Dashboard_Widget_Booking$;
    return {
        template,
        components: {
            booking
        },
        data: function () {
            return {};
        },
    };
}
