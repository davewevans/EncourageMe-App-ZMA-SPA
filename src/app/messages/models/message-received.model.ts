import { SelectItem } from 'primeng/api';

export class MessageReceived implements SelectItem {
    messageId: string;
    subject: string;
    body: string;
    fromName: string;
    fromMemberId: string;
    fromMemberPicUri?: string;
    toMemberPicUri: string;

    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}
