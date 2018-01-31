import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

/** Define schemas */
const UserSchema = new mongoose.Schema({
    id: String,
    login: String,
    password: String,
    firstName: String,
    lastName: String,
    avatar: String,
    admin: Boolean,
    status: Number
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, res) {
        return cb(res);
    });
};


/** Set schemas */
const User = mongoose.model('User', UserSchema);


export { User };