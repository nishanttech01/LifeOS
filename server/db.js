import mongoose from 'mongoose';

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  twinPersona: { type: String, default: 'analytical' }
}, { timestamps: true });

// Goal Schema
const GoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['Career', 'Business', 'Finance', 'Education', 'Productivity', 'Health', 'General'], required: true },
  deadline: { type: Date, required: true },
  progress: { type: Number, default: 0, min: 0, max: 100 }
}, { timestamps: true });

// Task Schema
const TaskSchema = new mongoose.Schema({
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', required: true },
  task: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
}, { timestamps: true });

// Memory Schema
const MemorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  information: { type: String, required: true },
  importance: { type: String, enum: ['high', 'medium', 'low'], default: 'high' }
}, { timestamps: true });

// Finance Transaction Schema
const FinanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

// Document AI Schema
const DocumentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  fileSize: { type: String },
  pages: { type: Number },
  extractedText: { type: String },
  analysisSummary: { type: String }
}, { timestamps: true });

// AI Reports Schema
const AIReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String },
  recommendation: { type: String },
  rootCause: { type: String },
  actionsSuggested: [{ type: String }],
  generatedDate: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', UserSchema);
export const Goal = mongoose.model('Goal', GoalSchema);
export const Task = mongoose.model('Task', TaskSchema);
export const Memory = mongoose.model('Memory', MemorySchema);
export const Finance = mongoose.model('Finance', FinanceSchema);
export const Document = mongoose.model('Document', DocumentSchema);
export const AIReport = mongoose.model('AIReport', AIReportSchema);
