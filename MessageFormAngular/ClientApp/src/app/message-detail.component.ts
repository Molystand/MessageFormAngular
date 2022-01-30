import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { DataService } from './data.service'
import { Contact } from './contact';
import { Message } from './message';
import { Topic } from './topic';

@Component({
    templateUrl: './message-detail.component.html',
    providers: [DataService]
})
export class MessageDetailComponent implements OnInit {
    messageId: number;
    message: Message;
    contact: Contact;
    topic: Topic;
    loaded: boolean = false;        // Были ли загружены данные

    constructor(private dataService: DataService, activeRoute: ActivatedRoute) {
        this.messageId = Number(activeRoute.snapshot.params["id"]);
    }

    ngOnInit() {
        if (this.messageId) {
            this.loadMessageData(this.messageId);
        }
    }

    loadMessageData(id) {
        this.dataService.getMessage(id).pipe(
            map(msg => {
                this.message = msg;
                return this.message;
            }),
            mergeMap(msg => {
                return forkJoin({
                    contact: this.dataService.getContact(msg.contactId),
                    topic: this.dataService.getTopic(msg.topicId)
                });
            })
        ).subscribe((res: any) => {
            this.contact = res['contact'];
            this.topic = res['topic'];
            this.loaded = true;
        });
    }
}