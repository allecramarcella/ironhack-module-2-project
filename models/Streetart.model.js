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
    fullAddress: {
      type: Schema.Types.Mixed
    },
    street: {
      type: String,
      required: [true, 'The street is required.']
    },
    streetNumber: {
      type: Number,
      required: [true, 'The street number is required.']
    },
    postalCode: {
      type: Schema.Types.Mixed,
      required: [true, 'The postal code is required.']
    },
    city: {
      type: String,
      required: [true, 'City is required.']
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