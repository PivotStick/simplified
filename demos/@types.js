/**
 * This is the file for defining the types and their validations.
 */

this.string = {
    cast: String,
    validator: (v) => v !== "undefined", // "v" is the value after it's been casted
};

this.number = {
    cast: Number,
    validator: (v) => !isNaN(v), // must return true if it's valid
};

this.date = {
    cast: (v) => new Date(v), // you can just pass a callback as the caster
    validator: (v) => !isNaN(v.valueOf()), // a date object is NaN if it's an invalid date
};

/**
 * create yours...
 */
