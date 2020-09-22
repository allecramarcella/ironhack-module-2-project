const mongoose = require('mongoose')
const Schema = mongoose.Schema

const graffitiSchema = new Schema (
  {
    graffitiImgUrl: {
      type: String,
      required: [true, 'A picture of the graffiti is required.']
    },
    Artist: {
      type: String,
      default: 'Unknown'
    }, 
    Location : {
      type: {type: String},
      coordinates: [Number],
      required: [true, 'Location is required.']
    },
    Details: {
      type: String, 
      maxlength: 300
    }
  },
  {
    timestamps: true
  }
)

graffitiSchema.index({ location: '2dsphere' })

const Graffiti = mongoose.model('Graffiti', graffitiSchema)

module.exports = Graffiti