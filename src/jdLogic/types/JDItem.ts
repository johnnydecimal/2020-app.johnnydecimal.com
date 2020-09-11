/**
 * JDLineObject is the type returned by jdLineParser.
 */
type JDItem = {
	jdType:
		| "project"
		| "area"
		| "category"
		| "id"
		| "divider"
		| "comment"
		| "emptyline"
		| "error"; // TODO: Should this really be a JDItem type?
	jdNumber?: string;
	jdTitle?: string;
	comment?: string; // Any inline comments like this one
	metadata?: string; // TODO: Figure out how this is stored.
	error?: "Nothing matched." | "Multi-line input not allowed.";
};

export default JDItem;
