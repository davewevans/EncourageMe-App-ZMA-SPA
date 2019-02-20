import { SelectItem } from 'primeng/api';
import { Status } from './status.enum';

export class MessageReceived implements SelectItem {
    messageId: string;
    subject: string;
    body: string;
    fromName: string;
    fromMemberId: string;
    fromMemberPicUri?: string;
    toMemberPicUri: string;
    dateCreated: Date;
    status: Status;
    messageOpen: boolean;
    messageHasOpened: boolean;

    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}
