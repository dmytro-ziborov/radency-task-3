//Describes statistics for single category
export class CategoryStatsDTO {
  category: string;
  stats: { active: number; archive: number } = { active: 0, archive: 0 };
  constructor(categoryName: string, active: number, archived: number) {
    this.category = categoryName;
    this.stats.active = active;
    this.stats.archive = archived;
  }
}
