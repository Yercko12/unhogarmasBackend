import jwt from 'jsonwebtoken';

 export const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ message: 'Token no proporcionado' });

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token)
        return res.status(401).json({ message: 'Formato de token inválido' });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
