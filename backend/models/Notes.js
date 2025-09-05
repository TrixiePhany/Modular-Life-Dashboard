import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    title:{
        type: String,
        default: '',
    },
    content:{
        type: String, 
        required: true,
    }
}
, { timestamps: true })

export const Notes = mongoose.model('Notes', noteSchema)