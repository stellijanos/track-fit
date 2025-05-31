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
    return imc ? `${imc.toFixed(1)} kcal` : 'N/A';
}

export function calculateBMR(user: User): number {
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

    return bmr;
}

export function calculateTDEE(user: User): number {
    const bmr = calculateBMR(user);
    const activityFactor = 1.55;
    return bmr * activityFactor;
}


export function normalizeTimeOfDay(dateStr: string): number {
    const today = new Date().toISOString().split('T')[0];

    if (dateStr > today) return 0;
    if (dateStr < today) return 1;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    return (hours + minutes / 60) / 24;
}
