import User, { IUser } from '../models/User';

export const registerUser = async (user: Partial<IUser>) => {
    const { name, email, password } = user
    if (!name || !email || !password) {
      return {
        error: 'Por favor, informe todos os campos.',
      }
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return {
        error: 'E-mail já existente.',
      }
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    const token = await newUser.generateAuthToken();
    return {
      user: newUser,
      token,
    }
  }
export const loginUser = async (users: Partial<IUser>) => {
    const {email, password} = users;
    if (!email || !password){
        return {
            error: "por favor, insira todos os dados.",
        }
    }
    const existingUser = await User.findByCredentials(email, password) 
        if (!existingUser) {
            return null;
          }
          const token = await existingUser.generateAuthToken();
          return {
            user: existingUser,
            token,
          };
    }

