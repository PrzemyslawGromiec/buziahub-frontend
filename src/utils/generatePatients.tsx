import type { Patient } from "../types/Patient";

const firstNames = [
  "John",
  "Anna",
  "Michael",
  "Sarah",
  "David",
  "Emma",
];

const lastNames = [
  "Smith",
  "Brown",
  "Wilson",
  "Taylor",
  "Jones",
  "Williams",
];

export function generatePatients(count: number): Patient[] {
  const patients: Patient[] = [];
    for (let i = 0; i < count; i++) {
        const firstnameIndex = Math.floor(Math.random() * firstNames.length);
        const lastNameIndex = Math.floor(Math.random() * lastNames.length);
        const patient: Patient = {
            id: i + 1,
            firstName: firstNames[firstnameIndex],
            lastName: lastNames[lastNameIndex],
            age: Math.floor(Math.random() * 60) + 18,
            gender: Math.random() > 0.5 ? "MALE" : "FEMALE",
            active: Math.random() > 0.5,
            details: "Patient details nr " + (i + 1),
        };
        patients.push(patient);
    }
    return patients;
}