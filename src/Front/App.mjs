const template = `
<button v-on:click="count++">You clicked me {{ count }} times.</button>
`;

export default function Fl32_Leana_Front_App(spec) {
    const foo = spec.Fl32_Leana_Front_Foo$;
    return {
        template,
        data: function () {
            return {
                count: 0
            };
        }
    };
}
