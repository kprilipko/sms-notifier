interface ISMS {
  id: number;
  tel: string;
  body: string;
}

type SMSState = {
  smsList: ISMS[];
};

type SMSAction = {
  type: string;
  sms: ISMS;
};

type DispatchType = (args: SMSAction) => SMSAction;
