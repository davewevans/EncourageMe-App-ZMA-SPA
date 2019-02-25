export interface SendMessage {
    title: string;
    firstName: string;
    lastName: string;
    profilePhotoUri: string;
    toMemberId: string;
    message?: string;
    fromMemberId: string;
  }
