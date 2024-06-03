"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearGuests = exports.getGuest = exports.addGuest = exports.listGuests = exports.dummy = void 0;
// Map from name to auction details.
const guests = new Map();
/**
 * Dummy route that just returns a hello message to the client.
 * @param req The request object
 * @param res The response object
 */
const dummy = (req, res) => {
    const name = first(req.query.name);
    if (name === undefined) {
        res.status(400).send('missing or invalid "name" parameter');
        return;
    }
    res.send({ msg: `Hi, ${name}!` });
};
exports.dummy = dummy;
/**
 * Returns a list of all the guests, sorted so that the ongoing guests come
 * first, with the ones about to end listed first, and the completed ones after,
 * with the ones completed more recently
 * @param _req the request
 * @param res the response
 */
const listGuests = (_req, res) => {
    const guest = Array.from(guests.values());
    res.send({ guests: guest });
};
exports.listGuests = listGuests;
/**
 * Add the guest to the list.
 * @param req the request
 * @param res the response
 */
const addGuest = (req, res) => {
    const name = req.body.name;
    if (typeof name !== 'string') {
        res.status(400).send("missing 'name' parameter");
        return;
    }
    const guestOf = req.body.guestOf;
    if (guestOf !== 'Molly' && guestOf !== 'James') {
        res.status(400).send("missing 'guestOf' parameter");
        return;
    }
    const family = req.body.family;
    if (typeof family !== 'boolean') {
        res.status(400).send("missing 'family' parameter");
        return;
    }
    if (!guests.has(name)) {
        const guest = { name: name, guestOf: guestOf, family: family };
        guests.set(guest.name, guest);
        res.send({ guest: guest });
        return;
    }
    const dietRestrictions = req.body.dietRestrictions;
    if (typeof dietRestrictions !== 'string') {
        res.status(400).send("missing 'dietRestrictions' parameter");
        return;
    }
    const hasPlusOne = req.body.hasPlusOne;
    const plusOneName = req.body.plusOneName;
    const plusOneDietRest = req.body.plusOneDietRest;
    if (hasPlusOne !== undefined) {
        if (hasPlusOne !== 0 && hasPlusOne !== 1) {
            res.status(400).send("hasPlusOne is not an appropriate number");
            return;
        }
        if (hasPlusOne == 1) {
            if (typeof plusOneName !== 'string') {
                res.status(400).send("missing 'plusOneName' parameter");
                return;
            }
            if (typeof plusOneDietRest !== 'string') {
                res.status(400).send("missing 'plusOneDietRest parameter");
                return;
            }
            const guest = {
                name: name,
                guestOf: guestOf,
                family: family,
                dietRestrictions: dietRestrictions,
                hasPlusOne: hasPlusOne,
                plusOneName: plusOneName,
                plusOneDietRest: plusOneDietRest
            };
            guests.set(guest.name, guest);
            res.send({ guest: guest });
            return;
        }
        const guest = {
            name: name,
            guestOf: guestOf,
            family: family,
            dietRestrictions: dietRestrictions,
            hasPlusOne: hasPlusOne
        };
        guests.set(guest.name, guest);
        res.send({ guest: guest });
        return;
    }
    const guest = {
        name: name,
        guestOf: guestOf,
        family: family,
        dietRestrictions: dietRestrictions
    };
    guests.set(guest.name, guest); // add this to the map of guests
    res.send({ guest: guest }); // send the guest we added
};
exports.addGuest = addGuest;
/**
 * Retrieves the current state of a given guest.
 * @param req the request
 * @param req the response
 */
const getGuest = (req, res) => {
    const name = first(req.query.name);
    if (name === undefined) {
        res.status(400).send("missing 'name' parameter");
        return;
    }
    const guest = guests.get(name);
    if (guest === undefined) {
        res.status(400).send(`guest with name: '${name}' does not exist`);
        return;
    }
    res.send({ guest: guest }); // send back the current guest state
};
exports.getGuest = getGuest;
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param) => {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === 'string') {
        return param;
    }
    else {
        return undefined;
    }
};
/**
 * Clears the Guests stored in the server.
 * (Only used for testing purposes.)
 */
const clearGuests = () => {
    guests.clear();
};
exports.clearGuests = clearGuests;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFvQkEsb0NBQW9DO0FBQ3BDLE1BQU0sTUFBTSxHQUF1QixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRTdDOzs7O0dBSUc7QUFDSSxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQWdCLEVBQUUsR0FBaUIsRUFBUSxFQUFFO0lBQ2pFLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBQzVELE9BQU87S0FDUjtJQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFJLEdBQUcsRUFBQyxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDO0FBUlcsUUFBQSxLQUFLLFNBUWhCO0FBRUY7Ozs7OztHQU1HO0FBQ0ksTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFpQixFQUFFLEdBQWlCLEVBQVEsRUFBRTtJQUN2RSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUM7QUFIVyxRQUFBLFVBQVUsY0FHckI7QUFFRjs7OztHQUlHO0FBQ0ksTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFnQixFQUFFLEdBQWlCLEVBQVEsRUFBRTtJQUNwRSxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMzQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFB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