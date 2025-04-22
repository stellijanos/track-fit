import { CaloricTarget } from "./caloric-target.model"
import { Measurement } from "./measurement.model"

export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    birthDate: Date,
    gender: 'male' | 'female' | 'other'
    height: number,
    password: string,
    role: 'client' | 'admin' | 'other',
    profilePicture: string,
    lastMeasurement: Measurement,
    currentWaterTarget: {
        value: number,
        Unit: string,
        entryOptions: number[]
    },
    currentCaloricTarget: CaloricTarget,
    createdAt: Date,
    updatedAt: Date
}
