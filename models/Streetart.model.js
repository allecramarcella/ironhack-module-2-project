const mongoose = require('mongoose')
const Schema = mongoose.Schema

const streetartSchema = new Schema (
  {
    streetArtImgUrl: {
      type: String,
      required: [true, 'A picture of the street art is required.']
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
    city: {
      type: String,
      required: [true, 'The city is required.']
    },
    address: {
      type: String,
      required: [true, 'Address is required.']
    },
    details: {
      type: String, 
      maxlength: 300
    },
    user: { type: Schema.Types.ObjectId, 'ref':'User' }
  },
  {
    timestamps: true
  }
)

streetartSchema.index({ location: '2dsphere' })

const Streetart = mongoose.model('Streetart', streetartSchema)

module.exports = Streetart