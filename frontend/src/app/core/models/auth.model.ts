
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

export interface Login {
    credential: string,
    password: string
}

export interface ChangePassword {
    currentPassword: string,
    newPassword: string,
    newPasswordConfirm: string
}

export interface ForgotPassword {
    credential: string
}

export interface ValidateResetPassword {
    code: string
}

export interface ResetPassword {
    code: string,
    password: string,
    passwordConfirm: string
}
