
interface WaterEntry {
    id: string,
    date: Date,
    quantity: number,
}

export interface WaterIntake {
    id: string,
    entries: WaterEntry[]
}
