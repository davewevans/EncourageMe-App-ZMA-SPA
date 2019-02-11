export interface MemberSettings {
    firstName: string;
    lastName: string;
    gender: number;
    email: string;
    birthdate?: Date;
    weddingDate?: Date;
    joinZionDate?: Date;
    mobilePhoneNumber: string;
    activeAccount: boolean;
    receiveEmail: boolean;
    receiveTextMessages: boolean;
    birthdayNotificationsOptIn: boolean;
    pray4MeOptIn: boolean;
    informMeOptIn: boolean;
    showBirthdate: boolean;
}
