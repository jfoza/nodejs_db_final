import * as Yup from 'yup';
import Scrap from '../models/Scrap';

class ScrapController {
  async index(req, res) {
    try {
      const scraps = await Scrap.findAll({
        attributes: ['id', 'title', 'message'],
        where: {
          user_id: req.userId,
        },
      });

      return res.json(scraps);
    } catch (error) {
      return res.json(error);
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        message: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Vlidation failed' });
      }

      const scrap = {
        user_id: req.userId,
        ...req.body,
      };

      const { id, title, message } = await Scrap.create(scrap);

      return res.json({
        id,
        title,
        message,
      });
    } catch (error) {
      return res.json(error);
    }
  }
}

export default new ScrapController();
