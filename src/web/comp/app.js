const template = `
<button v-on:click="count++">You clicked me {{ count }} times.</button>
`;

export default function (spec) {
    return {
        template,
        data: function () {
            return {
                count: 0
            };
        }
    };
}
