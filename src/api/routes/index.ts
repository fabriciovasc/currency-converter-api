import v1 from './v1';
import { Router } from 'express';

const versionRoutes: { [key: string]: Router } = { v1 };

export default versionRoutes;
