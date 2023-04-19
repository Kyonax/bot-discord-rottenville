const { JSFiles } = require("../src/utils/handler/handler");
const { delay } = require("../src/utils/misc/functions");

const app = require("../structure_bot.json");

describe('GET BOT FILES:dependences of the app structure ', () => {

    test('GET ALL COMMANDS FILES', async () => {
        const all_commands = await JSFiles("../../command");

        await delay(1).then(function () {
            expect(all_commands.length).toBe(app.bot.backend.commands);
        });
    })

    test('GET ALL EVENTS FILES', async () => {
        const all_events = await JSFiles("../../event");

        await delay(1).then(function () {
            expect(all_events.length).toBe(app.bot.backend.events);
        });
    })
})
