export interface BaseEntity {
    id: string;
    createdAt: Date;
    createdBy?: User;
}

export interface User extends BaseEntity {
    username: string;
    email: string;
    balance?: number;
}

export interface RegisterUserForm {
    username: string;
    email: string;
    password: string;
}

export interface Group extends BaseEntity {
    name: string;
    description: string;
    isActive: boolean;
    balance?: number;
    users?: User[];
}

export interface CreateGroupForm {
    name: string;
    description: string;
}

export interface Request extends BaseEntity {
    id: string;
    group: Group;
    user: User;
}

export interface CreateRequestForm {
    usernames: string[];
    groupId: string;
}
