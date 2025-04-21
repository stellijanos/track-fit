export interface Register {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    birthDate: Date,
    password: string,
    passwordConfirm: string,
    gender: 'male' | 'female' | 'other'
}
