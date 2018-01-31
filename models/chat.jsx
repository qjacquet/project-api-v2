import mongoose from 'mongoose';

/** Define schemas */
const ChatSchema = new mongoose.Schema({
    members: [{ 
        id: String,
        firstName: String,
        lastName: String,
        avatar: String
    }],
    dialog:[{
        who: String,
        message: String,
        time: String
    }]
});

/** Set schemas */
const Chat = mongoose.model('Chat', ChatSchema);


export { Chat };