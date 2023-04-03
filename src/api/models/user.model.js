const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema(
	{
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: "",
		},
		role: {
			type: String,
			default: "user",
		},
	},
	{
		timestamps: true,
	}
);

userSchema.index({ email: "text", name: "text" });
const accountModel = mongoose.model("Accounts", userSchema);
accountModel.createIndexes({ email: "text", name: "text" });
module.exports = accountModel;
