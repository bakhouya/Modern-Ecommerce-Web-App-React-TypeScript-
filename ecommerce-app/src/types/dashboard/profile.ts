

export interface ChangePasswordType {
    old_password        : string;
    new_password        : string;
    confirm_password    : string;
}

export interface Profile {
    username  : string;
    email     : string;
    full_name : string;
    avatar    : string;
    phone     : string;
    address   : string;
    city      : string;
}

export interface ResponseProfile {
    username  : string;
    email     : string;
    full_name : string;
    avatar    : string;
    phone     : string;
    address   : string;
    user_city : {
        id      : string ,
        title   : string ,
    };
}


