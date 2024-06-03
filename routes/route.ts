import express from 'express';
const route = express.Router();

import cotrollor from '../controllors/controllor';
import controllor from '../controllors/controllor';

route.post('/identity',controllor.identify);



export default route;



