import { CategoryStatsDTO } from './category-stats.dto';

//Describes object which contains aggregated data statistics
export class StatsDTO {
  stats: CategoryStatsDTO[];
  constructor(stats: CategoryStatsDTO[]) {
    this.stats = stats;
  }
}
