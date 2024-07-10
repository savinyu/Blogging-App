import { Hono } from 'hono'
import userRouter from './Routes/userRoutes';
import blogRouter from './Routes/blogRoutes';

const app = new Hono()

app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);

export default app
