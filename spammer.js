function S(e) { window.enmity.plugins.registerPlugin(e); }

const { Messages, Commands, Navigation } = window.enmity.modules.common;

const sendSpam = (channelId) => {
    if (!channelId) return;
    for (let i = 0; i < 10; i++) { 
        setTimeout(() => {
            Messages.sendMessage(channelId, { content: "あ" });
        }, i * 300); 
    }
};


const plugin = {
    name: "SpamCommand",
    version: "1.0.0",
    description: "「/start」と打つと「あ」を10回連投する",
    authors: [{ name: "YourName", id: "123456789012345678" }],

    onStart() {
        Commands.registerCommand({
            name: "start",
            displayName: "start",
            description: "「あ」を10回連投する",
            options: [],
            execute: () => {
                const channelId = Navigation.getLastSelectedChannelId();
                sendSpam(channelId);
                return { result: "スパム開始！" };
            }
        });
    },

    onStop() {
        Commands.unregisterCommand("start");
    }
};

S(plugin);
