const { generateCoins } = require("../src/utils/logic/logicBank");
const logicMember = require("../src/utils/logic/logicMember");
const { delay } = require("../src/utils/misc/functions");

describe('HEALTH LOGIC BANK:logic must generate a random number', () => {
    test('GENERATE RANDOM COINS:random number less equal to 1', async () => {
        const coins = await generateCoins();

        expect(typeof coins).toBe('number');
        expect(coins).toEqual(1);
    })
})

describe('HEALTH LOGIC MEMBER:logic must generate some member attributes', () => {
    test('GENERATE SOME XP:random number less or equal 300', async () => {
        const xp_member = await logicMember.generateXP(100);

        expect(typeof xp_member).toBe('number');
        expect(xp_member).toBeLessThanOrEqual(3000);
    })

    test('GENERATE SOME RP XP:random number less or equal 32000', async () => {
        const xp_rp_member = await logicMember.generateRolePlayXP(100)

        expect(typeof xp_rp_member).toBe('number');
        expect(xp_rp_member).toBeLessThanOrEqual(32000);
    })

    test('CURRENT LIMIT LEVEL', async () => {
        const current_level = 2;
        const limit_xp = await logicMember.limit(0, current_level);

        expect(typeof limit_xp).toBe('number');
        expect(limit_xp).toEqual(147);
    })

    test('NEW LEVEL:each time xp exceed the level limit, resets the level', async () => {
        const current_level = 2, current_xp = 146;
        const new_level = await logicMember.limitLevel(current_xp + 1, current_level);
        const not_new_level = await logicMember.limitLevel(current_xp, current_level);

        expect(typeof new_level).toBe('number');
        expect(new_level).toBeGreaterThan(current_level);

        expect(typeof not_new_level).toBe('number')
        expect(not_new_level).toEqual(current_level);
    })
})