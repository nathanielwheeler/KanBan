import BoardService from '../services/BoardService'
import ListService from '../services/ListService'
import express from 'express'
import { Authorize } from '../middleware/authorize.js'

let _boardService = new BoardService().repository
let _listService = new ListService().repository

//PUBLIC
export default class BoardsController {

  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/lists', this.getLists)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  // this is pretty neat

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await _boardService.find({ authorId: req.session.uid }).populate('authorId', 'name')
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await _boardService.findOne({ _id: req.params.id, authorId: req.session.uid }).populate('authorId', 'name')
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getLists(req, res, next) {
    try {
      let data = await _listService.find({ boardId: req.params.id }).populate('boardId').populate('authorId', 'name')
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _boardService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await _boardService.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await _boardService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


