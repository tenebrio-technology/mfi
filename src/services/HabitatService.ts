import { BaseService } from '.';
import { Habitat, IHabitat } from '../model';

export class HabitatService extends BaseService {
  async add(habitat: IHabitat): Promise<IHabitat> {
    return (await Habitat.create(habitat)).get();
  }

  async fetch(): Promise<IHabitat[]> {
    return await Habitat.findAll({ raw: true });
  }

  async delete(habitat: IHabitat | string): Promise<void> {
    const id = typeof habitat === 'string' ? habitat : habitat.id;
    const entry = await Habitat.findByPk(id);

    await entry.destroy();
  }
}
