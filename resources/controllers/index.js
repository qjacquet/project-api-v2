import BaseController              from './base';
import { User, Scrumboard } from '../../models';

export class UserController extends BaseController{
  constructor(){
    super(User, '_id');
  }
}

export class ScrumboardController extends BaseController{
  constructor(){
    super(Scrumboard, '_id');
  }
}
