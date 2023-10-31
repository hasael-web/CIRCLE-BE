import { Request, Response } from "express";
import handleError from "../../utils/exception/handleError";
import ProducerService from "../ProducerService";

export default new (class ThreadProducer {
  async add(req: Request, res: Response): Promise<Response> {
    try {
      await ProducerService.sendMessage(
        "thread-post-queue",
        JSON.stringify({
          ...req.body,
          loginId: res.locals.auth.id,
        })
      );

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Add Thread Queued",
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
})();
