#!/usr/bin/env node
'use strict';
/** **************************************************************************
 * Main script to create and run an application.
 * ************************************************************************ */
import $path from 'path';
import $url from 'url';
import Container from '@teqfw/di';

/* Resolve paths to main folders */
const {path: currentScript} = $url.parse(import.meta.url);
const pathScript = $path.dirname(currentScript);
const pathRoot = $path.join(pathScript, '..');
const pathSrc = $path.join(pathRoot, 'src');

/* Create and setup DI container */
/** @type {TeqFw_Di_Container} */
const container = new Container();
// add backend sources to map
container.addSourceMapping('Fl32_Leana', pathSrc, true, 'mjs');
// Manually create bootstrap configuration object (used in constructor of 'Fl32_Leana_App')
/** @type {Fl32_Leana_App.Bootstrap} */
const bootstrap = {version: '0.1.0', root: pathRoot};
container.set('bootstrap', bootstrap);

/** Request Container to construction app then run it */
container.get('Fl32_Leana_App')
    .then(
        /**  @param {Fl32_Leana_App} app */
        async (app) => {
            await app.init();
            await app.run();
        }
    )
    .catch(error => {
        console.log('Cannot create TeqFW application.');
        console.dir(error);
    });
