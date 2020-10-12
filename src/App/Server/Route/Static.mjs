/**
 * Handler to process GET requests to static resources in modules.
 */
// NODE.JS IMPORTS
import $fs from 'fs';
import $path from 'path';
import $mimeTypes from 'mime-types';

// MODULE'S EXPORT
export default class Fl32_Leana_App_Server_Route_Static {
    /** @type {Fl32_Leana_App_Config} */
    _config
    /** @type {Fl32_Leana_App_Logger} */
    _logger


    constructor(spec) {
        this._config = spec.Fl32_Leana_App_Config$;
        this._logger = spec.Fl32_Leana_App_Logger$;

        const pathRoot = this._config.get('/path/root');
        const pathWeb = $path.join(pathRoot, 'src/web');

        this.handle = function (req, res, next) {
            /**
             * Compose path to resource:
             *  - @teqfw/di - DI container
             *  - web/mod/leana - modules's static resources
             *  - src/mod/leana - module's JS resources
             *
             * @param {string} url
             * @returns {string}
             */
            function getPath(url) {
                let result;
                if (url.startsWith('/src/@teqfw/di/')) {
                    const tail = url.replace('/src/@teqfw/di/', '/node_modules/@teqfw/di/src/');
                    result = $path.join(pathRoot, tail);
                } else if (url.startsWith('/web/mod/leana/')) {
                    const tail = url.replace('/web/mod/leana/', '/src/web/');
                    result = $path.join(pathRoot, tail);
                } else if (url.startsWith('/src/mod/leana/')) {
                    const tail = url.replace('/src/mod/leana/', '/src/');
                    result = $path.join(pathRoot, tail);
                } else {
                    result = $path.join(pathWeb, url);
                }
                return result;
            }

            const path = getPath(req.url);
            if ($fs.existsSync(path)) {
                const mimeType = $mimeTypes.lookup(path);
                if (mimeType) {
                    res.setHeader('Content-Type', mimeType);
                    res.sendFile(path);
                } else {
                    next();
                }
            } else {
                next();
            }
        };
    }
}
