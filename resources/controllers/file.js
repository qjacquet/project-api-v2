import BaseController from './base';
import { File } from '../../models';


export class FileController extends BaseController {
    constructor() {
        super(File, '_id');
    }
}