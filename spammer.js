function S(e){window.enmity.plugins.registerPlugin(e)}

const { React } = window.enmity.modules.common;
const Messages = window.enmity.modules.common.Messages;
const Channels = window.enmity.modules.common.Navigation;


const CustomButton = ({ channelId }) => {
    const sendSpam = () => {
        if (!channelId) return;
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                Messages.sendMessage(channelId, { content: "test" });
            }, i * 300);
        }
    };

    return React.createElement(
        "button",
        {
            onClick: sendSpam,
            style: {
                backgroundColor: "#7289DA",
                borderRadius: "5px",
                padding: "8px",
                marginLeft: "5px",
                color: "white",
                border: "none",
                cursor: "pointer"
            }
        },
        "連投"
    );
};


const patcher = window.enmity.patcher.create("spam-button-plugin");

const plugin = {
    name: "SpamButton",
    version: "1.0.0",
    description: "メッセージ送信ボタンの横に「連投」ボタンを追加し、「あ」を10回送信",
    authors: [{ name: "YourName", id: "123456789012345678" }],

    onStart() {
        patcher.after("MessageInput", "type", (args, res) => {
            const channelId = Channels.getLastSelectedChannelId();
            if (!channelId) return res;

            const children = res?.props?.children;
            if (children && Array.isArray(children)) {
                children.push(React.createElement(CustomButton, { channelId }));
            }
            
            return res;
        });
    },

    onStop() {
        patcher.unpatchAll();
    }
};

S(plugin);
