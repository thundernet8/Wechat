enum MessageType {
    TEXT = "text",
    IMAGE = "image",
    VOICE = "voice",
    VIDEO = "video",
    MUSIC = "music", // 仅开发者回复
    NEWS = "news", // 仅开发者回复
    SHORT_VIDEO = "shortvideo",
    LOCATION = "location",
    LINK = "link",
    DEVICE_EVENT = "deviceevent",
    DEVICE_TEXT = "devicetext",
    FILE = "file",
    TEXT_CARD = "textcard",
    TRANSFER = "transfer",
    EVENT = "event",
    UNKNOWN = "unknown"
}

export default MessageType;
