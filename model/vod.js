const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VODSchema = new Schema({
    title: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	genre: {
		type: String,
		required: true
	},
	artistes: {
		type: String,
		required: true
	},
	dir: {
		type: String,
		required: true
	},
	released: {
		type: String,
		required: true
	},
	likes: {
		type: Number,
		default: 0,
	},
	dislikes: {
		type: Number,
		default: 0,
	},
	views: {
		type: Number,
		default: 0,
	},
	viewing: {
		type: Number,
		default: 0,
	},
	imgPortrait: {
        type: String,
        required: true
	},
	imgLanscape: {
		type: String,
		required: true
	},
	videoFilename: {
		type: String,
		required: true
	}
}, {
    timestamps: true
});

let VOD = mongoose.model("VOD", VODSchema);

module.exports = VOD;
