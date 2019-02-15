import { SelectItem } from 'primeng/api';

export class MessageSent implements SelectItem {
    messageId: string;
    subject: string;
    body: string;
    toName: string;
    toMemberPicUri: string;

    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}
