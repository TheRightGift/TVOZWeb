const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tvSchema = new Schema({
    title: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	type: {
        type: String,
        required: true
	},
	url: {
		type: String,
		required: false
    },    
	date: {
        type: Date,
        required: true
    },
	onGoing: {
		type: String,
		default: 'N',
        required: true
	},
	done: {
		type: String,
		default: 'N',
        required: true
    },
	thumbImg: {
        type: String,
        required: true
	},
	coverImg: {
		type: String,
		required: true
	}
}, {
    timestamps: true
});

let liveTV = mongoose.model("liveTV", tvSchema);

module.exports = liveTV;
