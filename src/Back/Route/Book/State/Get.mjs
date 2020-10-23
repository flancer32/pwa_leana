/**
 * Get booking state (categories, services, masters, ...).
 */
export default class Fl32_Leana_Back_Route_Book_State_Get {

    constructor() {
        /** =============================================================================================
         * `handle` method is used by Server as standalone function (w/o binding to the object),
         * so we should place all dependencies into the instance (in the constructor's scope).
         ============================================================================================= */
        // INJECT DEPENDENCIES INTO THIS INSTANCE (PROPS AND VARS IN THE CLOSURE OF THE CONSTRUCTOR)

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)
        /**
         * API route handler to get booking state.
         *
         * @param req
         * @param res
         * @returns {Promise<void>}
         * @see Fl32_Leana_App_Server.addApiRoute
         */
        this.handle = async function (req, res) {
            // PARSE INPUT & DEFINE WORKING VARS
            const data = {};

            // MAIN FUNCTIONALITY
            try {
                const state = {
                    category: [
                        {id: 1, code: 'beard'},
                        {id: 2, code: 'coloring'},
                        {id: 3, code: 'haircut'},
                        {id: 4, code: 'men'},
                        {id: 5, code: 'style'},
                        {id: 6, code: 'women'},
                    ],
                    service: [
                        {id: 1, code: 'man_haircut', category: [3, 4], duration: 30},
                        {id: 2, code: 'man_haircut_and_beard', category: [1, 3, 4], duration: 60},
                        {id: 3, code: 'women_haircut_long', category: [3, 6], duration: 60},
                        {id: 4, code: 'women_haircut_medium', category: [3, 6], duration: 45},
                        {id: 5, code: 'women_haircut_short', category: [3, 6], duration: 30},
                        {id: 6, code: 'paint_wo_cut', category: [2], duration: 120},
                        {id: 7, code: 'cut_color_full', category: [2, 3], duration: 120},
                        {id: 8, code: 'hairstyle_daily', category: [5], duration: 30},
                        {id: 9, code: 'hairstyle_festive', category: [5], duration: 60},
                        {id: 10, code: 'hairstyle_wedding', category: [5], duration: 120},
                        {id: 11, code: 'paint_remove', category: [2], duration: 240},
                        {id: 12, code: 'perm_cut_finish', category: [2, 3], duration: 120},
                        {id: 13, code: 'hair_care', category: [5], duration: 60},
                        {id: 14, code: 'hair_straightening', category: [5], duration: 150},
                        {id: 15, code: 'olaplex', category: [5], duration: 60},
                        {id: 16, code: 'cut_color_full_and_olaplex', category: [2, 3, 5], duration: 150},
                        {id: 17, code: 'hair_straightening_olaplex', category: [5], duration: 150},
                        {id: 18, code: 'hair_tattoo', category: [5], duration: 30},
                        {id: 19, code: 'ritual', category: [1, 3, 4, 5], duration: 90},
                        {id: 20, code: 'men_hairdryer', category: [4, 5], duration: 15},
                        {id: 21, code: 'men_hair_bread_tinting', category: [1, 2, 4], duration: 30},
                        {id: 22, code: 'beard_mustache_modeling', category: [1, 3, 4], duration: 30},
                        {id: 23, code: 'men_haircut_and_style', category: [3, 4, 5], duration: 45},
                        {id: 24, code: 'hair_style_and_tone', category: [2, 5], duration: 180},
                    ],
                    master: [
                        {id: 1, code: 'elena', services: [1, 2, 3, 4, 9, 10, 11, 12, 17, 18, 19, 20]},
                        {id: 2, code: 'natalija', services: [3, 4, 5, 6, 11, 12, 13, 14, 19, 20, 21, 22]},
                    ],
                };
                Object.assign(data, state);
                // COMPOSE SUCCESS RESPONSE
                res.setHeader('Content-Type', 'application/json; charset=UTF-8');
                res.end(JSON.stringify({data}));
            } catch (error) {
                // COMPOSE FAILURE RESPONSE
                console.error(error);
                res.setHeader('Content-Type', 'application/json');
                res.code = 500;
                res.end(JSON.stringify({error}));
            }
        };
    }
}
