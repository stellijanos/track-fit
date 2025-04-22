import {ActivityEntry} from "./activity-entry.model";
import { MealEntry } from "./meal-entry.model";
import { WaterIntake } from "./water-intake.model";

export interface Entry {
    activities: ActivityEntry,
    meals: MealEntry,
    waterIntake: WaterIntake
}
