import mongoose from 'mongoose';
import { Utils } from './utils';

export default function(callback) {
	mongoose.Promise = global.Promise;
	mongoose.connect(Utils.getDbStr());
	callback();
}
