import { BaseRoutes, IRoute } from '.';
import { Request, Response } from 'express';

export class HabitatRoutes extends BaseRoutes {
  routes: IRoute[] = [
    {
      path: '/habitats',
      secure: true,
      method: 'get',
      handler: this.fetch.bind(this),
    },
    {
      path: '/habitat/add',
      secure: true,
      method: 'post',
      handler: this.add.bind(this),
    },
    {
      path: '/habitat/:id',
      secure: true,
      method: 'delete',
      handler: this.delete.bind(this),
    },
  ];

  async fetch(req: Request, res: Response): Promise<Response> {
    const habitats = await this.services.habitat.fetch();
    return res.json(this.successResponse(habitats));
  }

  async add(req: Request, res: Response): Promise<Response> {
    const habitat = await this.services.habitat.add(req.body);
    return res.json(this.successResponse(habitat));
  }

  async delete(req: Request, res: Response): Promise<Response> {
    console.log(req.params);
    await this.services.habitat.delete(req.params.id);
    return res.json(this.successResponse());
  }
}
