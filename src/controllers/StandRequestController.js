const StandRequestService = require("../services/StandRequestService");

class StandRequestController {
  async create(req, res) {
    try {
      const data = req.body;
      const result = await StandRequestService.create(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const requests = await StandRequestService.getAll();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async validate(req, res) {
    try {
      const id = req.params.id;
      const result = await StandRequestService.validateRequest(id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new StandRequestController();
