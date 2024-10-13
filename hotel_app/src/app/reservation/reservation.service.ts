import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(){
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations? JSON.parse(savedReservations): []
  }
 private reservations: Reservation[] = [];
 // CRUD
 getReservations(): Reservation[] {
  return this.reservations
 }
 getReservation(id: string): Reservation | undefined{
  return this.reservations.find(res=>res.id === id)
 }
 addReservation(reservation: Reservation): void{
  reservation.id = Date.now().toString()
  this.reservations.push(reservation)
  console.log(this.reservations)
  localStorage.setItem("reservations", JSON.stringify(this.reservations))
 }
 deleteReservation(id: string): void{
  let index = this.reservations.findIndex(res=>res.id === id)
  this.reservations.splice(index, 1)
  localStorage.setItem("reservations", JSON.stringify(this.reservations))
 }
 updateReservation(id: string, updatedReservation: Reservation): void {
  let index = this.reservations.findIndex(res => res.id === id);

  if (index !== -1) {
    updatedReservation.id = id;  // Ensure the ID remains the same
    this.reservations[index] = updatedReservation;
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  } else {
    console.error('Reservation not found for update.');
  }
}
}
