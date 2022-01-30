import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { mergeMap, map, filter, tap } from 'rxjs/operators';
import { Contact } from './contact';
import { Message } from './message';
import { Topic } from './topic';

@Component({
    templateUrl: './message-form.component.html',
    providers: [DataService]
})
export class MessageFormComponent implements OnInit {
    topics: Topic[];
    messages: Message[];
    contacts: Contact[];
    contact: Contact = new Contact();
    message: Message = new Message();
    contactIndex: number;
    messageId: number;
    msgForm: FormGroup;

    constructor(private dataService: DataService, private router: Router) {
        this.msgForm = new FormGroup({
            "contactName": new FormControl("", Validators.required),
            "contactEmail": new FormControl("", [Validators.required, Validators.email]),
            "phoneNumber": new FormControl("", [Validators.required, Validators.pattern("[0-9]{10}")]),
            "topic": new FormControl(1, Validators.required),
            "message": new FormControl("", Validators.required)
        });
    }


    ngOnInit() {
        this.loadTopics();
    }

    loadTopics() {
        this.dataService.getTopics()
            .subscribe((data: Topic[]) => this.topics = data);
    }

    submit() {
        // Заполнение известных данных
        this.contact.name = this.msgForm.controls['contactName'].value;
        this.contact.email = this.msgForm.controls['contactEmail'].value;
        this.contact.phoneNumber = this.msgForm.controls['phoneNumber'].value;
        this.message.text = this.msgForm.controls['message'].value;
        this.message.topicId = Number(this.msgForm.controls['topic'].value);

        // Поиск контакта с таким же email и телефоном
        // Сохранение нового или возвращение существующего
        // Затем сохранение нового сообщения в базе

        // Действие, если контакт не найден
        const contactNotFound = this.dataService.findContact(this.contact.email, this.contact.phoneNumber).pipe(
            filter(res => res === null), mergeMap(_ => { return this.dataService.createContact(this.contact) }));

        // Действие, если контакт найден
        const contactFound = this.dataService.findContact(this.contact.email, this.contact.phoneNumber).pipe(
            filter(res => res != null), tap(res => { return res }));

        const mes = merge(contactNotFound, contactFound).pipe(
            map((contact: Contact) => {
                this.message.contactId = contact.id;
                console.log(this.message);
                return this.message;
            }),
            mergeMap((msg: Message) => {
                return this.dataService.createMessage(msg);
            })
        ).subscribe((msg: Message) => { this.messageId = msg.id; console.log(this.messageId) },
            (err) => console.log(err),
            () => { this.router.navigate(['/message', this.messageId]) });
    }
}