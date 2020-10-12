/**
 * Application's web server.
 */
// NODE.JS IMPORTS
import $cookieParser from 'cookie-parser';
import $express from 'express';
import $path from 'path';
import $serveStatic from 'serve-static';

// MODULE'S EXPORT
export default class Fl32_Leana_App_Server {
    /** @type {TeqFw_Di_Container} */
    _container
    /** @type {Fl32_Leana_App_Config} */
    _config
    /** @type {Fl32_Leana_App_Logger} */
    _logger
    /** @type {Fl32_Leana_App_Server_Log} */
    _serverLog
    /** @type {Fl32_Leana_App_Server_Route_Static} */
    _routeStatic

    _server = $express();


    constructor(spec) {
        this._container = spec.TeqFw_Di_Container$;
        this._config = spec.Fl32_Leana_App_Config$;
        this._logger = spec.Fl32_Leana_App_Logger$;
        this._serverLog = spec.Fl32_Leana_App_Server_Log$;
        this._routeStatic = spec.Fl32_Leana_App_Server_Route_Static$;
    }

    async addApiRoute(route, dependencyId) {
        const handler = await this._container.get(dependencyId);
        this._server.all(route, handler.handle);
    }

    async init() {
        const me = this;
        // setup order is important
        this._server.use($cookieParser());
        this._server.use($express.json({limit: '50mb'}));
        this._server.use(me._serverLog.handle);
        // API routes
        await this.addApiRoute('/api/app/config/get', 'Fl32_Leana_Fw_Route_Config_Get$');
        // static resources in project
        const pathRoot = this._config.get('path/root');
        const pathPub = $path.join(pathRoot, 'web');
        this._server.use($serveStatic(pathPub));
        // static resources in modules
        this._server.get('*', this._routeStatic.handle);
        // default route
        this._server.all('*', function (req, res) {
            me._logger.debug(`${req.method} ${req.url}`);
            // COMPOSE RESULT
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({response: 'default route'}));
        });
    }

    /**
     * Run web server.
     *
     * @param {number} port
     * @param {Function} callable
     */
    async listen(port, callable) {
        await this._server.listen(port, callable);
    }

}
