import { Schema, model, Document, Model, HydratedDocument} from "mongoose";
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    tokens: {token: String}[];
    
    
}

export interface IUserMethods{
    generateAuthToken(): Promise<string>
    toJSON(): IUser
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
    findByCredentials(email: string, password: string): Promise<HydratedDocument<IUser, IUserMethods>>
}

const userSchema = new Schema<IUser,IUserMethods>({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    tokens: [{ token: { type: String, required: true } }],
    
});

userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_JWT as string)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
  }
  
  userSchema.methods.toJSON = function () {
    const user = this as IUser
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
  }
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
      return null
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return null
    }
    return user
  };

const User = model<IUser, UserModel>('User', userSchema);

export default User