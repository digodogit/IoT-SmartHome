import express, { Express, Request, Response } from "express";
import { IUser } from '../models/User';
import { registerUser, loginUser } from "../controllers/authController";
import auth, { CustomRequest } from '../middleware/auth';


const router = express.Router();

router.post('/register', async (req: Request, res: Response): Promise<any> => {
  const userData: Partial<IUser> = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }
  const registeredUser = await registerUser(userData)
  
  if (registeredUser.error) {
    return res.status(400).json({
      error: registeredUser.error,
    })
  }
  return res.status(201).json(registeredUser)
})
router.post('/login', async (req: Request, res: Response): Promise<any> => {
    const userData: Partial<IUser> = {
        email: req.body.email,
        password: req.body.password,
      }
    const loggedInUser = await loginUser(userData)
    if (loggedInUser?.error) {
        return res.status(400).json({
            error: loggedInUser.error,
          })
          
        }
        console.log(loggedInUser);
        return res.status(200).json(loggedInUser);
         
  })

  router.get('/me', auth, async (req: CustomRequest, res): Promise<any> => {
    return res.status(200).json({
      user: req.user,
    })
  })
  router.get('/session', auth, async (req: CustomRequest, res): Promise<any> => {
    console.log(req)
    
  })
  router.post('/logout', auth, async (req: CustomRequest, res): Promise<any> => {
    if (req.user) {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
      })
      await req.user.save()
    }
  
    return res.status(200).json({
      message: 'User logged out successfully.',
    })
  })
  
  // Logout user from all devices
  router.post('/logoutall', auth, async (req: CustomRequest, res): Promise<any> => {
    
    if (req.user) {
      req.user.tokens = []
      await req.user.save()
    }
    return res.status(200).json({
      message: 'User logged out from all devices successfully.',
    })
  })


export default router