const mongoose = require('mongoose')
const Schema = mongoose.Schema

const streetartSchema = new Schema (
  {
    streetArtImgUrl: {
      type: String,
      required: [true, 'A picture of the graffiti is required.']
    },
    name: {
      type: String,
      default: 'Untitled - '
    },
    artist: {
      type: String,
      default: 'Unknown'
    }, 
    location : {
      type: {type: String},
      coordinates: [Number],
    },
    details: {
      type: String, 
      maxlength: 300
    },
    uploader: { type: Schema.Types.ObjectId, 'ref':'User' }
  },
  {
    timestamps: true
  }
)

streetartSchema.index({ location: '2dsphere' })

const Streetart = mongoose.model('Streetart', streetartSchema)

module.exports = Streetart