import express from 'express';

const router = express.Router();

import routerIndex from './v1/index.js';

router.use("/v1/api", routerIndex);
//router.get("/", (req, res, next) => res.send({ ok: true }));
//router.get("/", (req, res, next) => res.render("Home"));

router.use(function (error, req, res, next) {
    if (error.name === "ValidationError") {
        return res.status(422).json({
            errors: Object.keys(error.erros).reduce(function (errors, key) {
                errors[key] = error.errors[key.message];
                return errors;
            }, {})
        });
    }
});
export default router;