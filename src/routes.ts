import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

// Type checking of request body
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;

// Define Guest type
/**
 * @typedef {Object} Guest
 * @property {string} name - The name of the guest
 */
export type Guest = {
  name: string;
};

// Mock database
let guests: Guest[] = [];

/**
 * Helper function to check if an object is a Guest
 * @param {Record<string, unknown>} obj - The object to check
 * @returns {boolean} - True if the object is a Guest, false otherwise
 */
const isValidGuest = (obj: Record<string, unknown>): obj is Guest => {
  return typeof obj.name === 'string';
};

/**
 * Get all guests
 * @param {SafeRequest} req - The request object
 * @param {SafeResponse} res - The response object
 * @returns {void}
 */
export const getGuests = (_req: SafeRequest, res: SafeResponse): void => {
  res.send(guests);
};

/**
 * Add a new guest
 * @param {SafeRequest} req - The request object
 * @param {SafeResponse} res - The response object
 * @returns {void}
 */
export const addGuest = (req: SafeRequest, res: SafeResponse): void => {
  const newGuest = req.body;

  if (!isValidGuest(newGuest)) {
    res.status(400).send('Guest name is required.');
    return;
  }

  guests.push(newGuest);
  res.status(201).send(newGuest);
};

/**
 * Update an existing guest
 * @param {SafeRequest} req - The request object
 * @param {SafeResponse} res - The response object
 * @returns {void}
 */
export const updateGuest = (req: SafeRequest, res: SafeResponse): void => {
  const guestName = req.params.name;
  const updatedGuest = req.body;

  if (!isValidGuest(updatedGuest)) {
    res.status(400).send('Updated guest name is required.');
    return;
  }

  const guestIndex = guests.findIndex(guest => guest.name === guestName);
  if (guestIndex === -1) {
    res.status(404).send('Guest not found.');
    return;
  }

  guests[guestIndex] = updatedGuest;
  res.send(updatedGuest);
};

/**
 * Delete a guest
 * @param {SafeRequest} req - The request object
 * @param {SafeResponse} res - The response object
 * @returns {void}
 */
export const deleteGuest = (req: SafeRequest, res: SafeResponse): void => {
  const guestName = req.params.name;
  guests = guests.filter(guest => guest.name !== guestName);
  res.status(204).end();
};