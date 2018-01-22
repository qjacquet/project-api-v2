import mongoose from 'mongoose';

/** Define schemas */
const FileSchema = new mongoose.Schema({
    name: String,
    description: String,
    icon: String,
    type: String,
    owner: String,
    size: String,
    created: String,
    modified: String,
    location: String
});

/** Set schemas */
const File = mongoose.model('File', FileSchema);


export { File };