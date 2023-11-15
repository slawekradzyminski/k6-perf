interface Headers {
    Subject: string
}

interface Content {
    Headers: Headers
}

interface Item {
    Content: Content
}

export interface Message {
    items: Item[]
}
