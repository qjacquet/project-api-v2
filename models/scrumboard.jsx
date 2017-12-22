import mongoose from 'mongoose';

/** Define schemas */
const ScrumboardSchema = new mongoose.Schema({
    name: String,
    uri: String,
    settings: { 
        color:String,
        subscribed: Boolean,
        cardCoverImages: Boolean,
    },
    lists: [{ 
        id: String,
        name: String,
        idCards: [{type: String}]
    }],
    cards: [{ 
        id: String,
        name: String,
        description: String,
        idAttachmentCover: String,
        idMembers: [],
        idLabels: [],
        attachments: [],
        subscribed: Boolean,
        checklists: [],
        checkItems: Number,
        checkItemsChecked: Number,
        comments: [],
        activities: [],
        due: String
    }],
    members: [{ 
        id: String,
        firstName: String,
        lastName: String,
        avatar: String
    }],
    labels: [{ 
        id: String,
        name: String,
        color: String
    }],
});

/** Set schemas */
const Scrumboard = mongoose.model('Scrumboard', ScrumboardSchema);


export { Scrumboard };