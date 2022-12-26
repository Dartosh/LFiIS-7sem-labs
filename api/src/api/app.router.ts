import express from 'express';
import { TextDto } from './lab-1/interfaces/text.dto.js';

import { AppInjector } from './app.injector.js';

const appRouter = express();
const appInjector = new AppInjector();

appRouter.post('/lab-1/create-rules', (req, res) => {
    try {
        const response = appInjector.getLab1Controller.readSetsAndCreateRules(req.body);

        res.json(response);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
});

appRouter.post('/lab-1/apply-rule', (req, res) => {
    try {
        const response = appInjector.getLab1Controller.applyRule(req.body);

        res.json(response);
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
});

export default appRouter;