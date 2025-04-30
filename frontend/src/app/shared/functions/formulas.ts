import { User } from "../../core/models/user.model";

export function calculateAge(date: Date): number {
    const birthDate = new Date(date);
    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    const m = now.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export function calculateIMC(user: User): string {
    const heightM = user.height / 100;
    const weightKg = user.lastMeasurement?.weight || 0;
    const imc = weightKg / (heightM * heightM);
    return imc ? imc.toFixed(1) : 'N/A';
}

export function calculateBMR(user: User): string {
    const weight = user.lastMeasurement?.weight || 0;
    const height = user.height;
    const age = calculateAge(user.birthDate);
    let bmr = 0;

    if (user.gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (user.gender === 'female') {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age;
    }

    return bmr ? bmr.toFixed(0) + ' kcal' : 'N/A';
}

export function calculateTDEE(user: User): string {
    const bmr = parseFloat(calculateBMR(user));
    const activityFactor = 1.55;
    const tdee = bmr * activityFactor;
    return tdee ? tdee.toFixed(0) + ' kcal' : 'N/A';
}
