import type {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import type {JwtPayload} from 'jsonwebtoken'

interface AuthenticatedRequest extends Request {
    id?: string;
}


const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req?.cookies?.token;

        if(!token){
            return res.status(401).json({
                message: 'User not Authenticated',
                success: false
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload

         if(!decode){
            return res.status(401).json({
                message:'Invalid',
                success:false
            });
        }
        req.id = decode.userId;
        next();
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something is Wrong',
            success: false
        })
    }
}



export default isAuthenticated;