import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export const carsTable = "cars";

class Car extends Model {
	static table = carsTable;

	@field("name")
	name!: string;

	@field("brand")
	brand!: string;

	@field("about")
	about!: string;

	@field("fuel_type")
	fuel_type!: string;

	@field("period")
	period!: string;

	@field("price")
	price!: number;

	@field("thumbnail")
	thumbnail!: string;
}

export { Car };
