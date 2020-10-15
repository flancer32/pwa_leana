/**
 * Handler to process GET requests to static resources in modules.
 */
// NODE.JS IMPORTS
import $fs from 'fs';
import $mimeTypes from 'mime-types';
import $path from 'path';
import marked from 'marked';
import sanitizeHtml from 'sanitize-html';

marked.setOptions({
    renderer: new marked.Renderer(),
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

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

        this.handle = async function (req, res, next) {
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
                } else if (url.startsWith('/static/mod/leana/')) {
                    const tail = url.replace('/static/mod/leana/', '/src/web/');
                    result = $path.join(pathRoot, tail);
                } else if (url.startsWith('/src/mod/leana/')) {
                    const tail = url.replace('/src/mod/leana/', '/src/');
                    result = $path.join(pathRoot, tail);
                } else if (url.startsWith('/static/vuejs-datepicker/')) {
                    const tail = url.replace('/static/vuejs-datepicker/', '/node_modules/vuejs-datepicker/dist/');
                    result = $path.join(pathRoot, tail);
                } else {
                    result = $path.join(pathWeb, url);
                }
                return result;
            }

            /**
             * Read and return regular file (HTML, CSS, JS, imgase, ...).
             *
             * @param {string} path
             * @returns {Promise<void>}
             */
            async function processRegular(path) {
                const mimeType = $mimeTypes.lookup(path);
                if (mimeType) {
                    res.setHeader('Content-Type', mimeType);
                    res.sendFile(path);
                } else {
                    next();
                }
            }


            /**
             * Read, convert to HTML, sanitize and return CMS block (markdown file).
             *
             * @param {string} path
             * @returns {Promise<void>}
             */
            async function processBlock(path) {
                const md = $fs.readFileSync(path, 'utf-8');
                const dirtyHtml = await marked(md);
                // allow default tags & attrs
                // https://github.com/apostrophecms/sanitize-html#what-if-i-want-to-allow-all-tags-or-all-attributes
                const cleanHtml = sanitizeHtml(dirtyHtml);
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end(cleanHtml);
            }

            const path = getPath(req.url);
            if ($fs.existsSync(path)) {
                if (req.url.startsWith('/static/mod/leana/block/md/')) {
                    await processBlock(path);
                } else {
                    await processRegular(path);
                }
            } else {
                next();
            }
        };
    }
}
