export class Localizator {

    private static shared: Localizator
    private messages: { [id: string]: string } = {}

    private constructor() {}

    public static getInstance() {
        if (!Localizator.shared) {
            Localizator.shared = new Localizator();
        }
        return Localizator.shared;
    }

    public loadMessages(data: object) {
        this.messages = {...this.messages, ...data};
    }

    public getMessages() {
        return this.messages;
    }
}