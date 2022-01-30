export class Message {
    constructor(
        public id?: number,
        public text?: string,
        public topicId?: number,
        public contactId?: number) { }
}