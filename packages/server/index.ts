import express from 'express';
import { IUser, ISample } from 'monorepo-shared';

const PORT = 5000;
const app = express();


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
