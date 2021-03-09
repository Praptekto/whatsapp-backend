import mongoose from 'mongoose';

const whatsappSchema=mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    received:Boolean,
})

export default mongoose.model('messagecontents', whatsappSchema); //messagContent adalah collection yang mau kita buat
// whatsppSchema adalah data structurenya



