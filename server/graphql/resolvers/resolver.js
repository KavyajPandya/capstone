import { events } from "../../model/events.js";
import { User } from "../../model/user.js"; 
import { sendWelcomeEmail, sendResetCodeEmail } from '../../emailService.js'; 
import crypto from 'crypto';

export const resolvers = {
    Query: {
        events: async () => {
            try {
                const allEvents = await events.find();
                return allEvents.map(event => ({
                    ...event._doc,
                    date: event.date.toISOString() 
                }));
            } catch (err) {
                throw new Error('Error fetching events');
            }
        },
        event: async (_, { event_id }) => {
            try {
                const event = await events.findOne({ event_id });
                if (!event) throw new Error('Event not found');
                return {
                    ...event._doc,
                    date: event.date.toISOString() 
                };
            } catch (err) {
                throw new Error('Error fetching event');
            }
        },
        users: async () => {
            try {
                return await User.find();
            } catch (err) {
                throw new Error('Error fetching users');
            }
        }
    },
    Mutation: {
        addEvent: async (_, { event_id, title, location, description, date, price, capacity, image_url }) => {
            try {
                const newEvent = new events({
                    event_id,
                    title,
                    location,
                    description,
                    date: new Date(date), 
                    price,
                    capacity,
                    image_url
                });
                return await newEvent.save();
            } catch (err) {
                throw new Error('Error adding event');
            }
        },
        deleteEvent: async (_, { eventId }) => {
            try {
              await events.deleteOne({ event_id: eventId }); 
              return true; 
            } catch (error) {
              throw new Error("Error deleting event");
            }
        },
        updateEvent: async (_, { event_id, title, location, description, date, price, capacity, image_url }) => {
            try {
              const updatedEvent = await events.findOneAndUpdate(
                { event_id },
                { title, location, description, date: new Date(date), price, capacity, image_url },
                { new: true }
              );
          
              if (!updatedEvent) {
                throw new Error("Event not found");
              }
          
              return updatedEvent;
            } catch (err) {
              throw new Error("Error updating event: " + err.message);
            }
          },
        bookEvent: async (_, { event_id, email }) => {
            console.log('id...!!',event_id)
            const event = await events.findOne({event_id});
            console.log('event...!!',event)
            if (!event) {
                throw new Error('Event not found');
            }
        
            if (event.capacity <= 0) {
                throw new Error('Event is fully booked');
            }
        
            // Reduce capacity
            event.capacity -= 1;
            await event.save();
        
            return {
                success: true,
                message: event.price > 0 ? 'Redirecting to payment' : 'Booking confirmed!',
            };
        },
        signup: async (_, { fullName, email, password, mobile }) => {
            try {
                const newUser = new User({
                    fullName,
                    email,
                    password, 
                    mobile
                });
                await newUser.save();

                
                await sendWelcomeEmail(email, fullName);

                return newUser;
            } catch (err) {
                throw new Error('Error signing up: ' + err.message);
            }
        },
        login: async (_, { email, password }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('No user found with this email');
                }

                
                const isMatch = await user.comparePassword(password);
                if (!isMatch) {
                    throw new Error('Incorrect password');
                }

                return {
                    message: 'Login successful',
                    user: {
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                        mobile: user.mobile
                    }
                };
            } catch (err) {
                throw new Error('Error logging in: ' + err.message);
            }
        },
        sendResetCode: async (_, { email, mobile }) => {
            try {
                const user = await User.findOne({ email, mobile });
                if (!user) {
                    throw new Error('User not found or mobile number does not match');
                }

                const resetCode = crypto.randomBytes(3).toString('hex'); 
                await sendResetCodeEmail(email, resetCode);

                return 'Reset code sent successfully';
            } catch (err) {
                throw new Error('Error sending reset code: ' + err.message);
            }
        },
        verifyResetCode: async (_, { email, code }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('User not found');
                }


                const newPassword = Math.random().toString(36).slice(-8); 
                user.password = newPassword; 
                await user.save(); 

               
                await sendResetCodeEmail(email, `Your new password is: ${newPassword}`);

                return 'Verification code is valid. A new password has been sent to your email.';
            } catch (err) {
                throw new Error('Error verifying reset code: ' + err.message);
            }
        },
        resetPassword: async (_, { email, newPassword }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('User not found');
                }

                user.password = newPassword; 
                await user.save();

                return {
                    message: 'Your password has been reset successfully',
                    password: newPassword 
                };
            } catch (err) {
                throw new Error('Error resetting password: ' + err.message);
            }
        }
    }
};
