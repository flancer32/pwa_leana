import assert from 'assert';
import {describe, it} from 'mocha';
import devEnv from '../../TestEnv.mjs';


describe('Fl32_Leana_Shared_Util_DateTime:', () => {

    it('object is available in Test environment', async () => {
        /** @type {TeqFw_Di_Container} */
        const container = await devEnv();
        /** @type {Fl32_Leana_Shared_Util_DateTime} */
        const obj = await container.get('Fl32_Leana_Shared_Util_DateTime$');
        assert.strictEqual(obj.constructor.name, 'Fl32_Leana_Shared_Util_DateTime');

        describe('functionality:', () => {

            describe('convertHrsMinsToMins:', () => {

                it('convert HH:MM to MM', async () => {
                    const res = obj.convertHrsMinsToMins('10:21');
                    assert.deepStrictEqual(res, 621);
                });

                it('convert empty string to 0', async () => {
                    const res = obj.convertHrsMinsToMins('');
                    assert.deepStrictEqual(res, 0);
                });

                it('convert null to 0', async () => {
                    const res = obj.convertHrsMinsToMins();
                    assert.deepStrictEqual(res, 0);
                });
            });

            describe('convertMinsToHrsMins:', () => {

                it('convert number MM to HH:MM', async () => {
                    const res = obj.convertMinsToHrsMins(610);
                    assert.deepStrictEqual(res, '10:10');
                });

                it('convert string MM to HH:MM', async () => {
                    const res = obj.convertMinsToHrsMins('610');
                    assert.deepStrictEqual(res, '10:10');
                });

                it('convert 9 to 00:09', async () => {
                    const res = obj.convertMinsToHrsMins(9);
                    assert.deepStrictEqual(res, '00:09');
                });

                it('convert 0 to 00:00', async () => {
                    const res = obj.convertMinsToHrsMins(0);
                    assert.deepStrictEqual(res, '00:00');
                });

                it('convert null to 00:00', async () => {
                    const res = obj.convertMinsToHrsMins(null);
                    assert.deepStrictEqual(res, '00:00');
                });

                it('convert undegined to 00:00', async () => {
                    const res = obj.convertMinsToHrsMins();
                    assert.deepStrictEqual(res, '00:00');
                });

            });
        });

    });
});
