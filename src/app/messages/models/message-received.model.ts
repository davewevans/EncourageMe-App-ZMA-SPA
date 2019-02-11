export interface MessageReceived {
    messageId: string;
    subject: string;
    body: string;
    fromName: string;
    fromMemberId: string;
    fromMemberPicUri: string;
    toMemberPicUri: string;
}
