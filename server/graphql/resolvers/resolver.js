import {events} from "../../model/events.js";


export const resolvers = {
  Query: {
    // Resolver to fetch all events
    events: async () => {
        try {
            return await events.find();
        } catch (err) {
            throw new Error('Error fetching events');
        }
    },
    // Resolver to fetch an event by ID
    event: async (_, { event_id }) => {
        try {
            return await events.findOne({ event_id });
        } catch (err) {
            throw new Error('Error fetching event');
        }
    }
},
Mutation: {
    // Resolver to add a new event
    addEvent: async (_, { event_id, title, location, description, date, price, capacity }) => {
        try {
            const newEvent = new events({
                event_id,
                title,
                location,
                description,
                date,
                price,
                capacity
            });
            return await newEvent.save();
        } catch (err) {
            throw new Error('Error adding event');
        }
    }
}
};


