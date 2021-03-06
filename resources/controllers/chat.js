import BaseController from './base';
import { Router } from 'express';
import mongoose from 'mongoose';
import pluralize  from "pluralize";
import {ok, fail, getUserId} from "./utils";
import { User, Chat } from '../../models';

const MAX_RESULTS = 100;

export class ChatController extends BaseController {
  constructor() {
    super(Chat, '_id');
  }

  listByUser(userId) {
    return Chat
      .find({
        'members._id': mongoose.Types.ObjectId(userId)
      })
      .limit(MAX_RESULTS)
      .then((modelInstances) => {
        var response = {};
        response = modelInstances;
        return response;
      });
  }

  route() {
    const router = new Router();

    router.get("/", (req, res) => {
      this
        .listByUser(getUserId(req))
        .then(ok(res))
        .then(null, fail(res));
    });

    router.post("/", (req, res) => {
      this
        .create(req.body)
        .then(ok(res))
        .then(null, fail(res));
    });

    router.get("/:key", (req, res) => {
      this
        .read(req.params.key)
        .then(ok(res))
        .then(null, fail(res));
    });

    router.put("/:key", (req, res) => {
      delete req.body._id;
      this
        .update(req.params.key, req.body)
        .then(ok(res))
        .then(null, fail(res));
    });

    router.delete("/:key", (req, res) => {
      this
        .delete(req.params.key)
        .then(ok(res))
        .then(null, fail(res));
    });

    return router;
  }
}