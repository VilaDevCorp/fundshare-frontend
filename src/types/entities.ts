export interface BaseEntity {
    id: string;
    createdAt: Date;
    createdBy?: User;
}

export interface UserConf {
    currency: string;
}

export interface User extends BaseEntity {
    username: string;
    email: string;
    balance?: number;
    conf?: UserConf;
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

export interface Payment extends BaseEntity {
    description: string;
    totalAmount: number;
    group: Group;
    user: User;
    userPayments: UserPayment[];
}

export type PaymentType = 'total' | 'divided';

export interface UserPayment extends BaseEntity {
    user: User;
    payment?: Payment;
    amount: number;
}

export interface CreatePaymentForm {
    description: string;
    groupId: string;
    payees: CreateUserPaymentForm[];
}

export interface CreateUserPaymentForm {
    username: string;
    amount: number;
}

export interface Debt {
    payer: User;
    payee: User;
    amount: number;
}

export interface GroupDebt {
    group: Group;
    amount: number;
}

export interface Currency {
    id: string;
    name: string;
    symbol: string;
    rate: number;
}
