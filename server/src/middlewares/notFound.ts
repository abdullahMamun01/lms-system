// Corrected middleware implementation
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Route Not Found !!',
    statusCode: 404
  });
  // No need to return or call next() after sending response
};

export default notFound;