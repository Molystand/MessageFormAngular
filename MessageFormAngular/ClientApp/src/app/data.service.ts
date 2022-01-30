import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Contact } from './contact';
import { Message } from './message';
import { Topic } from './topic';

@Injectable()
export class DataService {
    private contactUrl = "/api/contact";
    private messageUrl = "/api/message";
    private topicUrl = "/api/topic";

    constructor(private http: HttpClient) { }

    getContacts() {
        return this.http.get(this.contactUrl);
    }

    getContact(id: number) {
        return this.http.get(this.contactUrl + '/' + id);
    }

    findContact(email: string, phoneNumber: string) {
        const params = new HttpParams()
            .set('email', email)
            .set('phoneNumber', phoneNumber);
        return this.http.get(this.contactUrl + '/find', { params });
    }

    createContact(contact: Contact) {
        return this.http.post(this.contactUrl, contact);
    }

    updateContact(contact: Contact) {
        return this.http.put(this.contactUrl, contact);
    }

    deleteContact(id: number) {
        return this.http.delete(this.contactUrl + '/' + id);
    }


    getMessages() {
        return this.http.get(this.messageUrl);
    }

    getMessage(id: number) {
        return this.http.get(this.messageUrl + '/' + id);
    }

    createMessage(message: Message) {
        return this.http.post(this.messageUrl, message);
    }

    updateMessage(message: Message) {
        return this.http.put(this.messageUrl, message);
    }

    deleteMessage(id: number) {
        return this.http.delete(this.messageUrl + '/');
    }


    getTopics() {
        return this.http.get(this.topicUrl);
    }

    getTopic(id: number) {
        return this.http.get(this.topicUrl + '/' + id);
    }
}