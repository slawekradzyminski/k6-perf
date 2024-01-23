export interface Message {
    items: Item[]
}

interface Item {
    Content: Content
}

interface Content {
    Headers: Headers
}

interface Headers {
    Subject: string[]
}
