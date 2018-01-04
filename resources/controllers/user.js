import BaseController              from './base';
import { User } from '../../models';


export class UserController extends BaseController{
    constructor(){
      super(User, '_id');
    }
}