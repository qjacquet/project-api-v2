export function ok(res) {
    return (data) => {
        res.json(data);
    };
};

export function fail(res) {
    return (error) => {
        console.log(error);
        res.sendStatus(404).end();
    };
};