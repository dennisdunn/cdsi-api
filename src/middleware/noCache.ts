/** NoCache */
export const noCache = (req, res, next) => {
    res.set('Cache-control', 'no-cache, max-age=0');
    next();
}