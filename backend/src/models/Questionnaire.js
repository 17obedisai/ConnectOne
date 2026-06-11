const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  feeling: Number,
  main_goal: String,
  challenges: [String],
  activity_level: String,
  nutrition_rating: String,
  advanced_options: [String],
  completado: {
    type: Boolean,
    default: false
  },
  fechaCompletado: Date
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);
